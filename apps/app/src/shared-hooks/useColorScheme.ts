import { Appearance, Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { useColorScheme as useNativewindColorScheme } from "nativewind";

import { colorTheme } from "~/utils/color-theme";

function setNavigationBar(colorScheme: "light" | "dark") {
  if (Platform.OS !== "android") return;

  return Promise.all([
    NavigationBar.setButtonStyleAsync(
      colorScheme === "dark" ? "light" : "dark",
    ),
    NavigationBar.setPositionAsync("absolute"),
    NavigationBar.setBackgroundColorAsync(
      colorScheme === "dark" ? colorTheme.dark.gray : colorTheme.light.gray,
    ),
  ]);
}

export function useColorScheme() {
  const { colorScheme, setColorScheme: setNativewindColorScheme } = useNativewindColorScheme();

  async function setColorScheme(colorScheme: "light" | "dark") {
    /*
     * Workaround: v4: Unable to manually set color scheme without using darkMode: class
     * https://github.com/nativewind/nativewind/issues/587
     */
    // Appearance.setColorScheme(colorScheme);
    setNativewindColorScheme(colorScheme);

    await setNavigationBar(colorScheme);
  }

  function toggleColorScheme() {
    const isDarkTheme = colorScheme === "dark";

    return setColorScheme(isDarkTheme ? "light" : "dark");
  }

  return {
    colorScheme: colorScheme ?? "dark",
    color: colorTheme[colorScheme ?? "light"],
    isDarkColorScheme: colorScheme === "dark",
    toggleColorScheme: toggleColorScheme,
  };
}
