import { Link, Stack } from "expo-router";
import React from "react";
import { StyleSheet, View, Text, useColorScheme } from "react-native";

import Colors from "@/constants/colors";

export default function NotFoundScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <>
      <Stack.Screen options={{ title: "No trobat" }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>Pàgina no trobada</Text>
        <Link href="/" style={styles.link}>
          <Text style={[styles.linkText, { color: colors.tint }]}>Tornar a l&apos;inici</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold" as const,
    marginBottom: 16,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 16,
    fontWeight: "600" as const,
  },
});
