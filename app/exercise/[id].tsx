import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckCircle2, Circle, ArrowLeft, Timer, Square, Save } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  TextInput,
} from "react-native";

import Colors from "@/constants/colors";
import { phases } from "@/constants/trainingData";
import { useProgress } from "@/contexts/ProgressContext";

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();
  const { progress, toggleExerciseComplete, addPracticeSession } = useProgress();

  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [sessionNotes, setSessionNotes] = useState<string>("");

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedAtRef = useRef<number | null>(null);

  const styles = createStyles(colors);

  const { exercise, phaseId } = useMemo(() => {
    let foundExercise: (typeof phases)[number]["sections"][number]["exercises"][number] | null = null;
    let foundPhaseId = 1;

    for (const phase of phases) {
      for (const section of phase.sections) {
        const found = section.exercises.find((ex) => ex.id === id);
        if (found) {
          foundExercise = found;
          foundPhaseId = phase.id;
          break;
        }
      }
      if (foundExercise) break;
    }

    return { exercise: foundExercise, phaseId: foundPhaseId };
  }, [id]);

  const isCompleted = useMemo(() => {
    if (!exercise) return false;
    return progress.completedExercises.includes(exercise.id);
  }, [exercise, progress.completedExercises]);

  const getPhaseColor = (phId: number) => {
    switch (phId) {
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
      default:
        return colors.tint;
    }
  };

  const phaseColor = getPhaseColor(phaseId);

  const elapsedLabel = useMemo(() => {
    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  }, [elapsedSeconds]);

  const stopTimer = async (opts?: { save: boolean }) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsTimerRunning(false);

    const shouldSave = opts?.save ?? false;
    const durationMinutes = Math.max(1, Math.round(elapsedSeconds / 60));

    if (shouldSave) {
      try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch (e) {
        console.log("Haptics error (stopTimer):", e);
      }

      if (!exercise) {
        console.log("stopTimer(save): exercise not found, skipping save");
      } else {
        try {
          addPracticeSession({
            date: new Date().toISOString(),
            duration: durationMinutes,
            exerciseId: exercise.id,
            notes: sessionNotes.trim().length > 0 ? sessionNotes.trim() : undefined,
          });
        } catch (e) {
          console.error("Error saving practice session:", e);
        }
      }

      setElapsedSeconds(0);
      setSessionNotes("");
    }

    startedAtRef.current = null;
  };

  const startTimer = async () => {
    if (isTimerRunning) return;

    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (e) {
      console.log("Haptics error (startTimer):", e);
    }

    setIsTimerRunning(true);
    const now = Date.now();
    startedAtRef.current = now;

    intervalRef.current = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  if (!exercise) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>Exercici no trobat</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={[styles.badge, { backgroundColor: phaseColor + "20" }]}>
          <Text style={[styles.badgeText, { color: phaseColor }]}>
            Exercici {exercise.id}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>
            {exercise.emoji ? `${exercise.emoji} ` : ''}{exercise.title}
          </Text>

          <TouchableOpacity
            style={[
              styles.completeButton,
              isCompleted
                ? { backgroundColor: colors.success }
                : { backgroundColor: colors.backgroundSecondary, borderWidth: 2, borderColor: colors.border },
            ]}
            onPress={() => toggleExerciseComplete(exercise.id)}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 size={24} color="#FFFFFF" />
                <Text style={styles.completeButtonText}>Completat</Text>
              </>
            ) : (
              <>
                <Circle size={24} color={colors.textSecondary} />
                <Text style={[styles.incompleteButtonText, { color: colors.text }]}>
                  Marcar com a completat
                </Text>
              </>
            )}
          </TouchableOpacity>

          <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
              Durada recomanada
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {exercise.duration}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Sessió (cronòmetre)</Text>

            <View style={[styles.timerCard, { backgroundColor: colors.card }]}
              testID="practiceTimerCard"
            >
              <View style={styles.timerTopRow}>
                <View style={styles.timerLabelRow}>
                  <Timer size={18} color={phaseColor} />
                  <Text style={[styles.timerLabel, { color: colors.textSecondary }]}>Temps actual</Text>
                </View>
                <Text style={[styles.timerValue, { color: colors.text }]} testID="practiceTimerValue">
                  {elapsedLabel}
                </Text>
              </View>

              <View style={styles.timerActions}>
                {!isTimerRunning ? (
                  <TouchableOpacity
                    style={[styles.timerPrimaryButton, { backgroundColor: phaseColor }]}
                    onPress={startTimer}
                    testID="practiceTimerStart"
                  >
                    <Text style={styles.timerPrimaryText}>Start</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.timerStopButton, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}
                    onPress={() => stopTimer({ save: false })}
                    testID="practiceTimerStop"
                  >
                    <Square size={18} color={colors.text} />
                    <Text style={[styles.timerStopText, { color: colors.text }]}>Stop</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={[
                    styles.timerSaveButton,
                    {
                      backgroundColor: colors.backgroundSecondary,
                      borderColor: colors.border,
                      opacity: elapsedSeconds >= 10 ? 1 : 0.55,
                    },
                  ]}
                  onPress={() => {
                    if (elapsedSeconds < 10) return;
                    stopTimer({ save: true });
                  }}
                  disabled={elapsedSeconds < 10}
                  testID="practiceTimerSave"
                >
                  <Save size={18} color={colors.text} />
                  <Text style={[styles.timerSaveText, { color: colors.text }]}>Guardar</Text>
                </TouchableOpacity>
              </View>

              <TextInput
                value={sessionNotes}
                onChangeText={setSessionNotes}
                placeholder="Notes (què t'ha costat, què millorar demà...)"
                placeholderTextColor={colors.textSecondary}
                style={[
                  styles.timerNotes,
                  {
                    color: colors.text,
                    borderColor: colors.border,
                    backgroundColor: colors.backgroundSecondary,
                  },
                ]}
                multiline
                textAlignVertical="top"
                testID="practiceTimerNotes"
              />

              <Text style={[styles.timerHint, { color: colors.textSecondary }]}>
                Tip: fes servir aquest cronòmetre mentre segueixes els passos de Solo, i guarda la sessió quan acabis.
              </Text>
            </View>
          </View>

          {exercise.soloSteps && exercise.soloSteps.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Configuració Solo App
              </Text>
              <View style={[styles.card, { backgroundColor: colors.card }]}>
                {exercise.soloSteps.map((step, index) => (
                  <Text
                    key={index}
                    style={[
                      styles.cardText,
                      { color: colors.textSecondary, marginBottom: index < (exercise.soloSteps?.length || 0) - 1 ? 8 : 0 },
                    ]}
                  >
                    {step}
                  </Text>
                ))}
              </View>
            </View>
          )}

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Pràctica
            </Text>
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <Text style={[styles.cardText, { color: colors.textSecondary }]}>
                {exercise.practice}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Progressió
            </Text>
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <Text style={[styles.cardText, { color: colors.textSecondary }]}>
                {exercise.progression}
              </Text>
            </View>
          </View>

          <View style={{ height: 32 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const createStyles = (colors: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 16,
    },
    backButton: {
      padding: 8,
    },
    badge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: "600" as const,
    },
    scrollView: {
      flex: 1,
    },
    content: {
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "700" as const,
      marginBottom: 24,
    },
    completeButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      padding: 16,
      borderRadius: 12,
      marginBottom: 24,
    },
    completeButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600" as const,
    },
    incompleteButtonText: {
      fontSize: 16,
      fontWeight: "600" as const,
    },
    infoCard: {
      padding: 16,
      borderRadius: 12,
      marginBottom: 24,
    },
    infoLabel: {
      fontSize: 12,
      marginBottom: 4,
    },
    infoValue: {
      fontSize: 18,
      fontWeight: "600" as const,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "700" as const,
      marginBottom: 12,
    },
    card: {
      padding: 16,
      borderRadius: 12,
    },
    cardText: {
      fontSize: 15,
      lineHeight: 22,
    },
    timerCard: {
      padding: 16,
      borderRadius: 14,
    },
    timerTopRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    timerLabelRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    timerLabel: {
      fontSize: 13,
      fontWeight: "600" as const,
    },
    timerValue: {
      fontSize: 22,
      fontWeight: "800" as const,
      letterSpacing: 0.2,
    },
    timerActions: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 12,
    },
    timerPrimaryButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    timerPrimaryText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700" as const,
    },
    timerStopButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 12,
      borderWidth: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    timerStopText: {
      fontSize: 16,
      fontWeight: "700" as const,
    },
    timerSaveButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 12,
      borderWidth: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    timerSaveText: {
      fontSize: 16,
      fontWeight: "700" as const,
    },
    timerNotes: {
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      minHeight: 92,
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 10,
    },
    timerHint: {
      fontSize: 12,
      lineHeight: 16,
    },
    errorContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    errorText: {
      fontSize: 18,
      fontWeight: "600" as const,
    },
  });
