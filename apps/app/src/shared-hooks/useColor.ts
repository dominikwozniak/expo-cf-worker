import { useColorScheme } from "~/shared-hooks/useColorScheme";
import { colorTheme } from "~/utils/color-theme";

export function useColor() {
  const { colorScheme } = useColorScheme();

  return colorTheme[colorScheme];
}
