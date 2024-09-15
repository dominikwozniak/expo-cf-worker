import { Image, TouchableOpacity, View } from "react-native";

import { useIconPicker } from "~/modules/account/hooks/preferences/useIconPicker";
import { Typography } from "~/shared-components/Typography";
import { cn } from "~/utils/classnames";

export function IconPicker() {
  const { availableIcons, activeIcon, onChangeAppIcon } = useIconPicker();

  return (
    <View className="flex flex-row justify-center gap-8 py-4">
      {availableIcons.map((icon) => (
        <TouchableOpacity
          key={icon.name}
          activeOpacity={0.7}
          onPress={() => onChangeAppIcon(icon.name)}
          className="flex items-center gap-2"
        >
          <View
            className={cn("h-16 w-16 rounded-2xl border-2 p-1", {
              "border-primary":
                activeIcon.toLowerCase() === icon.name.toLowerCase(),
              "border-transparent":
                activeIcon.toLowerCase() !== icon.name.toLowerCase(),
            })}
          >
            {/* eslint-disable-next-line */}
            <Image source={icon.icon} className="h-full w-full rounded-xl" />
          </View>

          <Typography
            variant="small"
            weight={
              activeIcon.toLowerCase() === icon.name.toLowerCase()
                ? "semiBold"
                : "regular"
            }
          >
            {icon.name}
          </Typography>
        </TouchableOpacity>
      ))}
    </View>
  );
}
