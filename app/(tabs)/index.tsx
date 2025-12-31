import { useRouter } from "expo-router";
import { Clock, Play, TrendingUp, ChevronRight } from "lucide-react-native";
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
import { dailyRoutine, phases } from "@/constants/trainingData";
import { useProgress } from "@/contexts/ProgressContext";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();
  const {
    progress,
    getTodayPracticeTime,
    getWeekPracticeTime,
  } = useProgress();

  const styles = createStyles(colors);
  const currentPhase = phases.find((p) => p.id === progress.currentPhase);

  const todayMinutes = Math.floor(getTodayPracticeTime() / 60);
  const weekMinutes = Math.floor(getWeekPracticeTime() / 60);

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Jazz Fusion</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Pla d&apos;Entrenament Progressiu</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Clock size={24} color={colors.tint} />
          <Text style={[styles.statValue, { color: colors.text }]}>
            {todayMinutes} min
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Avui
          </Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <TrendingUp size={24} color={colors.success} />
          <Text style={[styles.statValue, { color: colors.text }]}>
            {weekMinutes} min
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Aquesta setmana
          </Text>
        </View>
      </View>

      {currentPhase && (
        <View style={[styles.phaseCard, { backgroundColor: colors.card }]}>
          <View style={styles.phaseHeader}>
            <View
              style={[
                styles.phaseBadge,
                { backgroundColor: getPhaseColor(currentPhase.id) + "20" },
              ]}
            >
              <Text
                style={[
                  styles.phaseBadgeText,
                  { color: getPhaseColor(currentPhase.id) },
                ]}
              >
                Fase {currentPhase.id}
              </Text>
            </View>
            <Text style={[styles.phaseWeeks, { color: colors.textSecondary }]}>
              {currentPhase.weeks}
            </Text>
          </View>
          <Text style={[styles.phaseTitle, { color: colors.text }]}>
            {currentPhase.title}
          </Text>
          <View style={styles.objectivesList}>
            {currentPhase.objectives.slice(0, 2).map((objective, index) => (
              <View key={index} style={styles.objectiveItem}>
                <View
                  style={[
                    styles.objectiveDot,
                    { backgroundColor: getPhaseColor(currentPhase.id) },
                  ]}
                />
                <Text
                  style={[
                    styles.objectiveText,
                    { color: colors.textSecondary },
                  ]}
                  numberOfLines={1}
                >
                  {objective}
                </Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={styles.phaseButton}
            onPress={() => router.push("/(tabs)/training")}
          >
            <Text style={[styles.phaseButtonText, { color: colors.tint }]}>
              Veure pla complet
            </Text>
            <ChevronRight size={18} color={colors.tint} />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Rutina Diària Recomanada
        </Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
          45-90 minuts
        </Text>
      </View>

      {dailyRoutine.map((routine, index) => (
        <TouchableOpacity
          key={routine.id}
          style={[styles.routineCard, { backgroundColor: colors.card }]}
          onPress={() => router.push("/(tabs)/practice")}
        >
          <View style={styles.routineHeader}>
            <Text style={[styles.routineTitle, { color: colors.text }]}>
              {routine.title}
            </Text>
            <Text
              style={[styles.routineDuration, { color: colors.textSecondary }]}
            >
              {routine.duration}
            </Text>
          </View>
          <View style={styles.activitiesList}>
            {routine.activities.slice(0, 2).map((activity, idx) => (
              <Text
                key={idx}
                style={[styles.activityText, { color: colors.textSecondary }]}
                numberOfLines={1}
              >
                • {activity}
              </Text>
            ))}
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.startButton, { backgroundColor: colors.tint }]}
        onPress={() => router.push("/(tabs)/practice")}
      >
        <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
        <Text style={styles.startButtonText}>Començar Pràctica</Text>
      </TouchableOpacity>

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
    greeting: {
      fontSize: 32,
      fontWeight: "700" as const,
      color: colors.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    statsContainer: {
      flexDirection: "row",
      paddingHorizontal: 20,
      gap: 12,
      marginBottom: 24,
    },
    statCard: {
      flex: 1,
      padding: 16,
      borderRadius: 16,
      alignItems: "center",
      gap: 8,
    },
    statValue: {
      fontSize: 24,
      fontWeight: "700" as const,
    },
    statLabel: {
      fontSize: 12,
    },
    phaseCard: {
      marginHorizontal: 20,
      padding: 20,
      borderRadius: 16,
      marginBottom: 32,
    },
    phaseHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
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
    phaseWeeks: {
      fontSize: 12,
    },
    phaseTitle: {
      fontSize: 20,
      fontWeight: "700" as const,
      marginBottom: 16,
    },
    objectivesList: {
      gap: 8,
      marginBottom: 16,
    },
    objectiveItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    objectiveDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
    },
    objectiveText: {
      fontSize: 14,
      flex: 1,
    },
    phaseButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      paddingTop: 8,
    },
    phaseButtonText: {
      fontSize: 14,
      fontWeight: "600" as const,
    },
    section: {
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "700" as const,
      marginBottom: 4,
    },
    sectionSubtitle: {
      fontSize: 14,
    },
    routineCard: {
      marginHorizontal: 20,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
    },
    routineHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    routineTitle: {
      fontSize: 16,
      fontWeight: "600" as const,
    },
    routineDuration: {
      fontSize: 14,
    },
    activitiesList: {
      gap: 4,
    },
    activityText: {
      fontSize: 13,
    },
    startButton: {
      marginHorizontal: 20,
      marginTop: 8,
      padding: 16,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    startButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600" as const,
    },
  });
