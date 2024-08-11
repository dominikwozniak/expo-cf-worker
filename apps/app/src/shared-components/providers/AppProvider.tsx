import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ClerkProvider } from "@clerk/clerk-expo";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { AlertProvider } from "~/shared-components/providers/AlertProvider";
import { ThemeProvider } from "~/shared-components/providers/ThemeProvider";
import { TRPCProvider } from "~/utils/api";
import { tokenCache } from "~/utils/token-cache";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
  );
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <ActionSheetProvider>
            <BottomSheetModalProvider>
              <TRPCProvider>
                <AlertProvider>{children}</AlertProvider>
              </TRPCProvider>
            </BottomSheetModalProvider>
          </ActionSheetProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </ClerkProvider>
  );
};
