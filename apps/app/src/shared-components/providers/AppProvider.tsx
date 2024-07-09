import React from "react";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";

import { AlertProvider } from "~/shared-components/providers/AlertProvider";
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
      <ClerkLoaded>
        <TRPCProvider>
          <AlertProvider>{children}</AlertProvider>
        </TRPCProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
};
