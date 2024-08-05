import { useState } from "react";
import { Appearance, Switch } from "react-native";



// import { useColorScheme } from "nativewind";

import { MoonIcon } from "~/shared-components/icons";
import { List } from "~/shared-components/list";
import { useColorScheme } from "~/shared-hooks/useColorScheme";


// import { useColorTheme } from "~/shared-hooks/useColorTheme";

export function PreferredTheme() {
  const [value, setValue] = useState(false);

  // const { theme, handleColorSchemeChange } = useColorTheme();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  console.log({ colorScheme });

  return (
    <List className="mt-4">
      <List.Inner>
        <List.Item icon={MoonIcon} title="Dark mode" isChevronHidden isLastItem>
          <Switch value={value} onChange={toggleColorScheme} />
        </List.Item>
      </List.Inner>
    </List>
  );
}
