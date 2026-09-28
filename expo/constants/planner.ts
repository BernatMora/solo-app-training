import { phases } from "@/constants/trainingData";

export interface WeekRange {
  from: number;
  /** Pot ser Infinity si el pla diu "25+" */
  to: number;
}

const parseRange = (label: string): WeekRange | null => {
  const closed = label.match(/(\d+)\s*[-\u2013]\s*(\d+)/);
  if (closed) {
    const from = Number.parseInt(closed[1], 10);
    const to = Number.parseInt(closed[2], 10);
    if (Number.isFinite(from) && Number.isFinite(to)) return { from, to };
  }

  const open = label.match(/(\d+)\s*\+/);
  if (open) {
    const from = Number.parseInt(open[1], 10);
    if (Number.isFinite(from)) return { from, to: Number.POSITIVE_INFINITY };
  }

  return null;
};

export interface PlannedSection {
  phaseId: number;
  phaseTitle: string;
  phaseEmoji: string;
  phaseWeeks: string;
  objectives: string[];
  sectionTitle: string;
  sectionWeeks: string;
  range: WeekRange;
  exerciseIds: string[];
  /** Cert si el bloc s'ha allargat perquè el pla no quedi amb forats. */
  continued?: boolean;
}

interface RawSection extends PlannedSection {
  from: number;
}

const collectSections = (): RawSection[] => {
  const raw: RawSection[] = [];

  for (const phase of phases) {
    const phaseRange = parseRange(phase.weeks);
    for (const section of phase.sections) {
      const range = parseRange(section.weeks) ?? phaseRange;
      if (!range) continue;
      raw.push({
        phaseId: phase.id,
        phaseTitle: phase.title,
        phaseEmoji: phase.emoji,
        phaseWeeks: phase.weeks,
        objectives: phase.objectives,
        sectionTitle: section.title,
        sectionWeeks: section.weeks,
        range,
        from: range.from,
        exerciseIds: section.exercises.map((exercise) => exercise.id),
      });
    }
  }

  // els rangs oberts ("25+") s'aturen on comença el bloc següent, perquè el pla no es trepitgi
  const starts = raw.map((item) => item.from).sort((a, b) => a - b);
  for (const item of raw) {
    if (item.range.to === Number.POSITIVE_INFINITY) {
      const next = starts.find((start) => start > item.from);
      item.range = { from: item.from, to: next ? next - 1 : item.from + 7 };
    }
  }

  return raw.sort((a, b) => a.from - b.from);
};

const SECTIONS_BASE = collectSections();

// El pla s'ha de cobrir tot sol: si entre dos blocs hi ha setmanes buides
// (perquè s'hi van treure exercicis), el bloc anterior es considera en continuació.
const withContinuity = (base: RawSection[]): RawSection[] => {
  const sorted = base.map((item) => ({ ...item, range: { ...item.range } }));
  for (let i = 0; i < sorted.length - 1; i += 1) {
    if (sorted[i].range.to < sorted[i + 1].range.from - 1) {
      sorted[i].continued = true;
      sorted[i].range = { ...sorted[i].range, to: sorted[i + 1].range.from - 1 };
    }
  }
  return sorted;
};

const SECTIONS = withContinuity(SECTIONS_BASE);

/** Setmana més alta que descriu el pla. */
export const lastPlannedWeek = (): number =>
  SECTIONS.reduce((max, item) => Math.max(max, item.range.to), 1);

/** Blocs del pla que toquen en una setmana concreta. */
export const planForWeek = (week: number): PlannedSection[] =>
  SECTIONS.filter((item) => week >= item.range.from && week <= item.range.to).map(
    ({ from: _from, ...rest }) => rest
  );

/** Setmana del pla que conté un exercici (per situar-lo al calendari). */
export const weekOfExercise = (exerciseId: string): WeekRange | null => {
  const found = SECTIONS_BASE.find((item) =>
    item.exerciseIds.includes(exerciseId)
  );
  return found ? found.range : null;
};

export const DAY_NAMES = [
  "Dilluns",
  "Dimarts",
  "Dimecres",
  "Dijous",
  "Divendres",
  "Dissabte",
  "Diumenge",
];

export interface DayTask {
  day: string;
  main: string;
  /** Un exercici del bloc, dos dies enrere, per no perdre'l. */
  review?: string;
}

/**
 * Reparteix els exercicis del bloc al llarg de la setmana:
 * cada dia en toca un de principal i, si el bloc en té més d'un, el repàs
 * d'un dels dies anteriors. Així no cal triar mai què toca avui.
 */
export const weekSchedule = (week: number): DayTask[] => {
  const ids = planForWeek(week).flatMap((block) => block.exerciseIds);
  if (ids.length === 0) return [];

  return DAY_NAMES.map((day, index) => {
    const main = ids[index % ids.length];
    const reviewIndex = (index + ids.length - 2) % ids.length;
    const review = ids.length > 1 ? ids[reviewIndex] : undefined;
    return { day, main, review: review === main ? undefined : review };
  });
};

/** Què toca avui (índex de dia: 0 = dilluns). */
export const todayTask = (week: number, date: Date = new Date()): DayTask | null => {
  const schedule = weekSchedule(week);
  if (schedule.length === 0) return null;
  const dayIndex = (date.getDay() + 6) % 7;
  return schedule[dayIndex] ?? null;
};
