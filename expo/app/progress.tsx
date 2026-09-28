import { useRouter } from "expo-router";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Flame,
  Save,
  Timer,
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import Colors from "@/constants/colors";
import { phases, TRAINER_INFO, weeklyChecklist } from "@/constants/trainingData";
import { useProgress } from "@/contexts/ProgressContext";

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

const DAY_LABELS = ["dl", "dt", "dc", "dj", "dv", "ds", "dg"];

export default function ProgressScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();
  const {
    progress,
    toggleWeeklyChecklistItem,
    getWeeklyChecklistState,
    getTodayPracticeTime,
    getWeekPracticeTime,
    exportProgress,
    importProgress,
    resetProgress,
  } = useProgress();

  const [backupText, setBackupText] = useState("");
  const [backupState, setBackupState] = useState<
    "idle" | "exported" | "imported" | "error" | "reset"
  >("idle");

  const styles = createStyles(colors);

  const exerciseTitles = useMemo(() => {
    const map = new Map<string, { title: string; emoji?: string }>();
    for (const phase of phases) {
      for (const section of phase.sections) {
        for (const exercise of section.exercises) {
          map.set(exercise.id, { title: exercise.title, emoji: exercise.emoji });
        }
      }
    }
    return map;
  }, []);

  const totalExercises = exerciseTitles.size;
  const completedCount = progress.completedExercises.length;
  const totalMinutes = progress.practiceSessions.reduce(
    (sum, session) => sum + session.duration,
    0
  );

  const weekByDay = useMemo(() => {
    const today = new Date();
    const monday = new Date(today);
    const weekday = (today.getDay() + 6) % 7;
    monday.setDate(today.getDate() - weekday);

    const result: { label: string; minutes: number; isToday: boolean }[] = [];
    for (let i = 0; i < 7; i += 1) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      const key = dayKey(day.toISOString());
      const minutes = progress.practiceSessions
        .filter((session) => dayKey(session.date) === key)
        .reduce((sum, session) => sum + session.duration, 0);
      result.push({
        label: DAY_LABELS[i],
        minutes,
        isToday: key === dayKey(today.toISOString()),
      });
    }
    return result;
  }, [progress.practiceSessions]);

  const maxDayMinutes = Math.max(30, ...weekByDay.map((d) => d.minutes));

  const checklistState = getWeeklyChecklistState();
  const checklistDone = weeklyChecklist.filter(
    (item) => checklistState[item.id]
  ).length;

  const recentSessions = progress.practiceSessions.slice(0, 40);

  const trainerTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    for (const phase of phases) {
      for (const section of phase.sections) {
        for (const exercise of section.exercises) {
          if (!progress.completedExercises.includes(exercise.id)) continue;
          for (const trainer of exercise.trainers ?? []) {
            totals[trainer] = (totals[trainer] ?? 0) + 1;
          }
        }
      }
    }
    return totals;
  }, [progress.completedExercises]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          testID="progressBack"
        >
          <ArrowLeft size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>
          El meu progrés
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {formatMinutes(getTodayPracticeTime())}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            avui
          </Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {formatMinutes(getWeekPracticeTime())}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            aquesta setmana
          </Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {formatMinutes(totalMinutes)}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            en total
          </Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {completedCount}/{totalExercises}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            exercicis fets
          </Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Aquesta setmana
        </Text>
        <View style={styles.bars}>
          {weekByDay.map((day) => (
            <View key={day.label} style={styles.barColumn}>
              <View
                style={[
                  styles.barTrack,
                  { backgroundColor: colors.backgroundSecondary },
                ]}
              >
                <View
                  style={[
                    styles.barFill,
                    {
                      height: Math.max(
                        2,
                        Math.round((day.minutes / maxDayMinutes) * 90)
                      ),
                      backgroundColor: day.isToday
                        ? colors.tint
                        : colors.tint + "99",
                    },
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.barLabel,
                  {
                    color: day.isToday ? colors.tint : colors.textSecondary,
                    fontWeight: day.isToday ? ("700" as const) : ("400" as const),
                  },
                ]}
              >
                {day.label}
              </Text>
              <Text style={[styles.barMinutes, { color: colors.textSecondary }]}>
                {day.minutes > 0 ? day.minutes : ""}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.cardTitleRow}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Repàs setmanal
          </Text>
          <Text style={[styles.cardTitleMeta, { color: colors.textSecondary }]}>
            {checklistDone}/{weeklyChecklist.length}
          </Text>
        </View>
        {weeklyChecklist.map((item) => {
          const isChecked = Boolean(checklistState[item.id]);
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.checklistRow}
              onPress={() => toggleWeeklyChecklistItem(item.id)}
              testID={`weeklyChecklist-${item.id}`}
            >
              {isChecked ? (
                <CheckCircle2 size={20} color={colors.success} />
              ) : (
                <Circle size={20} color={colors.textSecondary} />
              )}
              <Text
                style={[
                  styles.checklistText,
                  { color: isChecked ? colors.textSecondary : colors.text },
                  isChecked && styles.checklistTextDone,
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          );
        })}
        <Text style={[styles.hint, { color: colors.textSecondary }]}>
          La casella es reinicia sola cada setmana.
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Exercicis fets per entrenador
        </Text>
        {Object.keys(TRAINER_INFO).map((trainerId) => {
          const info = TRAINER_INFO[trainerId as keyof typeof TRAINER_INFO];
          const done = trainerTotals[trainerId] ?? 0;
          return (
            <View key={trainerId} style={styles.trainerRow}>
              <View
                style={[styles.trainerDot, { backgroundColor: info.color }]}
              />
              <Text style={[styles.trainerLabel, { color: colors.text }]}>
                {info.label}
              </Text>
              <Text
                style={[styles.trainerValue, { color: colors.textSecondary }]}
              >
                {done}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.cardTitleRow}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Historial de sessions
          </Text>
          <Flame size={18} color={colors.tint} />
        </View>
        {recentSessions.length === 0 ? (
          <Text style={[styles.empty, { color: colors.textSecondary }]}>
            Encara no hi ha cap sessió guardada. A la fitxa d'un exercici, prem
            Start i després Guardar per desar-la aquí.
          </Text>
        ) : (
          recentSessions.map((session) => {
            const exercise = exerciseTitles.get(session.exerciseId);
            const date = new Date(session.date);
            return (
              <TouchableOpacity
                key={session.id}
                style={styles.sessionRow}
                onPress={() =>
                  router.push(`/exercise/${session.exerciseId}` as any)
                }
              >
                <View style={styles.sessionTop}>
                  <View style={styles.sessionTimer}>
                    <Timer size={14} color={colors.tint} />
                    <Text style={[styles.sessionMinutes, { color: colors.text }]}>
                      {session.duration} min
                    </Text>
                  </View>
                  <Text
                    style={[styles.sessionDate, { color: colors.textSecondary }]}
                  >
                    {date.toLocaleDateString("ca-ES", {
                      day: "2-digit",
                      month: "2-digit",
                    })}{" "}
                    {date.toLocaleTimeString("ca-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
                <Text style={[styles.sessionTitle, { color: colors.text }]}>
                  {exercise
                    ? `${exercise.emoji ? `${exercise.emoji} ` : ""}${exercise.title}`
                    : `Exercici ${session.exerciseId}`}
                </Text>
                {session.notes ? (
                  <Text
                    style={[styles.sessionNotes, { color: colors.textSecondary }]}
                  >
                    {session.notes}
                  </Text>
                ) : null}
              </TouchableOpacity>
            );
          })
        )}
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.cardTitleRow}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Còpia de seguretat del progrés
          </Text>
          <Save size={18} color={colors.tint} />
        </View>
        <Text style={[styles.backupHint, { color: colors.textSecondary }]}>
          El progrés (exercicis fets, notes de sessió, passos marcats i repàs
          setmanal) es guarda al navegador. Si canvies de dispositiu o buides les
          dades, es perd: desa'n una còpia aquí.
        </Text>

        <TouchableOpacity
          style={[styles.backupButton, { backgroundColor: colors.tint }]}
          onPress={() => {
            const json = exportProgress();
            setBackupText(json);
            if (typeof document !== "undefined") {
              const blob = new Blob([json], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `progres-solo-${new Date()
                .toISOString()
                .slice(0, 10)}.json`;
              link.click();
              URL.revokeObjectURL(url);
            }
            setBackupState("exported");
          }}
          testID="exportProgress"
        >
          <Save size={16} color="#FFFFFF" />
          <Text style={styles.backupButtonText}>Exporta el progrés</Text>
        </TouchableOpacity>

        <TextInput
          value={backupText}
          onChangeText={setBackupText}
          placeholder="Enganxa aquí una còpia per importar-la"
          placeholderTextColor={colors.textSecondary}
          multiline
          style={[
            styles.backupInput,
            {
              color: colors.text,
              borderColor: colors.border,
              backgroundColor: colors.backgroundSecondary,
            },
          ]}
          testID="backupText"
        />

        <View style={styles.backupActions}>
          <TouchableOpacity
            style={[styles.backupButtonOutline, { borderColor: colors.border }]}
            onPress={() => {
              const ok = importProgress(backupText);
              setBackupState(ok ? "imported" : "error");
            }}
            disabled={backupText.trim().length === 0}
            testID="importProgress"
          >
            <Text style={[styles.backupButtonOutlineText, { color: colors.text }]}>
              Importa
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.backupButtonOutline, { borderColor: colors.border }]}
            onPress={() => {
              if (typeof window !== "undefined") {
                const sure = window.confirm(
                  "Segur que vols esborrar tot el progrés? Aquesta acció no es pot desfer."
                );
                if (!sure) return;
              }
              resetProgress();
              setBackupText("");
              setBackupState("reset");
            }}
            testID="resetProgress"
          >
            <Text style={[styles.backupButtonOutlineText, { color: colors.error }]}>
              Esborra-ho tot
            </Text>
          </TouchableOpacity>
        </View>

        {backupState !== "idle" && (
          <Text
            style={[
              styles.backupStatus,
              {
                color:
                  backupState === "error" ? colors.error : colors.success,
              },
            ]}
          >
            {backupState === "exported"
              ? "Còpia generada. Si el navegador no l'ha baixada, copia el text de sobre."
              : backupState === "imported"
                ? "Progrés importat correctament."
                : backupState === "reset"
                  ? "Progrés esborrat."
                  : "El text no és una còpia vàlida."}
          </Text>
        )}
      </View>

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
      paddingBottom: 16,
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
    statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      paddingHorizontal: 20,
      marginBottom: 8,
    },
    statCard: {
      flexGrow: 1,
      flexBasis: "47%",
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
    card: {
      marginHorizontal: 20,
      marginTop: 12,
      padding: 16,
      borderRadius: 16,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "700" as const,
      marginBottom: 12,
    },
    cardTitleRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    cardTitleMeta: {
      fontSize: 13,
      fontWeight: "600" as const,
      marginBottom: 12,
    },
    bars: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 6,
    },
    barColumn: {
      flex: 1,
      alignItems: "center",
      gap: 4,
    },
    barTrack: {
      width: "100%",
      height: 90,
      borderRadius: 8,
      justifyContent: "flex-end",
      overflow: "hidden",
    },
    barFill: {
      width: "100%",
      borderRadius: 8,
      minHeight: 2,
    },
    barLabel: {
      fontSize: 12,
    },
    barMinutes: {
      fontSize: 10,
      minHeight: 12,
    },
    checklistRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingVertical: 8,
    },
    checklistText: {
      flex: 1,
      fontSize: 14,
      lineHeight: 20,
    },
    checklistTextDone: {
      textDecorationLine: "line-through",
    },
    hint: {
      fontSize: 11,
      marginTop: 8,
    },
    trainerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingVertical: 6,
    },
    trainerDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
    trainerLabel: {
      flex: 1,
      fontSize: 14,
    },
    trainerValue: {
      fontSize: 14,
      fontWeight: "700" as const,
    },
    empty: {
      fontSize: 13,
      lineHeight: 20,
    },
    sessionRow: {
      paddingVertical: 10,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
    },
    sessionTop: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 4,
    },
    sessionTimer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    sessionMinutes: {
      fontSize: 13,
      fontWeight: "700" as const,
    },
    sessionDate: {
      fontSize: 12,
    },
    sessionTitle: {
      fontSize: 14,
      fontWeight: "600" as const,
    },
    sessionNotes: {
      fontSize: 13,
      marginTop: 4,
      fontStyle: "italic",
    },
    backupHint: {
      fontSize: 12,
      lineHeight: 17,
      marginBottom: 12,
    },
    backupButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingVertical: 12,
      borderRadius: 12,
      marginBottom: 12,
    },
    backupButtonText: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "700" as const,
    },
    backupInput: {
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      minHeight: 110,
      fontSize: 12,
      lineHeight: 16,
      marginBottom: 12,
    },
    backupActions: {
      flexDirection: "row",
      gap: 10,
    },
    backupButtonOutline: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 12,
      borderWidth: 1,
      alignItems: "center",
    },
    backupButtonOutlineText: {
      fontSize: 14,
      fontWeight: "700" as const,
    },
    backupStatus: {
      fontSize: 12,
      marginTop: 10,
      lineHeight: 16,
    },
  });
