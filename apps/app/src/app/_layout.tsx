import "../../global.css";
import "expo-dev-client";
import "@bacons/text-decoder/install";

import { useEffect } from "react";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as Sentry from "@sentry/react-native";

import { AppProvider } from "~/shared-components/providers/AppProvider";
import { useAuthRedirect } from "~/shared-hooks/auth/useAuthRedirect";
import { useAppBootstrap } from "~/shared-hooks/useAppBootstrap";
import { useColorScheme } from "~/shared-hooks/useColorScheme";

import "~/utils/i18n";

import { sentryConfig } from "~/config";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

Sentry.init({
  dsn: sentryConfig.dsn,
});

void SplashScreen.preventAutoHideAsync();

function AppLayout() {
  const { isAppReady } = useAppBootstrap();
  useAuthRedirect();

  useEffect(() => {
    if (isAppReady) {
      void SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return <Slot />;
}

function RootLayout() {
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

export default Sentry.wrap(RootLayout);
