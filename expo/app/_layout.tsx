import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ProgressProvider } from "@/contexts/ProgressContext";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

/** A la web: service worker (per funcionar sense cobertura) i manifest PWA. */
function useWebAppShell() {
  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") return;

    const head = document.head;

    const ensureLink = (rel: string, href: string, extra?: Record<string, string>) => {
      if (document.querySelector(`link[rel="${rel}"]`)) return;
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      Object.entries(extra ?? {}).forEach(([k, v]) => link.setAttribute(k, v));
      head.appendChild(link);
    };

    ensureLink("manifest", "/manifest.json");
    ensureLink("apple-touch-icon", "/icon-192.png");

    if (!document.querySelector('meta[name="theme-color"]')) {
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = "#FF6B35";
      head.appendChild(meta);
    }

    const isLocalDev =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (!isLocalDev && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js").catch((error) => {
        console.warn("No s'ha pogut registrar el service worker:", error);
      });
    }
  }, []);
}

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Enrere" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="progress"
        options={{
          title: "El meu progrés",
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="guia"
        options={{
          title: "Com es posa a Solo",
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="setmana"
        options={{
          title: "Aquesta setmana",
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="exercise/[id]"
        options={{
          title: "Exercici",
          presentation: "card",
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  useWebAppShell();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ProgressProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootLayoutNav />
        </GestureHandlerRootView>
      </ProgressProvider>
    </QueryClientProvider>
  );
}
