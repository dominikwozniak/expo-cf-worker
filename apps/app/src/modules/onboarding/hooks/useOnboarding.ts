import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";

import { MMKV_ONBOARDING_COMPLETE, mmkvStore } from "~/utils/mmkv-store";

export function useOnboarding() {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const isUserOnboarded = mmkvStore.getBoolean(MMKV_ONBOARDING_COMPLETE);
    const inOnboardingGroup = segments[0] === "(onboarding)";

    if (isUserOnboarded && inOnboardingGroup) {
      router.replace("/");
    }

    if (!isUserOnboarded && !inOnboardingGroup) {
      router.replace("/(onboarding)");
    }
  }, []);

  const completeOnboarding = () => {
    mmkvStore.set(MMKV_ONBOARDING_COMPLETE, true);
    router.push("/");
  };

  return { completeOnboarding };
}
