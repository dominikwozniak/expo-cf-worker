import { useEffect } from "react";
import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { useColorScheme as useNativewindColorScheme } from "nativewind";

import { mmkvConfig } from "~/config";
import { colorTheme } from "~/utils/color-theme";
import { mmkvStore } from "~/utils/mmkv-store";

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
    mmkvStore.set(mmkvConfig.colorScheme, colorScheme);
    await setNavigationBar(colorScheme);
  };

  const toggleColorScheme = () => {
    const isDarkTheme = colorScheme === "dark";
    return setColorScheme(isDarkTheme ? "light" : "dark");
  };

  useEffect(() => {
    const savedColorScheme = mmkvStore.getString(mmkvConfig.colorScheme) as
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
