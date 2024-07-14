import type { FieldError } from "react-hook-form";
import React from "react";
import { View } from "react-native";

import { Typography } from "~/shared-components/Typography";
import { i18n } from "~/utils/i18n";

interface LabelProps extends React.ComponentPropsWithoutRef<typeof View> {
  isRequired?: boolean;
  isError: boolean;
  error: FieldError | undefined;
  children: React.ReactNode;
}

export function Label({
  isRequired,
  isError,
  error,
  children,
  ...rest
}: LabelProps) {
  return (
    <View className="mb-1 flex flex-row justify-between px-2" {...rest}>
      <Typography
        variant="paragraph"
        weight="semiBold"
        color={isError ? "accent" : "default"}
      >
        {children} {isRequired ? "*" : ""}
      </Typography>
      {isError ? (
        <Typography variant="paragraph" weight="semiBold" color="accent">
          {error?.message ?? i18n.t("common.input.required")}
        </Typography>
      ) : null}
    </View>
  );
}
