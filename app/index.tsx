import { useRouter } from "expo-router";
import { ChevronRight, CheckCircle2, Circle } from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import Colors from "@/constants/colors";
import { phases } from "@/constants/trainingData";
import { useProgress } from "@/contexts/ProgressContext";

export default function TrainingScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();
  const { progress, updatePhase } = useProgress();
  const [expandedPhase, setExpandedPhase] = useState<number>(
    progress.currentPhase
  );

  const styles = createStyles(colors);

  const visiblePhases = phases;

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
      default:
        return colors.tint;
    }
  };

  const getCompletedExercisesInPhase = (phaseId: number) => {
    const phase = phases.find((p) => p.id === phaseId);
    if (!phase) return 0;
    
    const totalExercises = phase.sections.reduce(
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
    
    return totalExercises > 0 ? (completed / totalExercises) * 100 : 0;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Entrenament (Solo)</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Mòduls 1-9 · Comença pel 1 i ves pujant
        </Text>
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
              onPress={() =>
                setExpandedPhase(isExpanded ? 0 : phase.id)
              }
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
                  style={[
                    isExpanded && { transform: [{ rotate: "90deg" }] },
                  ]}
                />
              </View>
            </TouchableOpacity>

            {isExpanded && (
              <View style={[styles.phaseContent, { backgroundColor: colors.backgroundSecondary }]}>
                {!isCurrent && (
                  <TouchableOpacity
                    style={[styles.setCurrentButton, { borderColor: phaseColor }]}
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
                      style={[styles.objectiveDot, { backgroundColor: phaseColor }]}
                    />
                    <Text
                      style={[styles.objectiveText, { color: colors.textSecondary }]}
                    >
                      {objective}
                    </Text>
                  </View>
                ))}

                {phase.sections.map((section, sectionIdx) => (
                  <View key={sectionIdx} style={styles.section}>
                    <Text style={[styles.sectionWeeks, { color: phaseColor }]}>
                      {section.weeks}
                    </Text>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>
                      {section.title}
                    </Text>
                    {section.exercises.map((exercise) => {
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
                              <CheckCircle2 size={20} color={colors.success} />
                            ) : (
                              <Circle size={20} color={colors.textSecondary} />
                            )}
                            <Text
                              style={[
                                styles.exerciseId,
                                { color: colors.textSecondary },
                              ]}
                            >
                              Exercici {exercise.id}
                            </Text>
                          </View>
                          <Text style={[styles.exerciseTitle, { color: colors.text }]}>
                            {exercise.emoji ? `${exercise.emoji} ` : ''}{exercise.title}
                          </Text>
                          <Text
                            style={[
                              styles.exerciseDuration,
                              { color: colors.textSecondary },
                            ]}
                          >
                            {exercise.duration}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ))}
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
    title: {
      fontSize: 32,
      fontWeight: "700" as const,
      color: colors.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
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
    exerciseTitle: {
      fontSize: 14,
      fontWeight: "600" as const,
      marginBottom: 4,
    },
    exerciseDuration: {
      fontSize: 12,
    },
  });
