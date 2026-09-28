import { useRouter } from "expo-router";
import {
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Circle,
  HelpCircle,
  Play,
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import Colors from "@/constants/colors";
import { phases, TRAINER_INFO, weeklyChecklist } from "@/constants/trainingData";
import type { TrainerId } from "@/constants/trainingData";
import { useProgress } from "@/contexts/ProgressContext";

type Phase = (typeof phases)[number];
type Exercise = Phase["sections"][number]["exercises"][number];

const TRAINER_ORDER: TrainerId[] = ["note", "interval", "changes", "scale"];

const formatMinutes = (minutes: number): string => {
  if (minutes <= 0) return "0 min";
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest} min`;
  if (rest === 0) return `${hours} h`;
  return `${hours} h ${String(rest).padStart(2, "0")}`;
};

const dayKey = (iso: string): string => {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
};

const countStreak = (dates: string[]): number => {
  const days = new Set(dates.map(dayKey));
  if (days.size === 0) return 0;

  const cursor = new Date();
  if (!days.has(dayKey(cursor.toISOString()))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(dayKey(cursor.toISOString()))) return 0;
  }

  let streak = 0;
  while (days.has(dayKey(cursor.toISOString()))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
};

export default function TrainingScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();
  const {
    progress,
    updatePhase,
    getTodayPracticeTime,
    getWeekPracticeTime,
    getWeeklyChecklistState,
  } = useProgress();
  const [expandedPhase, setExpandedPhase] = useState<number>(
    progress.currentPhase
  );
  const [trainerFilter, setTrainerFilter] = useState<TrainerId | null>(null);

  const styles = createStyles(colors);

  const getPhaseColor = (phaseId: number) => {
    switch (phaseId) {
      case 1:
        return colors.phase1;
      case 2:
        return colors.phase2;
      case 3:
        return colors.phase3;
      case 4:
        return colors.phase4;
      case 5:
        return colors.phase5;
      case 6:
        return colors.phase6;
      case 7:
        return colors.phase7;
      case 8:
        return colors.phase8;
      case 9:
        return colors.phase9;
      case 10:
        return colors.phase10;
      case 11:
        return colors.phase11;
      case 12:
        return colors.phase12;
      case 13:
        return colors.phase13;
      case 14:
        return colors.phase14;
      default:
        return colors.tint;
    }
  };

  const matchesFilter = (exercise: Exercise) => {
    if (!trainerFilter) return true;
    return (exercise.trainers ?? []).includes(trainerFilter);
  };

  const trainerCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const phase of phases) {
      for (const section of phase.sections) {
        for (const exercise of section.exercises) {
          for (const trainer of exercise.trainers ?? []) {
            counts[trainer] = (counts[trainer] ?? 0) + 1;
          }
        }
      }
    }
    return counts;
  }, []);

  const visiblePhases = useMemo(() => {
    const uniquePhases = phases.filter(
      (phase, index, array) =>
        array.findIndex((item) => item.id === phase.id) === index
    );

    const sorted = [...uniquePhases].sort((a, b) => a.id - b.id);

    if (!trainerFilter) return sorted;

    return sorted.filter((phase) =>
      phase.sections.some((section) =>
        section.exercises.some((exercise) =>
          (exercise.trainers ?? []).includes(trainerFilter)
        )
      )
    );
  }, [trainerFilter]);

  const totalExercises = useMemo(
    () =>
      phases.reduce(
        (sum, phase) =>
          sum +
          phase.sections.reduce(
            (inner, section) => inner + section.exercises.length,
            0
          ),
        0
      ),
    []
  );

  const completedCount = progress.completedExercises.length;

  const nextExercise = useMemo(() => {
    for (const phase of phases) {
      for (const section of phase.sections) {
        for (const exercise of section.exercises) {
          if (!progress.completedExercises.includes(exercise.id)) {
            return {
              exercise,
              phaseId: phase.id,
              phaseColor: getPhaseColor(phase.id),
            };
          }
        }
      }
    }
    return null;
  }, [progress.completedExercises]);

  const getCompletedExercisesInPhase = (phaseId: number) => {
    const phase = phases.find((p) => p.id === phaseId);
    if (!phase) return 0;

    const total = phase.sections.reduce(
      (sum, section) => sum + section.exercises.length,
      0
    );
    const completed = phase.sections.reduce((sum, section) => {
      return (
        sum +
        section.exercises.filter((ex) =>
          progress.completedExercises.includes(ex.id)
        ).length
      );
    }, 0);

    return total > 0 ? (completed / total) * 100 : 0;
  };

  const todayMinutes = getTodayPracticeTime();
  const weekMinutes = getWeekPracticeTime();
  const streak = countStreak(progress.practiceSessions.map((s) => s.date));
  const checklistState = getWeeklyChecklistState();
  const checklistDone = weeklyChecklist.filter(
    (item) => checklistState[item.id]
  ).length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Entrenament (Solo)</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Mòduls 1-14 · Comença pel 1 i ves pujant
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {formatMinutes(todayMinutes)}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            avui
          </Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {formatMinutes(weekMinutes)}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            aquesta setmana
          </Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {streak}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            dies seguits
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.progressLink, { backgroundColor: colors.card }]}
        onPress={() => router.push("/progress" as any)}
        testID="progressLink"
      >
        <BarChart3 size={20} color={colors.tint} />
        <View style={styles.progressLinkText}>
          <Text style={[styles.progressLinkTitle, { color: colors.text }]}>
            El meu progrés
          </Text>
          <Text
            style={[
              styles.progressLinkSubtitle,
              { color: colors.textSecondary },
            ]}
          >
            {completedCount}/{totalExercises} exercicis fets · repàs setmanal{" "}
            {checklistDone}/{weeklyChecklist.length}
          </Text>
        </View>
        <ChevronRight size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      {nextExercise && (
        <TouchableOpacity
          style={[
            styles.continueCard,
            { backgroundColor: nextExercise.phaseColor },
          ]}
          onPress={() =>
            router.push(`/exercise/${nextExercise.exercise.id}` as any)
          }
          testID="continueCard"
        >
          <View style={styles.continueHeader}>
            <Play size={16} color="#FFFFFF" />
            <Text style={styles.continueLabel}>Continua on ho vas deixar</Text>
          </View>
          <Text style={styles.continueTitle}>
            {nextExercise.exercise.emoji
              ? `${nextExercise.exercise.emoji} `
              : ""}
            {nextExercise.exercise.title}
          </Text>
          <Text style={styles.continueMeta}>
            Mòdul {nextExercise.phaseId} · Exercici {nextExercise.exercise.id} ·{" "}
            {nextExercise.exercise.duration}
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.progressLink, { backgroundColor: colors.card }]}
        onPress={() => router.push("/guia" as any)}
        testID="guiaLink"
      >
        <HelpCircle size={20} color={colors.tint} />
        <View style={styles.progressLinkText}>
          <Text style={[styles.progressLinkTitle, { color: colors.text }]}>
            Com es posa a Solo?
          </Text>
          <Text
            style={[
              styles.progressLinkSubtitle,
              { color: colors.textSecondary },
            ]}
          >
            El flux complet dels quatre entrenadors, amb els noms que veuràs a
            l'app
          </Text>
        </View>
        <ChevronRight size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <View style={styles.filterBlock}>
        <Text style={[styles.filterTitle, { color: colors.textSecondary }]}>
          Filtrar per entrenador de Solo
        </Text>
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[
              styles.filterChip,
              {
                backgroundColor:
                  trainerFilter === null ? colors.tint : colors.card,
                borderColor:
                  trainerFilter === null ? colors.tint : colors.border,
              },
            ]}
            onPress={() => setTrainerFilter(null)}
            testID="trainerFilter-all"
          >
            <Text
              style={[
                styles.filterChipText,
                { color: trainerFilter === null ? "#FFFFFF" : colors.text },
              ]}
            >
              Tots
            </Text>
          </TouchableOpacity>
          {TRAINER_ORDER.map((trainerId) => {
            const info = TRAINER_INFO[trainerId];
            const isActive = trainerFilter === trainerId;
            return (
              <TouchableOpacity
                key={trainerId}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor: isActive ? info.color : colors.card,
                    borderColor: isActive ? info.color : colors.border,
                  },
                ]}
                onPress={() => setTrainerFilter(isActive ? null : trainerId)}
                testID={`trainerFilter-${trainerId}`}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    { color: isActive ? "#FFFFFF" : colors.text },
                  ]}
                >
                  {info.short} {trainerCounts[trainerId] ?? 0}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.modulePicker} testID="modulePicker">
        {visiblePhases.map((p) => {
          const isSelected = expandedPhase === p.id;
          const phaseColor = getPhaseColor(p.id);
          return (
            <TouchableOpacity
              key={p.id}
              style={[
                styles.moduleChip,
                {
                  backgroundColor: isSelected ? phaseColor : colors.card,
                  borderColor: isSelected ? phaseColor : colors.border,
                },
              ]}
              onPress={() => {
                setExpandedPhase(p.id);
                updatePhase(p.id);
              }}
              testID={`moduleChip-${p.id}`}
            >
              <Text
                style={[
                  styles.moduleChipText,
                  { color: isSelected ? "#FFFFFF" : colors.text },
                ]}
              >
                {p.emoji} Mòdul {p.id}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={[styles.moduleCount, { color: colors.textSecondary }]}>
        {trainerFilter
          ? `Mostrant ${visiblePhases.length} mòduls amb ${TRAINER_INFO[trainerFilter].label}`
          : `Mostrant ${visiblePhases.length} mòduls`}
      </Text>

      {visiblePhases.map((phase) => {
        const isExpanded = expandedPhase === phase.id;
        const isCurrent = progress.currentPhase === phase.id;
        const phaseColor = getPhaseColor(phase.id);
        const completionPercent = getCompletedExercisesInPhase(phase.id);

        return (
          <View key={phase.id} style={styles.phaseContainer}>
            <TouchableOpacity
              style={[
                styles.phaseHeader,
                { backgroundColor: colors.card },
                isCurrent && {
                  borderColor: phaseColor,
                  borderWidth: 2,
                },
              ]}
              onPress={() => setExpandedPhase(isExpanded ? 0 : phase.id)}
            >
              <View style={styles.phaseHeaderContent}>
                <View
                  style={[
                    styles.phaseBadge,
                    { backgroundColor: phaseColor + "20" },
                  ]}
                >
                  <Text style={[styles.phaseBadgeText, { color: phaseColor }]}>
                    {phase.emoji} Mòdul {phase.id}
                  </Text>
                </View>
                <View style={styles.phaseInfo}>
                  <Text style={[styles.phaseTitle, { color: colors.text }]}>
                    {phase.title}
                  </Text>
                  <Text
                    style={[styles.phaseWeeks, { color: colors.textSecondary }]}
                  >
                    {phase.weeks}
                  </Text>
                </View>
              </View>
              <View style={styles.phaseActions}>
                {completionPercent > 0 && (
                  <Text
                    style={[
                      styles.completionText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {Math.round(completionPercent)}%
                  </Text>
                )}
                <ChevronRight
                  size={20}
                  color={colors.textSecondary}
                  style={[isExpanded && { transform: [{ rotate: "90deg" }] }]}
                />
              </View>
            </TouchableOpacity>

            {isExpanded && (
              <View
                style={[
                  styles.phaseContent,
                  { backgroundColor: colors.backgroundSecondary },
                ]}
              >
                {!isCurrent && (
                  <TouchableOpacity
                    style={[
                      styles.setCurrentButton,
                      { borderColor: phaseColor },
                    ]}
                    onPress={() => updatePhase(phase.id)}
                  >
                    <Text style={[styles.setCurrentText, { color: phaseColor }]}>
                      Establir com a mòdul actual
                    </Text>
                  </TouchableOpacity>
                )}

                <Text style={[styles.objectivesTitle, { color: colors.text }]}>
                  Objectius:
                </Text>
                {phase.objectives.map((objective, idx) => (
                  <View key={idx} style={styles.objectiveItem}>
                    <View
                      style={[
                        styles.objectiveDot,
                        { backgroundColor: phaseColor },
                      ]}
                    />
                    <Text
                      style={[
                        styles.objectiveText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {objective}
                    </Text>
                  </View>
                ))}

                {phase.sections.map((section, sectionIdx) => {
                  const sectionExercises =
                    section.exercises.filter(matchesFilter);
                  if (sectionExercises.length === 0) return null;

                  return (
                    <View key={sectionIdx} style={styles.section}>
                      <Text
                        style={[styles.sectionWeeks, { color: phaseColor }]}
                      >
                        {section.weeks}
                      </Text>
                      <Text
                        style={[styles.sectionTitle, { color: colors.text }]}
                      >
                        {section.title}
                      </Text>
                      {sectionExercises.map((exercise) => {
                        const isCompleted =
                          progress.completedExercises.includes(exercise.id);
                        return (
                          <TouchableOpacity
                            key={exercise.id}
                            style={[
                              styles.exerciseCard,
                              { backgroundColor: colors.card },
                            ]}
                            onPress={() =>
                              router.push(`/exercise/${exercise.id}` as any)
                            }
                          >
                            <View style={styles.exerciseHeader}>
                              {isCompleted ? (
                                <CheckCircle2
                                  size={20}
                                  color={colors.success}
                                />
                              ) : (
                                <Circle
                                  size={20}
                                  color={colors.textSecondary}
                                />
                              )}
                              <Text
                                style={[
                                  styles.exerciseId,
                                  { color: colors.textSecondary },
                                ]}
                              >
                                Exercici {exercise.id}
                              </Text>
                              {exercise.needsPurchase && (
                                <View
                                  style={[
                                    styles.purchaseTag,
                                    { backgroundColor: colors.warning + "22" },
                                  ]}
                                >
                                  <Text
                                    style={[
                                      styles.purchaseTagText,
                                      { color: colors.warning },
                                    ]}
                                  >
                                    compra in-app
                                  </Text>
                                </View>
                              )}
                            </View>
                            <Text
                              style={[
                                styles.exerciseTitle,
                                { color: colors.text },
                              ]}
                            >
                              {exercise.emoji ? `${exercise.emoji} ` : ""}
                              {exercise.title}
                            </Text>
                            <View style={styles.exerciseMeta}>
                              <Text
                                style={[
                                  styles.exerciseDuration,
                                  { color: colors.textSecondary },
                                ]}
                              >
                                {exercise.duration}
                              </Text>
                              <View style={styles.trainerTags}>
                                {(exercise.trainers ?? []).map((trainerId) => (
                                  <View
                                    key={trainerId}
                                    style={[
                                      styles.trainerTag,
                                      {
                                        backgroundColor:
                                          TRAINER_INFO[trainerId].color + "22",
                                      },
                                    ]}
                                  >
                                    <Text
                                      style={[
                                        styles.trainerTagText,
                                        {
                                          color: TRAINER_INFO[trainerId].color,
                                        },
                                      ]}
                                    >
                                      {TRAINER_INFO[trainerId].short}
                                    </Text>
                                  </View>
                                ))}
                              </View>
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        );
      })}

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const createStyles = (colors: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: "700" as const,
      color: colors.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
    },
    statsRow: {
      flexDirection: "row",
      gap: 8,
      paddingHorizontal: 20,
      marginBottom: 12,
    },
    statCard: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderRadius: 14,
      alignItems: "center",
    },
    statValue: {
      fontSize: 18,
      fontWeight: "800" as const,
    },
    statLabel: {
      fontSize: 11,
      marginTop: 2,
      textAlign: "center",
    },
    progressLink: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginHorizontal: 20,
      padding: 14,
      borderRadius: 14,
      marginBottom: 12,
    },
    progressLinkText: {
      flex: 1,
    },
    progressLinkTitle: {
      fontSize: 15,
      fontWeight: "700" as const,
    },
    progressLinkSubtitle: {
      fontSize: 12,
      marginTop: 2,
    },
    continueCard: {
      marginHorizontal: 20,
      padding: 16,
      borderRadius: 16,
      marginBottom: 16,
    },
    continueHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 8,
    },
    continueLabel: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "700" as const,
      letterSpacing: 0.3,
    },
    continueTitle: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "700" as const,
      marginBottom: 4,
    },
    continueMeta: {
      color: "#FFFFFFCC",
      fontSize: 12,
    },
    filterBlock: {
      paddingHorizontal: 20,
      marginBottom: 12,
    },
    filterTitle: {
      fontSize: 12,
      fontWeight: "600" as const,
      marginBottom: 8,
    },
    filterRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    filterChip: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 999,
      borderWidth: 1,
    },
    filterChipText: {
      fontSize: 12,
      fontWeight: "700" as const,
    },
    modulePicker: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      paddingHorizontal: 20,
      paddingBottom: 12,
    },
    moduleChip: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 999,
      borderWidth: 1,
    },
    moduleChipText: {
      fontSize: 13,
      fontWeight: "700" as const,
      letterSpacing: 0.2,
    },
    moduleCount: {
      paddingHorizontal: 20,
      marginBottom: 12,
      fontSize: 13,
      fontWeight: "500" as const,
    },
    phaseContainer: {
      marginBottom: 12,
    },
    phaseHeader: {
      marginHorizontal: 20,
      padding: 16,
      borderRadius: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    phaseHeaderContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      flex: 1,
    },
    phaseBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    phaseBadgeText: {
      fontSize: 12,
      fontWeight: "600" as const,
    },
    phaseInfo: {
      flex: 1,
    },
    phaseTitle: {
      fontSize: 16,
      fontWeight: "600" as const,
      marginBottom: 2,
    },
    phaseWeeks: {
      fontSize: 12,
    },
    phaseActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    completionText: {
      fontSize: 14,
      fontWeight: "600" as const,
    },
    phaseContent: {
      marginTop: 8,
      marginHorizontal: 20,
      padding: 16,
      borderRadius: 16,
    },
    setCurrentButton: {
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      alignItems: "center",
      marginBottom: 16,
    },
    setCurrentText: {
      fontSize: 14,
      fontWeight: "600" as const,
    },
    objectivesTitle: {
      fontSize: 14,
      fontWeight: "600" as const,
      marginBottom: 8,
    },
    objectiveItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
      marginBottom: 6,
    },
    objectiveDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginTop: 6,
    },
    objectiveText: {
      fontSize: 13,
      flex: 1,
    },
    section: {
      marginTop: 20,
    },
    sectionWeeks: {
      fontSize: 12,
      fontWeight: "600" as const,
      marginBottom: 4,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600" as const,
      marginBottom: 12,
    },
    exerciseCard: {
      padding: 12,
      borderRadius: 12,
      marginBottom: 8,
    },
    exerciseHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 6,
    },
    exerciseId: {
      fontSize: 12,
      fontWeight: "600" as const,
    },
    purchaseTag: {
      marginLeft: "auto",
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 999,
    },
    purchaseTagText: {
      fontSize: 10,
      fontWeight: "700" as const,
    },
    exerciseTitle: {
      fontSize: 14,
      fontWeight: "600" as const,
      marginBottom: 4,
    },
    exerciseMeta: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
      flexWrap: "wrap",
    },
    exerciseDuration: {
      fontSize: 12,
    },
    trainerTags: {
      flexDirection: "row",
      gap: 4,
      flexWrap: "wrap",
    },
    trainerTag: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 999,
    },
    trainerTagText: {
      fontSize: 10,
      fontWeight: "700" as const,
    },
  });
