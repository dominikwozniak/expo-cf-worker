import React from "react";
import { TouchableOpacity, View } from "react-native";

import { CheckmarkIcon } from "~/shared-components/icons";
import { Typography } from "~/shared-components/Typography";
import { useColor } from "~/shared-hooks/useColor";
import { cn } from "~/utils/classnames";

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
  label: string;
  isChecked?: boolean;
  isAlternative?: boolean;
}

export function Checkbox({
  label,
  isChecked,
  isAlternative,
  ...props
}: CheckboxProps) {
  const { light } = useColor();

  const backgroundColor = isAlternative ? "bg-secondary" : "bg-primary";
  const borderColor = isAlternative ? "border-primary" : "border-primary";
  const computedCheckboxClassName = cn([
    "mr-4 flex h-[28px] w-[28px] items-center justify-center rounded-xl border-2",
    borderColor,
    isChecked ? backgroundColor : "",
  ]);

  return (
    <TouchableOpacity
      className="flex flex-row items-center"
      activeOpacity={0.7}
      {...props}
    >
      <View className={computedCheckboxClassName}>
        {isChecked ? <CheckmarkIcon color={light} /> : null}
      </View>
      <Typography weight="semiBold" className="pr-4">
        {label}
      </Typography>
    </TouchableOpacity>
  );
}
