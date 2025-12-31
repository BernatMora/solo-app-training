import { Play, Pause, RotateCcw } from "lucide-react-native";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import Colors from "@/constants/colors";
import { dailyRoutine } from "@/constants/trainingData";
import { useProgress } from "@/contexts/ProgressContext";

export default function PracticeScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const { addPracticeSession } = useProgress();

  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [selectedRoutine, setSelectedRoutine] = useState<string | null>(null);

  const styles = createStyles(colors);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const handleFinish = () => {
    if (seconds > 0) {
      addPracticeSession({
        date: new Date().toISOString(),
        duration: seconds,
        exerciseId: selectedRoutine || "general",
      });
      setSeconds(0);
      setIsRunning(false);
      setSelectedRoutine(null);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pràctica</Text>
      </View>

      <View style={[styles.timerCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.timerLabel, { color: colors.textSecondary }]}>
          Temps de pràctica
        </Text>
        <Text style={[styles.timerDisplay, { color: colors.text }]}>
          {formatTime(seconds)}
        </Text>
        <View style={styles.timerControls}>
          <TouchableOpacity
            style={[
              styles.controlButton,
              styles.resetButton,
              { backgroundColor: colors.backgroundSecondary },
            ]}
            onPress={handleReset}
          >
            <RotateCcw size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.controlButton,
              styles.mainButton,
              { backgroundColor: isRunning ? colors.warning : colors.tint },
            ]}
            onPress={handleStartPause}
          >
            {isRunning ? (
              <Pause size={32} color="#FFFFFF" fill="#FFFFFF" />
            ) : (
              <Play size={32} color="#FFFFFF" fill="#FFFFFF" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.controlButton,
              styles.finishButton,
              { backgroundColor: colors.success },
            ]}
            onPress={handleFinish}
            disabled={seconds === 0}
          >
            <Text style={styles.finishButtonText}>✓</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Rutina Diària
        </Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
          Selecciona una secció per començar
        </Text>
      </View>

      {dailyRoutine.map((routine) => {
        const isSelected = selectedRoutine === routine.id;
        return (
          <TouchableOpacity
            key={routine.id}
            style={[
              styles.routineCard,
              { backgroundColor: colors.card },
              isSelected && {
                borderColor: colors.tint,
                borderWidth: 2,
              },
            ]}
            onPress={() => setSelectedRoutine(routine.id)}
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
              {routine.activities.map((activity, idx) => (
                <View key={idx} style={styles.activityItem}>
                  <View
                    style={[
                      styles.activityDot,
                      {
                        backgroundColor: isSelected
                          ? colors.tint
                          : colors.textSecondary,
                      },
                    ]}
                  />
                  <Text
                    style={[styles.activityText, { color: colors.textSecondary }]}
                  >
                    {activity}
                  </Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
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
      paddingBottom: 24,
    },
    title: {
      fontSize: 32,
      fontWeight: "700" as const,
      color: colors.text,
    },
    timerCard: {
      marginHorizontal: 20,
      padding: 32,
      borderRadius: 20,
      alignItems: "center",
      marginBottom: 32,
    },
    timerLabel: {
      fontSize: 14,
      marginBottom: 12,
    },
    timerDisplay: {
      fontSize: 56,
      fontWeight: "700" as const,
      marginBottom: 24,
    },
    timerControls: {
      flexDirection: "row",
      gap: 16,
      alignItems: "center",
    },
    controlButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
    },
    mainButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    resetButton: {},
    finishButton: {},
    finishButtonText: {
      fontSize: 32,
      color: "#FFFFFF",
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
      marginBottom: 12,
    },
    routineTitle: {
      fontSize: 16,
      fontWeight: "600" as const,
    },
    routineDuration: {
      fontSize: 14,
    },
    activitiesList: {
      gap: 6,
    },
    activityItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
    },
    activityDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginTop: 6,
    },
    activityText: {
      fontSize: 13,
      flex: 1,
    },
  });
