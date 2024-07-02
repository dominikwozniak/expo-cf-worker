import type { VariantProps } from "class-variance-authority";
import React from "react";
import { Text } from "react-native";
import { cva } from "class-variance-authority";

import { cn } from "~/utils/classnames";

const textVariants = cva("", {
  variants: {
    color: {
      default: "text-dark",
      primary: "text-primary",
      secondary: "text-secondary",
      tertiary: "text-tertiary",
      accent: "text-accent",
      light: "text-light",
      slate: "text-slate",
    },
    weight: {
      regular: "font-poppins",
      semiBold: "font-poppinsSemiBold",
      bold: "font-poppinsBold",
    },
    variant: {
      hero: "text-5xl leading-[48px]",
      header: "text-4xl leading-10",
      subheader: "text-3xl leading-8",
      subheaderSecondary: "text-2xl",
      title: "text-xl leading-7",
      paragraph: "text-lg",
      regular: "text-base",
      small: "text-sm",
    },
  },
  defaultVariants: {
    variant: "regular",
    color: "default",
    weight: "regular",
  },
});

interface TypographyProps
  extends React.ComponentPropsWithoutRef<typeof Text>,
    VariantProps<typeof textVariants> {
  uppercase?: boolean;
}

export function Typography({
  color,
  weight,
  variant,
  uppercase,
  className,
  ...rest
}: TypographyProps) {
  return (
    <Text
      className={cn(
        textVariants({ color, weight, variant }),
        { uppercase },
        className,
      )}
      {...rest}
    />
  );
}
