import type { ViewProps } from "react-native";
import React from "react";
import { View } from "react-native";
import { cva } from "class-variance-authority";

import { cn } from "~/utils/classnames";

const listVariants = cva("mb-4", {
  variants: {},
});

export function List({ children, className, ...props }: ViewProps) {
  return (
    <View className={cn(listVariants(), className)} {...props}>
      {children}
    </View>
  );
}
