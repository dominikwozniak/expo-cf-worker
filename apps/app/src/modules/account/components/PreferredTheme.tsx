import { useState } from "react";
import { Switch } from "react-native";
import { useColorScheme } from "nativewind";

import { MoonIcon } from "~/shared-components/icons";
import { List } from "~/shared-components/list";

export function PreferredTheme() {
  const [value, setValue] = useState(false);

  const { toggleColorScheme } = useColorScheme();

  const handleToggle = () => {
    setValue((prev) => !prev);
  }

  return (
    <List className="mt-4">
      <List.Inner>
        <List.Item icon={MoonIcon} title="Dark mode" isChevronHidden isLastItem>
          <Switch
            value={value}
            onChange={handleToggle}
          />
        </List.Item>
      </List.Inner>
    </List>
  );
}
