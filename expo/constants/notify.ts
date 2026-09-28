import { lastPlannedWeek, planForWeek, weekSchedule } from "@/constants/planner";
import { phases, TRAINER_INFO } from "@/constants/trainingData";

/**
 * ntfy: servidor propi de casa (Raspberry, port 8090).
 * El servidor demana autenticació per publicar: el script de `tools/notify-week.mjs`
 * hi envia el token des de la variable d'entorn NTFY_TOKEN o del fitxer .ntfy-token
 * (que no es puja mai al repositori).
 *
 * NOTA: el botó de la web només pot publicar si el servidor és HTTPS (una pàgina
 * HTTPS no pot cridar un http://) i si el topic permet escriptura. Si no, el
 * recordatori setmanal automàtic és el camí.
 */
export const NTFY_URL = "http://hortosona:8090";
export const NTFY_TOPIC = "solo";
/** Primera setmana del pla: serveix per calcular en quina setmana ets. */
export const NOTIFY_START_DATE = "2026-09-28";
/**
 * Adreça pública de la web. Viu a la Raspberry (nginx, port 3020).
 *
 * IMPORTANT: aquesta és l'ADREÇA CANÒNICA. El progrés es guarda al navegador
 * per origen (esquema + host + port), així que `hortosona:3020` i
 * `100.115.134.76:3020` són dues caixes diferents: fes servir sempre aquesta.
 * Amb Tailscale actiu al mòbil, `hortosona` es resol sol.
 */
export const SITE_URL = "http://hortosona:3020";

/** Cert si el navegador podrà publicar directament (cal HTTPS al servidor). */
export const canPublishFromBrowser = (): boolean => {
  const isSecurePage =
    typeof window !== "undefined" &&
    typeof window.location !== "undefined" &&
    window.location.protocol === "https:";
  const isSecureServer = NTFY_URL.startsWith("https://");
  return !isSecurePage || isSecureServer;
};

export interface NtfyMessage {
  title: string;
  body: string;
  tags: string[];
  priority: number;
}

const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

const clampWeek = (week: number): number =>
  Math.min(Math.max(week, 1), lastPlannedWeek());

/** Setmana del pla que toca avui, segons la data d'inici. */
export const currentPlanWeek = (today: Date = new Date()): number => {
  const start = new Date(`${NOTIFY_START_DATE}T00:00:00`);
  if (Number.isNaN(start.getTime())) return 1;
  const weeks = Math.floor((today.getTime() - start.getTime()) / MS_PER_WEEK) + 1;
  return clampWeek(weeks);
};

/** El text del missatge que s'envia a ntfy (ntfy accepta Markdown). */
export const buildWeekMessage = (week: number, today: Date = new Date()): NtfyMessage => {
  const safeWeek = clampWeek(week);
  const planned = planForWeek(safeWeek);

  const exerciseById = new Map<
    string,
    (typeof phases)[number]["sections"][number]["exercises"][number]
  >();
  for (const phase of phases) {
    for (const section of phase.sections) {
      for (const exercise of section.exercises) {
        exerciseById.set(exercise.id, exercise);
      }
    }
  }

  const total = planned.reduce((sum, block) => sum + block.exerciseIds.length, 0);
  const lines: string[] = [];
  lines.push(
    `Setmana **${safeWeek}** del pla · ${total} exercici${total === 1 ? "" : "s"}`
  );
  lines.push("");

  for (const block of planned) {
    lines.push(`### ${block.phaseEmoji} Mòdul ${block.phaseId} · ${block.sectionTitle}`);
    lines.push(`_${block.sectionWeeks}${block.continued ? ` · continuació fins a la setmana ${block.range.to}` : ""}_`);
    for (const id of block.exerciseIds) {
      const exercise = exerciseById.get(id);
      if (!exercise) continue;
      const trainer = exercise.setup?.trainer
        ? TRAINER_INFO[exercise.setup.trainer].short
        : "";
      const bits = [exercise.duration];
      if (trainer) bits.push(trainer);
      if (exercise.setup?.functions) bits.push(exercise.setup.functions);
      lines.push(`- **${exercise.id}** ${exercise.title} _(${bits.join(" · ")})_`);
    }
    lines.push("");
  }

  if (planned.length === 0) {
    lines.push("Aquesta setmana no hi ha cap bloc definit al pla.");
    lines.push("");
  }

  // repartiment diari, perquè no calgui triar mai què toca avui
  const schedule = weekSchedule(safeWeek);
  if (schedule.length > 0) {
    lines.push("### Com repartir-ho");
    for (const task of schedule) {
      const main = exerciseById.get(task.main);
      const review = task.review ? exerciseById.get(task.review) : undefined;
      const parts = [main ? `${main.id} ${main.title}` : task.main];
      if (review) parts.push(`repàs: ${review.id}`);
      lines.push(`- **${task.day}**: ${parts.join(" · ")}`);
    }
    lines.push("");
  }

  lines.push(`[Obrir el pla a la web](${SITE_URL}/setmana)`);

  const d = today.toLocaleDateString("ca-ES", { day: "2-digit", month: "long" });

  // OJO: les capçaleres HTTP només admeten caràcters fins a 255 (ByteString),
  // per això els emojis van al cos i no al títol.
  return {
    title: `Setmana ${safeWeek} · Jazz Fusion Solo (${d})`,
    body: [`🎸 ${lines[0]}`, ...lines.slice(1)].join("\n"),
    tags: ["musical_note", "guitar"],
    priority: 3,
  };
};

/** Publica el missatge a ntfy. Retorna true si el servidor l'ha acceptat. */
export const sendToNtfy = async (message: NtfyMessage): Promise<boolean> => {
  const headers: Record<string, string> = {
    Title: message.title,
    Tags: message.tags.join(","),
    Priority: String(message.priority),
    Markdown: "yes",
  };

  try {
    const response = await fetch(`${NTFY_URL}/${NTFY_TOPIC}`, {
      method: "POST",
      headers,
      body: message.body,
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn("ntfy ha refusat el missatge:", response.status, detail);
    }
    return response.ok;
  } catch (error) {
    console.warn("Error enviant a ntfy:", error);
    return false;
  }
};
