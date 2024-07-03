import "@bacons/text-decoder/install";

import { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

import { AppProvider } from "~/shared-components/providers/AppProvider";
import { useAppBootstrap } from "~/shared-hooks/useAppBootstrap";

import "../styles.css";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
  );
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const { isAppReady } = useAppBootstrap();

  useEffect(() => {
    if (isAppReady) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerStyle: {},
          contentStyle: {
            backgroundColor: colorScheme == "dark" ? "#09090B" : "#FFFFFF",
          },
        }}
      />
      <StatusBar />
    </AppProvider>
  );
}
