import { Stack } from "expo-router";

import { useOnboarding } from "~/modules/onboarding/hooks/useOnboarding";

export default function AppLayout() {
  // TODO: check auth
  useOnboarding();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
