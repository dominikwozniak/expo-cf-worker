import { Stack } from "expo-router";

export default function AppLayout() {
  // TODO: check auth

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
