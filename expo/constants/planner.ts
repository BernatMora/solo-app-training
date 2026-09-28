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

const SECTIONS = collectSections();

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
  const found = SECTIONS.find((item) => item.exerciseIds.includes(exerciseId));
  return found ? found.range : null;
};
