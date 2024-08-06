import { useColorScheme } from "nativewind";

import { colorTheme } from "~/utils/color-theme";

// FIXME: replace with useColorScheme
export function useColor() {
  const { colorScheme } = useColorScheme();

  return colorTheme[colorScheme ?? "light"];
}
