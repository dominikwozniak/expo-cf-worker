import { Platform } from "react-native";
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
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme, setColorScheme: setNativewindColorScheme } =
    useNativewindColorScheme();

  const setColorScheme = async (colorScheme: "light" | "dark") => {
    setNativewindColorScheme(colorScheme);
    await setNavigationBar(colorScheme);
  };

  const toggleColorScheme = () => {
    const isDarkTheme = colorScheme === "dark";
    return setColorScheme(isDarkTheme ? "light" : "dark");
  };

  return {
    colorScheme: colorScheme ?? "light",
    isDarkColorScheme: colorScheme === "dark",
    toggleColorScheme: toggleColorScheme,
  };
}
