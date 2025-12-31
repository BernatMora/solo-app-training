import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckCircle2, Circle, ArrowLeft } from "lucide-react-native";
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
import { phases } from "@/constants/trainingData";
import { useProgress } from "@/contexts/ProgressContext";

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();
  const { progress, toggleExerciseComplete } = useProgress();

  const styles = createStyles(colors);

  let exercise = null;
  let phaseId = 1;

  for (const phase of phases) {
    for (const section of phase.sections) {
      const found = section.exercises.find((ex) => ex.id === id);
      if (found) {
        exercise = found;
        phaseId = phase.id;
        break;
      }
    }
    if (exercise) break;
  }

  if (!exercise) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>
            Exercici no trobat
          </Text>
        </View>
      </View>
    );
  }

  const isCompleted = progress.completedExercises.includes(exercise.id);

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
      default:
        return colors.tint;
    }
  };

  const phaseColor = getPhaseColor(phaseId);

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
            {exercise.title}
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
