import { ThemeProvider as RNThemeProvider } from "@react-navigation/native";

import { useColorScheme } from "~/shared-hooks/useColorScheme";
import { colorTheme } from "~/utils/color-theme";

const getTheme = (theme: "light" | "dark") => {
  return {
    dark: theme === "dark",
    colors: {
      background: colorTheme[theme].gray,
      border: colorTheme[theme].slate,
      card: colorTheme[theme].gray,
      primary: colorTheme[theme].primary,
      text: colorTheme[theme].slate,
      notification: colorTheme[theme].accent,
    },
  };
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme } = useColorScheme();

  return (
    <RNThemeProvider value={getTheme(colorScheme)}>{children}</RNThemeProvider>
  );
}
