import { CheckCircle2, Circle, Calendar } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import Colors from "@/constants/colors";
import { weeklyChecklist, phases } from "@/constants/trainingData";
import { useProgress } from "@/contexts/ProgressContext";

export default function ProgressScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const {
    progress,
    toggleWeeklyChecklistItem,
    getWeeklyChecklistState,
    getWeekPracticeTime,
  } = useProgress();

  const styles = createStyles(colors);
  const checklistState = getWeeklyChecklistState();
  const weekMinutes = Math.floor(getWeekPracticeTime() / 60);
  const weekHours = Math.floor(weekMinutes / 60);
  const remainingMinutes = weekMinutes % 60;

  const completedItems = Object.values(checklistState).filter(Boolean).length;
  const totalItems = weeklyChecklist.length;

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
      default:
        return colors.tint;
    }
  };

  const getPhaseProgress = () => {
    return phases.map((phase) => {
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

      return {
        phase: phase.id,
        title: phase.title,
        completed,
        total: totalExercises,
        percentage: totalExercises > 0 ? (completed / totalExercises) * 100 : 0,
      };
    });
  };

  const phaseProgress = getPhaseProgress();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Progrés</Text>
      </View>

      <View style={[styles.statsCard, { backgroundColor: colors.card }]}>
        <View style={styles.statRow}>
          <Calendar size={24} color={colors.tint} />
          <View style={styles.statInfo}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {weekHours > 0
                ? `${weekHours}h ${remainingMinutes}min`
                : `${remainingMinutes} min`}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Temps aquesta setmana
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Checklist Setmanal
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(completedItems / totalItems) * 100}%`,
                backgroundColor: colors.success,
              },
            ]}
          />
        </View>
        <Text style={[styles.progressText, { color: colors.textSecondary }]}>
          {completedItems} de {totalItems} completats
        </Text>
      </View>

      <View style={[styles.checklistCard, { backgroundColor: colors.card }]}>
        {weeklyChecklist.map((item) => {
          const isChecked = checklistState[item.id] || false;
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.checklistItem}
              onPress={() => toggleWeeklyChecklistItem(item.id)}
            >
              {isChecked ? (
                <CheckCircle2 size={24} color={colors.success} />
              ) : (
                <Circle size={24} color={colors.textSecondary} />
              )}
              <Text
                style={[
                  styles.checklistText,
                  { color: colors.text },
                  isChecked && styles.checklistTextCompleted,
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Progrés per Fase
        </Text>
      </View>

      {phaseProgress.map((item) => (
        <View
          key={item.phase}
          style={[styles.phaseProgressCard, { backgroundColor: colors.card }]}
        >
          <View style={styles.phaseProgressHeader}>
            <View
              style={[
                styles.phaseBadge,
                { backgroundColor: getPhaseColor(item.phase) + "20" },
              ]}
            >
              <Text
                style={[
                  styles.phaseBadgeText,
                  { color: getPhaseColor(item.phase) },
                ]}
              >
                Fase {item.phase}
              </Text>
            </View>
            <Text
              style={[styles.phasePercentage, { color: colors.textSecondary }]}
            >
              {Math.round(item.percentage)}%
            </Text>
          </View>
          <Text
            style={[styles.phaseProgressTitle, { color: colors.text }]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${item.percentage}%`,
                  backgroundColor: getPhaseColor(item.phase),
                },
              ]}
            />
          </View>
          <Text
            style={[styles.phaseProgressText, { color: colors.textSecondary }]}
          >
            {item.completed} de {item.total} exercicis completats
          </Text>
        </View>
      ))}

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
      paddingBottom: 24,
    },
    title: {
      fontSize: 32,
      fontWeight: "700" as const,
      color: colors.text,
    },
    statsCard: {
      marginHorizontal: 20,
      padding: 20,
      borderRadius: 16,
      marginBottom: 32,
    },
    statRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    statInfo: {
      flex: 1,
    },
    statValue: {
      fontSize: 24,
      fontWeight: "700" as const,
      marginBottom: 2,
    },
    statLabel: {
      fontSize: 14,
    },
    section: {
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "700" as const,
      marginBottom: 12,
    },
    progressBar: {
      height: 8,
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 4,
      overflow: "hidden",
      marginBottom: 8,
    },
    progressFill: {
      height: "100%",
      borderRadius: 4,
    },
    progressText: {
      fontSize: 12,
    },
    checklistCard: {
      marginHorizontal: 20,
      padding: 16,
      borderRadius: 16,
      marginBottom: 32,
      gap: 12,
    },
    checklistItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 4,
    },
    checklistText: {
      fontSize: 15,
      flex: 1,
    },
    checklistTextCompleted: {
      opacity: 0.6,
    },
    phaseProgressCard: {
      marginHorizontal: 20,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
    },
    phaseProgressHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    phaseBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
    },
    phaseBadgeText: {
      fontSize: 11,
      fontWeight: "600" as const,
    },
    phasePercentage: {
      fontSize: 14,
      fontWeight: "600" as const,
    },
    phaseProgressTitle: {
      fontSize: 14,
      fontWeight: "600" as const,
      marginBottom: 8,
    },
    phaseProgressText: {
      fontSize: 12,
    },
  });
