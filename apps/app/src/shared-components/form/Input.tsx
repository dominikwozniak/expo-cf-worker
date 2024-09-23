import type { VariantProps } from "class-variance-authority";
import React, { useState } from "react";
import { TextInput } from "react-native";
import { BottomSheetTextInput as GBottomSheetTextInput } from "@gorhom/bottom-sheet";
import { cva } from "class-variance-authority";

import { cn } from "~/utils/classnames";

const inputVariants = cva(
  "text-ink-900 h-14 rounded-2xl border-2 bg-light px-4 py-2 text-[18px] leading-8 shadow-sm",
  {
    variants: {
      state: {
        default: "border-tertiary",
        focused: "border-primary",
        error: "border-accent",
      },
      isTextarea: {
        true: "h-[160px] justify-start pt-2",
        false: "",
      },
    },
    defaultVariants: {
      state: "default",
      isTextarea: false,
    },
  },
);

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput>,
    VariantProps<typeof inputVariants> {
  isError?: boolean;
  isPassword?: boolean;
  isBottomSheet?: boolean;
}

export function Input({
  isError,
  isTextarea,
  isPassword,
  isBottomSheet,
  autoCapitalize = "none",
  className,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const state = isError ? "error" : isFocused ? "focused" : "default";

  const InputComponent = isBottomSheet ? GBottomSheetTextInput : TextInput;

  return (
    <InputComponent
      onFocus={() => setIsFocused(true)}
      onEndEditing={() => setIsFocused(false)}
      className={cn(inputVariants({ state, isTextarea }), className)}
      autoCapitalize={autoCapitalize}
      autoCorrect={false}
      secureTextEntry={isPassword}
      {...props}
    />
  );
}
