import { useEffect, useState } from "react";
import { getAppIcon, setAppIcon } from "expo-dynamic-app-icon";

const ICONS = [
  {
    name: "Default",
    // eslint-disable-next-line
    icon: require("../../../../../assets/icon.png"),
  },
  {
    name: "Dark",
    // eslint-disable-next-line
    icon: require("../../../../../assets/icon-dark.png"),
  },
] as const;

type IconName = (typeof ICONS)[number]["name"];

export function useIconPicker() {
  const [activeIcon, setActiveIcon] = useState<IconName>("Default");

  useEffect(() => {
    const icon = getAppIcon();
    setActiveIcon(icon as IconName);
  }, []);

  const onChangeAppIcon = (icon: IconName) => {
    setAppIcon(icon.toLowerCase());
    setActiveIcon(icon);
  };

  return {
    availableIcons: ICONS,
    activeIcon,
    onChangeAppIcon,
  };
}
