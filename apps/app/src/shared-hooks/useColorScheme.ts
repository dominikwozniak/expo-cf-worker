import { useEffect } from "react";
import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { useColorScheme as useNativewindColorScheme } from "nativewind";

import { colorTheme } from "~/utils/color-theme";
import { MMKV_COLOR_SCHEME, mmkvStore } from "~/utils/mmkv-store";

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
    mmkvStore.set(MMKV_COLOR_SCHEME, colorScheme);
    await setNavigationBar(colorScheme);
  };

  const toggleColorScheme = () => {
    const isDarkTheme = colorScheme === "dark";
    return setColorScheme(isDarkTheme ? "light" : "dark");
  };

  useEffect(() => {
    const savedColorScheme = mmkvStore.getString(MMKV_COLOR_SCHEME) as
      | "light"
      | "dark"
      | undefined;
    if (savedColorScheme) {
      void setColorScheme(savedColorScheme);
    }
  }, []);

  return {
    colorScheme: colorScheme ?? "light",
    isDarkColorScheme: colorScheme === "dark",
    toggleColorScheme: toggleColorScheme,
  };
}
