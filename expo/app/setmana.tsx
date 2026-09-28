import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Play,
  Target,
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
import { phases, TRAINER_INFO } from "@/constants/trainingData";
import { lastPlannedWeek, planForWeek } from "@/constants/planner";
import {
  NTFY_TOPIC,
  NTFY_URL,
  buildWeekMessage,
  canPublishFromBrowser,
  currentPlanWeek,
  sendToNtfy,
} from "@/constants/notify";
import { useProgress } from "@/contexts/ProgressContext";

type Exercise = (typeof phases)[number]["sections"][number]["exercises"][number];

export default function SetmanaScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();
  const { progress, updateWeek, toggleExerciseComplete } = useProgress();
  const styles = createStyles(colors);

  const phaseColors = useMemo(
    () => [
      colors.phase1,
      colors.phase2,
      colors.phase3,
      colors.phase4,
      colors.phase5,
      colors.phase6,
      colors.phase7,
      colors.phase8,
      colors.phase9,
      colors.phase10,
      colors.phase11,
      colors.phase12,
      colors.phase13,
      colors.phase14,
    ],
    [colors]
  );

  const phaseColor = (phaseId: number) =>
    phaseColors[(phaseId - 1) % phaseColors.length] ?? colors.tint;

  const exerciseMap = useMemo(() => {
    const map = new Map<string, Exercise>();
    for (const phase of phases) {
      for (const section of phase.sections) {
        for (const exercise of section.exercises) {
          map.set(exercise.id, exercise);
        }
      }
    }
    return map;
  }, []);

  const maxWeek = useMemo(() => lastPlannedWeek(), []);
  const week = Math.min(Math.max(progress.currentWeek, 1), maxWeek);
  const planned = useMemo(() => planForWeek(week), [week]);

  const allIds = useMemo(
    () => planned.flatMap((block) => block.exerciseIds),
    [planned]
  );
  const doneIds = allIds.filter((id) =>
    progress.completedExercises.includes(id)
  );
  const firstPending = allIds.find(
    (id) => !progress.completedExercises.includes(id)
  );

  const computedWeek = useMemo(() => currentPlanWeek(), []);
  const [sendState, setSendState] = useState<
    "idle" | "sending" | "ok" | "error" | "blocked"
  >("idle");

  const sendPlan = async () => {
    if (!canPublishFromBrowser()) {
      setSendState("blocked");
      return;
    }
    setSendState("sending");
    const ok = await sendToNtfy(buildWeekMessage(week));
    setSendState(ok ? "ok" : "error");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          testID="setmanaBack"
        >
          <ArrowLeft size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>
          Aquesta setmana
        </Text>
      </View>

      <View style={[styles.weekPicker, { backgroundColor: colors.card }]}>
        <TouchableOpacity
          style={styles.weekButton}
          onPress={() => updateWeek(Math.max(1, week - 1))}
          disabled={week <= 1}
          testID="weekPrev"
        >
          <ChevronLeft
            size={22}
            color={week <= 1 ? colors.border : colors.text}
          />
        </TouchableOpacity>
        <View style={styles.weekCenter}>
          <Text style={[styles.weekNumber, { color: colors.text }]}>
            Setmana {week}
          </Text>
          <Text style={[styles.weekOf, { color: colors.textSecondary }]}>
            de {maxWeek} setmanes del pla
          </Text>
        </View>
        <TouchableOpacity
          style={styles.weekButton}
          onPress={() => updateWeek(Math.min(maxWeek, week + 1))}
          disabled={week >= maxWeek}
          testID="weekNext"
        >
          <ChevronRight
            size={22}
            color={week >= maxWeek ? colors.border : colors.text}
          />
        </TouchableOpacity>
      </View>

      <Text style={[styles.weekHint, { color: colors.textSecondary }]}>
        Posa la setmana en què ets del teu pla i aquí veuràs què toca. Les
        setmanes surten dels blocs de cada mòdul.
      </Text>

      {computedWeek !== week && (
        <TouchableOpacity
          style={[styles.suggestRow, { borderColor: colors.border }]}
          onPress={() => updateWeek(computedWeek)}
          testID="weekSuggestion"
        >
          <Text style={[styles.suggestText, { color: colors.tint }]}>
            Segons la data d'inici del pla, ara ets a la setmana {computedWeek}.
            Tocar-la per anar-hi.
          </Text>
        </TouchableOpacity>
      )}

      <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
        <View style={styles.summaryRow}>
          <Target size={18} color={colors.tint} />
          <Text style={[styles.summaryText, { color: colors.text }]}>
            {doneIds.length}/{allIds.length} exercicis fets aquesta setmana
          </Text>
        </View>
        {firstPending && (
          <TouchableOpacity
            style={[styles.startButton, { backgroundColor: colors.tint }]}
            onPress={() => router.push(`/exercise/${firstPending}` as any)}
            testID="setmanaStart"
          >
            <Play size={16} color="#FFFFFF" />
            <Text style={styles.startButtonText}>
              Comença pel següent pendent
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.ntfyButton, { borderColor: colors.border }]}
          onPress={sendPlan}
          disabled={sendState === "sending"}
          testID="setmanaNtfy"
        >
          <Bell size={16} color={colors.tint} />
          <Text style={[styles.ntfyButtonText, { color: colors.tint }]}>
            {sendState === "sending"
              ? "Enviant..."
              : sendState === "ok"
                ? `Enviat al mòbil (ntfy · ${NTFY_TOPIC})`
                : sendState === "blocked"
                  ? `El ntfy de casa (${NTFY_URL}) només es pot cridar per HTTPS`
                  : sendState === "error"
                    ? `No s'ha pogut enviar (cal permís d'escriptura al topic ${NTFY_TOPIC})`
                    : `Envia'm aquest pla al mòbil (ntfy · ${NTFY_TOPIC})`}
          </Text>
        </TouchableOpacity>
        <Text style={[styles.ntfyHint, { color: colors.textSecondary }]}>
          Cada dilluns arriba sol si tens el recordatori setmanal activat al
          repositori (Actions → Pla setmanal a ntfy).
        </Text>
      </View>

      {planned.length === 0 && (
        <Text style={[styles.empty, { color: colors.textSecondary }]}>
          Aquesta setmana no hi ha cap bloc definit al pla.
        </Text>
      )}

      {planned.map((block, index) => {
        const color = phaseColor(block.phaseId);
        const blockDone = block.exerciseIds.filter((id) =>
          progress.completedExercises.includes(id)
        ).length;

        return (
          <View
            key={`${block.phaseId}-${index}`}
            style={[styles.card, { backgroundColor: colors.card }]}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.badge, { backgroundColor: color + "22" }]}>
                <Text style={[styles.badgeText, { color }]}>
                  {block.phaseEmoji} Mòdul {block.phaseId}
                </Text>
              </View>
              <Text
                style={[styles.blockCount, { color: colors.textSecondary }]}
              >
                {blockDone}/{block.exerciseIds.length}
              </Text>
            </View>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              {block.sectionTitle}
            </Text>
            <Text style={[styles.cardWeeks, { color }]}>
              {block.sectionWeeks}
            </Text>
            <Text
              style={[styles.cardObjectives, { color: colors.textSecondary }]}
            >
              {block.objectives.join(" · ")}
            </Text>

            {block.exerciseIds.map((id) => {
              const exercise = exerciseMap.get(id);
              if (!exercise) return null;
              const isDone = progress.completedExercises.includes(id);
              return (
                <View key={id} style={styles.exerciseRow}>
                  <TouchableOpacity
                    onPress={() => toggleExerciseComplete(id)}
                    style={styles.exerciseCheck}
                    testID={`setmanaCheck-${id}`}
                  >
                    {isDone ? (
                      <CheckCircle2 size={20} color={colors.success} />
                    ) : (
                      <Circle size={20} color={colors.textSecondary} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.exerciseBody}
                    onPress={() => router.push(`/exercise/${id}` as any)}
                  >
                    <Text
                      style={[
                        styles.exerciseTitle,
                        { color: isDone ? colors.textSecondary : colors.text },
                        isDone && styles.exerciseTitleDone,
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
                        {exercise.id} · {exercise.duration}
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
                                { color: TRAINER_INFO[trainerId].color },
                              ]}
                            >
                              {TRAINER_INFO[trainerId].short}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        );
      })}

      <View style={{ height: 40 }} />
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
      paddingTop: 24,
      paddingBottom: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    backButton: {
      padding: 6,
    },
    title: {
      fontSize: 26,
      fontWeight: "700" as const,
    },
    weekPicker: {
      marginHorizontal: 20,
      borderRadius: 16,
      padding: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    weekButton: {
      padding: 8,
    },
    weekCenter: {
      alignItems: "center",
    },
    weekNumber: {
      fontSize: 20,
      fontWeight: "800" as const,
    },
    weekOf: {
      fontSize: 12,
    },
    weekHint: {
      paddingHorizontal: 20,
      marginTop: 8,
      fontSize: 12,
      lineHeight: 17,
    },
    summaryCard: {
      marginHorizontal: 20,
      marginTop: 12,
      padding: 16,
      borderRadius: 16,
      gap: 12,
    },
    summaryRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    summaryText: {
      fontSize: 15,
      fontWeight: "700" as const,
    },
    startButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingVertical: 12,
      borderRadius: 12,
    },
    startButtonText: {
      color: "#FFFFFF",
      fontSize: 15,
      fontWeight: "700" as const,
    },
    empty: {
      paddingHorizontal: 20,
      marginTop: 16,
      fontSize: 14,
    },
    suggestRow: {
      marginHorizontal: 20,
      marginTop: 10,
      padding: 12,
      borderRadius: 12,
      borderWidth: 1,
    },
    suggestText: {
      fontSize: 13,
      fontWeight: "600" as const,
    },
    ntfyButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingVertical: 12,
      borderRadius: 12,
      borderWidth: 1,
    },
    ntfyButtonText: {
      fontSize: 14,
      fontWeight: "700" as const,
      textAlign: "center",
    },
    ntfyHint: {
      fontSize: 11,
      lineHeight: 16,
    },
    card: {
      marginHorizontal: 20,
      marginTop: 12,
      padding: 16,
      borderRadius: 16,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    badge: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: "700" as const,
    },
    blockCount: {
      fontSize: 13,
      fontWeight: "700" as const,
    },
    cardTitle: {
      fontSize: 17,
      fontWeight: "700" as const,
    },
    cardWeeks: {
      fontSize: 12,
      fontWeight: "600" as const,
      marginTop: 2,
    },
    cardObjectives: {
      fontSize: 12,
      lineHeight: 17,
      marginTop: 8,
      marginBottom: 8,
    },
    exerciseRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
      paddingVertical: 8,
    },
    exerciseCheck: {
      paddingTop: 2,
    },
    exerciseBody: {
      flex: 1,
    },
    exerciseTitle: {
      fontSize: 14,
      fontWeight: "600" as const,
    },
    exerciseTitleDone: {
      textDecorationLine: "line-through",
    },
    exerciseMeta: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
      flexWrap: "wrap",
      marginTop: 4,
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
