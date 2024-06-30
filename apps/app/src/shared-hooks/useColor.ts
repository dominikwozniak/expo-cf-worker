import { useColorScheme } from "nativewind";

import { colorTheme } from "~/utils/color-theme";

export function useColor() {
  const { colorScheme } = useColorScheme();

  return colorTheme[colorScheme ?? "light"];
}
