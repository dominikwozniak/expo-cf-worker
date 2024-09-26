import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ClerkProvider } from "@clerk/clerk-expo";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PostHogProvider } from "posthog-react-native";
import { Toaster } from "sonner-native";

import { AlertProvider } from "~/shared-components/providers/AlertProvider";
import { ThemeProvider } from "~/shared-components/providers/ThemeProvider";
import { TRPCProvider } from "~/shared-components/providers/TRPCProvider";
import { tokenCache } from "~/utils/token-cache";

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const posthogApiKey = process.env.EXPO_PUBLIC_POSTHOG_API_KEY;

if (!clerkPublishableKey) {
  throw new Error(
    "Missing Clerk Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
  );
}

if (!posthogApiKey) {
  throw new Error(
    "Missing PostHog API Key. Please set EXPO_PUBLIC_POSTHOG_API_KEY in your .env",
  );
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
      <PostHogProvider
        apiKey={posthogApiKey}
        options={{
          host: "https://eu.i.posthog.com",
          enableSessionReplay: false,
        }}
        autocapture={{
          captureLifecycleEvents: false,
          captureTouches: false,
          captureScreens: true,
        }}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider>
            <ActionSheetProvider>
              <AlertProvider>
                <BottomSheetModalProvider>
                  <TRPCProvider>
                    {children}
                    <Toaster />
                  </TRPCProvider>
                </BottomSheetModalProvider>
              </AlertProvider>
            </ActionSheetProvider>
          </ThemeProvider>
        </GestureHandlerRootView>
      </PostHogProvider>
    </ClerkProvider>
  );
};
