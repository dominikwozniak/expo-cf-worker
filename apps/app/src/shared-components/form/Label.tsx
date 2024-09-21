import type { FieldError } from "react-hook-form";
import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Typography } from "~/shared-components/Typography";

interface LabelProps extends React.ComponentPropsWithoutRef<typeof View> {
  isRequired?: boolean;
  isError: boolean;
  error: FieldError | undefined;
  labelId?: string;
  errorId?: string;
  children: React.ReactNode;
}

export function Label({
  isRequired,
  isError,
  error,
  labelId,
  errorId,
  children,
  ...rest
}: LabelProps) {
  const { t } = useTranslation();

  return (
    <View className="mb-1 flex flex-row justify-between px-2" {...rest}>
      <Typography
        variant="paragraph"
        weight="semiBold"
        color={isError ? "accent" : "default"}
        id={labelId}
        nativeID={labelId}
      >
        {children} {isRequired ? "*" : ""}
      </Typography>
      {isError ? (
        <Typography
          variant="paragraph"
          weight="semiBold"
          color="accent"
          id={errorId}
          nativeID={errorId}
        >
          {error?.message ?? t("common.input.required")}
        </Typography>
      ) : null}
    </View>
  );
}
