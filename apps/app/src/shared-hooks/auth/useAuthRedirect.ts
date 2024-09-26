import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

import { mmkvConfig } from "~/config";
import { mmkvStore } from "~/utils/mmkv-store";

export function useAuthRedirect() {
  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (isSignedIn && !inAuthGroup) {
      const isUserOnboarded = mmkvStore.getBoolean(
        mmkvConfig.onboardingComplete,
      );
      router.replace(isUserOnboarded ? "/(app)/(tabs)/home" : "/(onboarding)");
    } else if (!isSignedIn) {
      router.replace("/(auth)");
    }
  }, [isSignedIn, isLoaded]);
}
