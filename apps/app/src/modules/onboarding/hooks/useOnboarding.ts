import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";

import { mmkvConfig } from "~/config";
import { mmkvStore } from "~/utils/mmkv-store";

export function useOnboarding() {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const isUserOnboarded = mmkvStore.getBoolean(mmkvConfig.onboardingComplete);
    const inOnboardingGroup = segments[0] === "(onboarding)";

    if (isUserOnboarded && inOnboardingGroup) {
      router.replace("/");
    }

    if (!isUserOnboarded && !inOnboardingGroup) {
      router.replace("/(onboarding)");
    }
  }, []);

  const completeOnboarding = () => {
    mmkvStore.set(mmkvConfig.onboardingComplete, true);
    router.push("/");
  };

  return { completeOnboarding };
}
