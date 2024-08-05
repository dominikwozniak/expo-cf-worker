import { useCallback } from "react";
import { Appearance, Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { useColorScheme as useNativewindColorScheme } from "nativewind";

import { colorTheme } from "~/utils/color-theme";

export function useColorScheme() {
  const {
    colorScheme,
    setColorScheme: setNativeWindColorScheme,
    toggleColorScheme: toggleNativeWindColorScheme,
  } = useNativewindColorScheme();

  async function setColorScheme(colorScheme: "light" | "dark") {
    setNativeWindColorScheme(colorScheme);
    // Appearance.setColorScheme(colorScheme)

    if (Platform.OS !== "android") return;
    try {
      await setNavigationBar(colorScheme);
    } catch (error) {
      console.error('useColorScheme.tsx", "setColorScheme', error);
    }
  }

  function toggleColorScheme() {
    const isDarkTheme = colorScheme === "dark";

    return setColorScheme(isDarkTheme ? "light" : "dark");
  }

  return {
    colorScheme: colorScheme ?? "dark",
    color: colorTheme[colorScheme ?? "light"],
    isDarkColorScheme: colorScheme === "dark",
    toggleColorScheme: toggleNativeWindColorScheme,
  };
}
function setNavigationBar(colorScheme: "light" | "dark") {
  return Promise.all([
    NavigationBar.setButtonStyleAsync(
      colorScheme === "dark" ? "light" : "dark",
    ),
    NavigationBar.setPositionAsync("absolute"),
    NavigationBar.setBackgroundColorAsync(
      colorScheme === "dark" ? "#00000030" : "#ffffff80",
    ),
  ]);
}
