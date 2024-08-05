import "../../global.css";
import "expo-dev-client";
import "@bacons/text-decoder/install";

import type { Theme } from "@react-navigation/native";
import { useEffect } from "react";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider as NavThemeProvider } from "@react-navigation/native";

// import { useColorScheme } from "nativewind";

import { AppProvider } from "~/shared-components/providers/AppProvider";
import { useAuthRedirect } from "~/shared-hooks/auth/useAuthRedirect";
import { useAppBootstrap } from "~/shared-hooks/useAppBootstrap";
import { useColorScheme } from "~/shared-hooks/useColorScheme";

// import { useColorTheme } from "~/shared-hooks/useColorTheme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
SplashScreen.preventAutoHideAsync();

export const NAV_THEME = {
  light: {
    background: "hsl(0 0% 100%)", // background
    border: "hsl(240 5.9% 90%)", // border
    card: "hsl(0 0% 100%)", // card
    notification: "hsl(0 84.2% 60.2%)", // destructive
    primary: "hsl(240 5.9% 10%)", // primary
    text: "hsl(240 10% 3.9%)", // foreground
  },
  dark: {
    background: "hsl(240 10% 3.9%)", // background
    border: "hsl(240 3.7% 15.9%)", // border
    card: "hsl(240 10% 3.9%)", // card
    notification: "hsl(0 72% 51%)", // destructive
    primary: "hsl(0 0% 98%)", // primary
    text: "hsl(0 0% 98%)", // foreground
  },
};

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

function AppLayout() {
  const { isAppReady } = useAppBootstrap();
  useAuthRedirect();

  // const { theme } = useColorTheme();

  const { colorScheme } = useColorScheme();

  useEffect(() => {
    if (isAppReady) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <NavThemeProvider
      value={colorScheme === "light" ? LIGHT_THEME : DARK_THEME}
    >
      <Slot />
    </NavThemeProvider>
  );
}

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <>
      <StatusBar
        key={`root-status-bar-${colorScheme}`}
        style={colorScheme == "dark" ? "light" : "dark"}
      />
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </>
  );
}
