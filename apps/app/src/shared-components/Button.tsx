import type { VariantProps } from "class-variance-authority";
import type { TouchableOpacityProps } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { cva } from "class-variance-authority";

import { Typography } from "~/shared-components/Typography";
import { cn } from "~/utils/classnames";

const buttonVariants = cva("border-2", {
  variants: {
    backgroundColor: {
      primary: "border-primary bg-primary",
      secondary: "border-secondary bg-secondary",
      alternative: "border-primary bg-light",
      transparent: "border-transparent bg-transparent",
    },
  },
  defaultVariants: {
    backgroundColor: "primary",
  },
});

const textVariants = cva("py-2 leading-8", {
  variants: {
    textColor: {
      primary: "text-light",
      alternative: "text-primary",
      transparent: "text-primary underline decoration-2",
    },
  },
  defaultVariants: {
    textColor: "primary",
  },
});

interface ButtonProps
  extends TouchableOpacityProps,
    VariantProps<typeof buttonVariants>,
    VariantProps<typeof textVariants> {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  uppercase?: boolean;
}

export function Button({
  backgroundColor,
  textColor,
  className,
  loading,
  disabled,
  uppercase,
  children,
  ...props
}: ButtonProps) {
  const baseClassName = "flex w-full items-center justify-center rounded-2xl";

  return (
    <TouchableOpacity
      disabled={loading ?? disabled}
      activeOpacity={0.7}
      className={cn([
        baseClassName,
        buttonVariants({ backgroundColor }),
        { "opacity-70": loading ?? disabled },
        className,
      ])}
      {...props}
    >
      <Typography
        variant={"title"}
        weight="bold"
        uppercase={uppercase}
        className={cn(textVariants({ textColor }))}
      >
        {children}
      </Typography>
    </TouchableOpacity>
  );
}
