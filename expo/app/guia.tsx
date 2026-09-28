import { useRouter } from "expo-router";
import { ArrowLeft, Info } from "lucide-react-native";
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
import { TRAINER_INFO } from "@/constants/trainingData";
import type { TrainerId } from "@/constants/trainingData";

interface Flow {
  trainer: TrainerId;
  steps: string[];
}

const FLOWS: Flow[] = [
  {
    trainer: "note",
    steps: [
      "Obre Solo i tria 'Note Trainer' al menú principal.",
      "Settings (engranatge, a dalt a la dreta) > 'Instrument': tria la guitarra o el baix que toques.",
      "Posa la durada del workout i prem el botó d'inici.",
      "Surt la nota root a l'atzar: toca-la al mànec. L'app no passa a la següent fins que l'encertes.",
      "Si vols el diagrama a pantalla, activa 'Show Fretboard' al setup del workout.",
    ],
  },
  {
    trainer: "interval",
    steps: [
      "Obre Solo i tria 'Interval Trainer'.",
      "Obre el panell 'Choose Intervallic Functions' i marca les funcions que vols practicar (1, 3, 5, 7, b9, 13…).",
      "Tria la root: fixa (una nota concreta) o aleatòria.",
      "Prem 'Start Intervallic Function Workout'.",
      "L'app et demana cada funció contra la root. Si vols decidir tu quan passa a la següent, posa 'Advance to Next Note' a On Tap.",
    ],
  },
  {
    trainer: "changes",
    steps: [
      "Obre Solo i tria 'Changes Trainer'.",
      "Prem 'Select Chord Changes' i tria una progressió (n'hi ha més de 100) o un exercici d'acord solt.",
      "Prem 'Select a Level' i tria el nivell de funcions que vols: dels chord tones bàsics a tensions i escales.",
      "Prem 'Start Changes Workout'.",
      "Per fer voltes seguides: activa 'Repeat'. Per canviar de tonalitat a cada volta: 'Randomise Key On Repeat'. Per fixar o moure la tonalitat: 'Transpose'.",
      "Opcional: a 'Interval Order' pots posar Random o Reverse (només en els nivells on té sentit).",
      "Aquest trainer NO té opció de durada: el workout dura el que dura la progressió.",
    ],
  },
  {
    trainer: "scale",
    steps: [
      "Obre Solo i tria 'Scale Trainer'.",
      "Prem 'Select a Scale' i tria l'escala o el mode (més de 50). Els modes són aquí dins: no hi ha cap 'Mode Trainer'.",
      "Tria la root: fixa o aleatòria.",
      "Prem 'Start Scale Workout'.",
      "Als ajustos del workout pots triar la seqüència melòdica (començar des de qualsevol chord tone) i l'ordre dels intervals.",
    ],
  },
];

const TIPS = [
  "Sortir d'un workout: prem i mantén la pantalla.",
  "El mànec i els diagrames només existeixen al Note Trainer i a l'Interval Trainer.",
  "Mentre fas un workout del Note o l'Interval, pots lliscar de dreta a esquerra per treure el mànec.",
  "Solo no mostra noms de notes (només la root) i no té metrònom, tempo ni backing tracks: és a propòsit. El pols el marques tu.",
  "Si les notes es detecten malament: Settings > 'Note Detection Sensitivity' i calibra.",
  "Progressions pròpies: es creen amb la compra dins l'app 'Buy Custom Chord Progressions' (Settings). Els slash chords simples (tríada major o menor + nota de baix) sí que s'hi poden entrar.",
  "Si no pots començar un workout, comprova que hagis triat les funcions (Interval), els canvis i el nivell (Changes) o l'escala (Scale): el botó d'inici està desactivat fins que ho triis.",
];

export default function GuiaScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();
  const styles = createStyles(colors);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          testID="guiaBack"
        >
          <ArrowLeft size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>
          Com es posa cada entrenador
        </Text>
      </View>

      <Text style={[styles.intro, { color: colors.textSecondary }]}>
        Solo té quatre entrenadors. Cada exercici de la web et diu quin et cal i
        què hi has de triar; aquí tens el flux complet de cadascun, amb els noms
        que veuràs a l'app.
      </Text>

      {FLOWS.map((flow) => {
        const info = TRAINER_INFO[flow.trainer];
        return (
          <View
            key={flow.trainer}
            style={[
              styles.card,
              { backgroundColor: colors.card, borderColor: info.color + "55" },
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.dot, { backgroundColor: info.color }]} />
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                {info.label}
              </Text>
            </View>
            <Text style={[styles.cardWhat, { color: colors.textSecondary }]}>
              {info.what}
            </Text>
            {flow.steps.map((step, index) => (
              <View key={index} style={styles.stepRow}>
                <Text style={[styles.stepNumber, { color: info.color }]}>
                  {index + 1}
                </Text>
                <Text style={[styles.stepText, { color: colors.text }]}>
                  {step}
                </Text>
              </View>
            ))}
          </View>
        );
      })}

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.cardHeader}>
          <Info size={18} color={colors.tint} />
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Coses que van bé saber
          </Text>
        </View>
        {TIPS.map((tip, index) => (
          <View key={index} style={styles.stepRow}>
            <Text style={[styles.bullet, { color: colors.tint }]}>•</Text>
            <Text style={[styles.stepText, { color: colors.text }]}>{tip}</Text>
          </View>
        ))}
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
      paddingBottom: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    backButton: {
      padding: 6,
    },
    title: {
      fontSize: 24,
      fontWeight: "700" as const,
      flex: 1,
    },
    intro: {
      paddingHorizontal: 20,
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 8,
    },
    card: {
      marginHorizontal: 20,
      marginTop: 12,
      padding: 16,
      borderRadius: 16,
      borderWidth: 1,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 8,
    },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    cardTitle: {
      fontSize: 17,
      fontWeight: "700" as const,
    },
    cardWhat: {
      fontSize: 13,
      marginBottom: 12,
      lineHeight: 18,
    },
    stepRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
      marginBottom: 10,
    },
    stepNumber: {
      fontSize: 13,
      fontWeight: "800" as const,
      minWidth: 16,
    },
    bullet: {
      fontSize: 14,
      fontWeight: "800" as const,
      minWidth: 16,
    },
    stepText: {
      flex: 1,
      fontSize: 14,
      lineHeight: 20,
    },
  });
