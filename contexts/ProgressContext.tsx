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

export const [ProgressProvider, useProgress] = createContextHook(() => {
  const [progress, setProgress] = useState<ProgressState>({
    currentPhase: 1,
    currentWeek: 1,
    completedExercises: [],
    practiceSessions: [],
    weeklyChecklist: {},
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadProgress = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
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

  const getWeekKey = () => {
    const now = new Date();
    const year = now.getFullYear();
    const week = Math.ceil(
      ((now.getTime() - new Date(year, 0, 1).getTime()) / 86400000 + 1) / 7
    );
    return `${year}-W${week}`;
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
    const today = new Date().toISOString().split("T")[0];
    return progress.practiceSessions
      .filter((session) => session.date.startsWith(today))
      .reduce((total, session) => total + session.duration, 0);
  };

  const getWeekPracticeTime = () => {
    const weekKey = getWeekKey();
    const [year, weekStr] = weekKey.split("-W");
    const weekNum = parseInt(weekStr, 10);
    const startOfYear = new Date(parseInt(year, 10), 0, 1);
    const weekStart = new Date(startOfYear);
    weekStart.setDate(startOfYear.getDate() + (weekNum - 1) * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    return progress.practiceSessions
      .filter((session) => {
        const sessionDate = new Date(session.date);
        return sessionDate >= weekStart && sessionDate < weekEnd;
      })
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
