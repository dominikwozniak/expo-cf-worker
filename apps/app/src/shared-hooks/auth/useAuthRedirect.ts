import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export function useAuthRedirect() {
  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthTabsGroup = segments[0] === "(auth)";

    if (isSignedIn && !inAuthTabsGroup) {
      router.replace("/(app)/(tabs)/home");
    } else if (!isSignedIn) {
      router.replace("/(auth)");
    }
  }, [isSignedIn, router, segments, isLoaded]);
}
