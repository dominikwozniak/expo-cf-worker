"use client";

import { View } from "react-native";
import { useColorScheme } from "nativewind";
import tailwindConfig from "tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

import { Button } from "./Button";
import { Typography } from "./Typography";

export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <View className="flex-row">
      <Button
        onPress={() => {
          const newTheme = colorScheme == "dark" ? "light" : "dark";
          console.log(newTheme);
          setColorScheme(newTheme);
          console.log(resolveConfig(tailwindConfig).darkMode);
        }}
      >
        <Typography>Toggle Theme</Typography>
      </Button>
    </View>
  );
}
