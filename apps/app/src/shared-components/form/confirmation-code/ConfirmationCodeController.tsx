import type { Control, FieldValues, Path } from "react-hook-form";
import React from "react";
import { View } from "react-native";
import { Controller } from "react-hook-form";

import { ConfirmationCode } from "~/shared-components/form/confirmation-code/ConfirmationCode";

interface ConfirmationCodeProps<T extends FieldValues>
  extends React.ComponentPropsWithoutRef<typeof View> {
  control?: Control<T>;
  name: Path<T>;
  isRequired?: boolean;
  customRules?: Record<string, unknown>;
}

export function ConfirmationCodeController<FieldName extends FieldValues>({
  control,
  name,
  isRequired,
  customRules,
  ...props
}: ConfirmationCodeProps<FieldName>) {
  return (
    <View {...props}>
      <Controller
        name={name}
        control={control}
        rules={{ required: isRequired, ...customRules }}
        render={({ field: { value, onChange } }) => {
          return <ConfirmationCode value={value} setValue={onChange} />;
        }}
      />
    </View>
  );
}
