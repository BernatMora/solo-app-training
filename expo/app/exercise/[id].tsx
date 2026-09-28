import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckCircle2, Circle, ArrowLeft, Timer, Square, Save, AlertTriangle } from "lucide-react-native";
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
import { phases, TRAINER_INFO } from "@/constants/trainingData";
import { useProgress } from "@/contexts/ProgressContext";

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();
  const { progress, toggleExerciseComplete, addPracticeSession, toggleStepDone, getDoneSteps, clearSteps } = useProgress();

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

          {(exercise.trainers?.length ?? 0) > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Entrenadors que fa servir
              </Text>
              <View style={styles.trainerRow}>
                {(exercise.trainers ?? []).map((trainerId) => (
                  <View
                    key={trainerId}
                    style={[
                      styles.trainerBadge,
                      { backgroundColor: TRAINER_INFO[trainerId].color + "22" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.trainerBadgeText,
                        { color: TRAINER_INFO[trainerId].color },
                      ]}
                    >
                      {TRAINER_INFO[trainerId].label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {exercise.needsPurchase && (
            <View
              style={[
                styles.noticeCard,
                {
                  backgroundColor: colors.warning + "18",
                  borderColor: colors.warning,
                },
              ]}
            >
              <AlertTriangle size={18} color={colors.warning} />
              <Text style={[styles.noticeText, { color: colors.text }]}>
                Si la progressió que vols no és a la llista de Solo, caldrà la
                compra dins l'app "Buy Custom Chord Progressions" (Settings).
              </Text>
            </View>
          )}

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

          {exercise.setup && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Què has de posar a Solo
              </Text>
              <View
                style={[
                  styles.recipeCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                {exercise.setup.trainer && (
                  <View style={styles.recipeRow}>
                    <Text style={[styles.recipeLabel, { color: colors.textSecondary }]}>
                      Entrenador
                    </Text>
                    <Text
                      style={[
                        styles.recipeValue,
                        { color: TRAINER_INFO[exercise.setup.trainer].color },
                      ]}
                    >
                      {TRAINER_INFO[exercise.setup.trainer].label}
                    </Text>
                  </View>
                )}
                {exercise.setup.material && (
                  <View style={styles.recipeRow}>
                    <Text style={[styles.recipeLabel, { color: colors.textSecondary }]}>
                      Què hi trio
                    </Text>
                    <Text style={[styles.recipeValue, { color: colors.text }]}>
                      {exercise.setup.material}
                    </Text>
                  </View>
                )}
                {exercise.setup.functions && (
                  <View style={styles.recipeRow}>
                    <Text style={[styles.recipeLabel, { color: colors.textSecondary }]}>
                      Què em demanarà
                    </Text>
                    <Text style={[styles.recipeValue, { color: colors.text }]}>
                      {exercise.setup.functions}
                    </Text>
                  </View>
                )}
                {exercise.setup.root && (
                  <View style={styles.recipeRow}>
                    <Text style={[styles.recipeLabel, { color: colors.textSecondary }]}>
                      Tònica
                    </Text>
                    <Text style={[styles.recipeValue, { color: colors.text }]}>
                      {exercise.setup.root}
                    </Text>
                  </View>
                )}
                {exercise.setup.options && exercise.setup.options.length > 0 && (
                  <View style={styles.recipeRow}>
                    <Text style={[styles.recipeLabel, { color: colors.textSecondary }]}>
                      Botons i opcions
                    </Text>
                    <Text style={[styles.recipeValue, { color: colors.text }]}>
                      {exercise.setup.options.join(" → ")}
                    </Text>
                  </View>
                )}
                <View style={styles.recipeRow}>
                  <Text style={[styles.recipeLabel, { color: colors.textSecondary }]}>
                    Durada
                  </Text>
                  <Text style={[styles.recipeValue, { color: colors.text }]}>
                    {exercise.setup.hasDuration
                      ? "Té workout amb durada"
                      : "Sense durada: acaba quan acaba la progressió"}
                  </Text>
                </View>
                {exercise.needsPurchase && (
                  <View style={styles.recipeRow}>
                    <Text style={[styles.recipeLabel, { color: colors.textSecondary }]}>
                      Compra in-app
                    </Text>
                    <Text style={[styles.recipeValue, { color: colors.warning }]}>
                      Pot caldre "Buy Custom Chord Progressions"
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {exercise.soloSteps && exercise.soloSteps.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Passos, un a un
              </Text>
              <View style={styles.stepsHeader}>
                <Text style={[styles.sectionHint, { color: colors.textSecondary }]}>
                  {getDoneSteps(exercise.id).length}/{exercise.soloSteps.length} passos fets. Ves marcant-los mentre els fas a l'app.
                </Text>
                {getDoneSteps(exercise.id).length > 0 && (
                  <TouchableOpacity onPress={() => clearSteps(exercise.id)}>
                    <Text style={[styles.resetSteps, { color: colors.tint }]}>
                      Reinicia
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={[styles.card, { backgroundColor: colors.card }]}>
                {exercise.soloSteps.map((step, index) => {
                  const isDone = getDoneSteps(exercise.id).includes(index);
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.stepRow}
                      onPress={() => toggleStepDone(exercise.id, index)}
                      testID={`soloStep-${index + 1}`}
                    >
                      {isDone ? (
                        <CheckCircle2 size={20} color={colors.success} />
                      ) : (
                        <Circle size={20} color={colors.textSecondary} />
                      )}
                      <Text
                        style={[
                          styles.cardText,
                          styles.stepText,
                          { color: isDone ? colors.textSecondary : colors.text },
                          isDone && styles.stepTextDone,
                        ]}
                      >
                        {step}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <TouchableOpacity
                style={[styles.guideLink, { borderColor: colors.border }]}
                onPress={() => router.push("/guia" as any)}
              >
                <Text style={[styles.guideLinkText, { color: colors.tint }]}>
                  Com es posa cada entrenador? Guia ràpida →
                </Text>
              </TouchableOpacity>
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
    trainerRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    trainerBadge: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 999,
    },
    trainerBadgeText: {
      fontSize: 12,
      fontWeight: "700" as const,
    },
    noticeCard: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
      padding: 14,
      borderRadius: 12,
      borderWidth: 1,
      marginBottom: 24,
    },
    noticeText: {
      flex: 1,
      fontSize: 13,
      lineHeight: 19,
    },
    recipeCard: {
      padding: 14,
      borderRadius: 12,
      borderWidth: 1,
      gap: 8,
    },
    recipeRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 12,
    },
    recipeLabel: {
      fontSize: 12,
      fontWeight: "600" as const,
      minWidth: 92,
    },
    recipeValue: {
      flex: 1,
      fontSize: 14,
      fontWeight: "600" as const,
      textAlign: "right",
    },
    sectionHint: {
      fontSize: 12,
      flex: 1,
      marginBottom: 12,
      marginTop: -6,
    },
    stepsHeader: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 12,
    },
    resetSteps: {
      fontSize: 12,
      fontWeight: "700" as const,
      marginTop: -6,
    },
    stepRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
      paddingVertical: 8,
    },
    stepText: {
      flex: 1,
    },
    stepTextDone: {
      textDecorationLine: "line-through",
    },
    guideLink: {
      marginTop: 12,
      padding: 12,
      borderRadius: 10,
      borderWidth: 1,
      alignItems: "center",
    },
    guideLinkText: {
      fontSize: 13,
      fontWeight: "700" as const,
    },
  });
