import { useState } from "react";
import { Switch } from "react-native";

import { useColorScheme } from "~/shared-hooks/useColorScheme";

export function ColorSchemeSwitch() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const [value, setValue] = useState(colorScheme === "dark");

  const handleChange = (value: boolean) => {
    setValue(value);
    void toggleColorScheme();
  };

  return <Switch value={value} onValueChange={handleChange} />;
}
