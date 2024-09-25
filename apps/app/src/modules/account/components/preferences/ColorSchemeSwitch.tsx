import { useState } from "react";
import { Switch } from "react-native";
import { useTranslation } from "react-i18next";

import { useColorScheme } from "~/shared-hooks/useColorScheme";

export function ColorSchemeSwitch() {
  const { t } = useTranslation();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const [value, setValue] = useState(colorScheme === "dark");

  const handleChange = (value: boolean) => {
    setValue(value);
    void toggleColorScheme();
  };

  return (
    <Switch
      value={value}
      onValueChange={handleChange}
      accessibilityLabel={t("account.preferencesScreen.darkMode.label")}
    />
  );
}
