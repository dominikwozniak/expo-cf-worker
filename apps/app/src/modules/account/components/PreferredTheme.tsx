import { useState } from "react";
import { Switch } from "react-native";

import { MoonIcon } from "~/shared-components/icons";
import { List } from "~/shared-components/list";
import { useColorScheme } from "~/shared-hooks/useColorScheme";

export function PreferredTheme() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const [value, setValue] = useState(colorScheme === "dark");

  const handleChange = (value: boolean) => {
    setValue(value);
    void toggleColorScheme();
  };

  return (
    <List className="mt-4">
      <List.Inner>
        <List.Item icon={MoonIcon} title="Dark mode" isChevronHidden isLastItem>
          <Switch value={value} onValueChange={handleChange} />
        </List.Item>
      </List.Inner>
    </List>
  );
}
