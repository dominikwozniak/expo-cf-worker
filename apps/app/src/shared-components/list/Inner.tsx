import type { VariantProps } from "class-variance-authority";
import type { ViewProps } from "react-native";
import React from "react";
import { View } from "react-native";
import { cva } from "class-variance-authority";

import { cn } from "~/utils/classnames";

const innerVariants = cva("rounded-2xl bg-gray-light px-2", {
  variants: {
    isAccent: {
      true: "border-2 border-accent bg-accent-light",
      false: "",
    },
  },
  defaultVariants: {
    isAccent: false,
  },
});
interface InnerListProps
  extends ViewProps,
    VariantProps<typeof innerVariants> {}

export function Inner({
  isAccent,
  children,
  className,
  ...props
}: InnerListProps) {
  return (
    <View className={cn(innerVariants({ isAccent }), className)} {...props}>
      {children}
    </View>
  );
}
