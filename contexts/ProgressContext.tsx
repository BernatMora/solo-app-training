import AsyncStorage from "@react-native-async-storage/async-storage";
import createContextHook from "@nkzw/create-context-hook";
import { useCallback, useEffect, useState } from "react";

interface PracticeSession {
  id: string;
  date: string;
  duration: number;
  exerciseId: string;
  notes?: string;
}

interface WeeklyChecklistState {
  [weekKey: string]: {
    [itemId: string]: boolean;
  };
}

interface ProgressState {
  currentPhase: number;
  currentWeek: number;
  completedExercises: string[];
  practiceSessions: PracticeSession[];
  weeklyChecklist: WeeklyChecklistState;
}

const STORAGE_KEY = "@jazz_fusion_progress";

const DEFAULT_PROGRESS: ProgressState = {
  currentPhase: 1,
  currentWeek: 1,
  completedExercises: [],
  practiceSessions: [],
  weeklyChecklist: {},
};

const getIsoWeekYearAndNumber = (date: Date): { year: number; week: number } => {
  const normalizedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = normalizedDate.getUTCDay() || 7;
  normalizedDate.setUTCDate(normalizedDate.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(normalizedDate.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((normalizedDate.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);

  return { year: normalizedDate.getUTCFullYear(), week };
};

const getIsoWeekRange = (year: number, week: number): { start: Date; end: Date } => {
  const januaryFourth = new Date(Date.UTC(year, 0, 4));
  const dayOfWeek = januaryFourth.getUTCDay() || 7;
  const mondayOfWeekOne = new Date(januaryFourth);
  mondayOfWeekOne.setUTCDate(januaryFourth.getUTCDate() - dayOfWeek + 1);

  const start = new Date(mondayOfWeekOne);
  start.setUTCDate(mondayOfWeekOne.getUTCDate() + (week - 1) * 7);

  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 7);

  return { start, end };
};

const normalizeProgress = (parsed: unknown): ProgressState => {
  if (!parsed || typeof parsed !== "object") {
    return DEFAULT_PROGRESS;
  }

  const raw = parsed as Partial<ProgressState>;

  return {
    currentPhase:
      typeof raw.currentPhase === "number" && Number.isFinite(raw.currentPhase)
        ? raw.currentPhase
        : DEFAULT_PROGRESS.currentPhase,
    currentWeek:
      typeof raw.currentWeek === "number" && Number.isFinite(raw.currentWeek)
        ? raw.currentWeek
        : DEFAULT_PROGRESS.currentWeek,
    completedExercises: Array.isArray(raw.completedExercises)
      ? raw.completedExercises.filter((item): item is string => typeof item === "string")
      : DEFAULT_PROGRESS.completedExercises,
    practiceSessions: Array.isArray(raw.practiceSessions)
      ? raw.practiceSessions.filter((session): session is PracticeSession => {
          return (
            typeof session?.id === "string" &&
            typeof session?.date === "string" &&
            typeof session?.duration === "number" &&
            Number.isFinite(session.duration) &&
            typeof session?.exerciseId === "string" &&
            (typeof session?.notes === "undefined" || typeof session.notes === "string")
          );
        })
      : DEFAULT_PROGRESS.practiceSessions,
    weeklyChecklist:
      raw.weeklyChecklist && typeof raw.weeklyChecklist === "object"
        ? (raw.weeklyChecklist as WeeklyChecklistState)
        : DEFAULT_PROGRESS.weeklyChecklist,
  };
};

const getWeekKey = (date: Date = new Date()): string => {
  const { year, week } = getIsoWeekYearAndNumber(date);
  return `${year}-W${week}`;
};

const getDateFromSession = (sessionDate: string): Date | null => {
  const parsed = new Date(sessionDate);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
};

const parseWeekKey = (weekKey: string): { year: number; week: number } | null => {
  const [year, weekStr] = weekKey.split("-W");
  const parsedYear = Number.parseInt(year, 10);
  const parsedWeek = Number.parseInt(weekStr, 10);

  if (!Number.isFinite(parsedYear) || !Number.isFinite(parsedWeek)) {
    return null;
  }

  return { year: parsedYear, week: parsedWeek };
};

const isSessionInWeek = (sessionDate: string, weekKey: string): boolean => {
  const sessionDateObject = getDateFromSession(sessionDate);
  if (!sessionDateObject) {
    return false;
  }

  const parsedWeek = parseWeekKey(weekKey);
  if (!parsedWeek) {
    return false;
  }

  const { start, end } = getIsoWeekRange(parsedWeek.year, parsedWeek.week);
  return sessionDateObject >= start && sessionDateObject < end;
};

const isSessionToday = (sessionDate: string): boolean => {
  const sessionDateObject = getDateFromSession(sessionDate);
  if (!sessionDateObject) {
    return false;
  }

  const today = new Date();
  return (
    sessionDateObject.getFullYear() === today.getFullYear() &&
    sessionDateObject.getMonth() === today.getMonth() &&
    sessionDateObject.getDate() === today.getDate()
  );
};

export const [ProgressProvider, useProgress] = createContextHook(() => {
  const [progress, setProgress] = useState<ProgressState>(DEFAULT_PROGRESS);
  const [isLoading, setIsLoading] = useState(true);

  const loadProgress = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const normalizedProgress = normalizeProgress(parsed);
          setProgress(normalizedProgress);
        } catch (parseError) {
          console.error("Error parsing stored progress, resetting:", parseError);
          await AsyncStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error("Error loading progress:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveProgress = useCallback(async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  }, [progress]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  useEffect(() => {
    if (!isLoading) {
      saveProgress();
    }
  }, [progress, isLoading, saveProgress]);

  const updatePhase = (phase: number) => {
    setProgress((prev) => ({ ...prev, currentPhase: phase }));
  };

  const updateWeek = (week: number) => {
    setProgress((prev) => ({ ...prev, currentWeek: week }));
  };

  const toggleExerciseComplete = (exerciseId: string) => {
    setProgress((prev) => {
      const completed = prev.completedExercises.includes(exerciseId);
      return {
        ...prev,
        completedExercises: completed
          ? prev.completedExercises.filter((id) => id !== exerciseId)
          : [...prev.completedExercises, exerciseId],
      };
    });
  };

  const addPracticeSession = (session: Omit<PracticeSession, "id">) => {
    const newSession: PracticeSession = {
      ...session,
      id: Date.now().toString(),
    };
    setProgress((prev) => ({
      ...prev,
      practiceSessions: [newSession, ...prev.practiceSessions],
    }));
  };


  const toggleWeeklyChecklistItem = (itemId: string) => {
    const weekKey = getWeekKey();
    setProgress((prev) => {
      const currentWeek = prev.weeklyChecklist[weekKey] || {};
      return {
        ...prev,
        weeklyChecklist: {
          ...prev.weeklyChecklist,
          [weekKey]: {
            ...currentWeek,
            [itemId]: !currentWeek[itemId],
          },
        },
      };
    });
  };

  const getWeeklyChecklistState = () => {
    const weekKey = getWeekKey();
    return progress.weeklyChecklist[weekKey] || {};
  };

  const getTodayPracticeTime = () => {
    return progress.practiceSessions
      .filter((session) => isSessionToday(session.date))
      .reduce((total, session) => total + session.duration, 0);
  };

  const getWeekPracticeTime = () => {
    const weekKey = getWeekKey();

    return progress.practiceSessions
      .filter((session) => isSessionInWeek(session.date, weekKey))
      .reduce((total, session) => total + session.duration, 0);
  };

  return {
    progress,
    isLoading,
    updatePhase,
    updateWeek,
    toggleExerciseComplete,
    addPracticeSession,
    toggleWeeklyChecklistItem,
    getWeeklyChecklistState,
    getTodayPracticeTime,
    getWeekPracticeTime,
  };
});
