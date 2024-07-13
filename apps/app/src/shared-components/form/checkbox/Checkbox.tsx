import type { VariantProps } from "class-variance-authority";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { cva } from "class-variance-authority";

import { CheckmarkIcon } from "~/shared-components/icons";
import { Typography } from "~/shared-components/Typography";
import { useColor } from "~/shared-hooks/useColor";
import { cn } from "~/utils/classnames";

const checkboxVariants = cva(
  "mr-4 flex h-[28px] w-[28px] items-center justify-center rounded-xl border-2",
  {
    variants: {
      variant: {
        primary: "border-primary",
        secondary: "border-secondary",
      },
      isChecked: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        isChecked: true,
        className: "bg-primary",
      },
      {
        variant: "secondary",
        isChecked: true,
        className: "bg-secondary",
      },
    ],
    defaultVariants: {
      variant: "primary",
      isChecked: false,
    },
  },
);

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof checkboxVariants> {
  label: string;
}

export function Checkbox({
  label,
  variant,
  isChecked,
  ...props
}: CheckboxProps) {
  const { light } = useColor();

  return (
    <TouchableOpacity
      className="flex flex-row items-center"
      activeOpacity={0.7}
      {...props}
    >
      <View className={cn(checkboxVariants({ variant, isChecked }))}>
        {isChecked ? <CheckmarkIcon color={light} /> : null}
      </View>
      <Typography weight="semiBold" className="pr-4">
        {label}
      </Typography>
    </TouchableOpacity>
  );
}
