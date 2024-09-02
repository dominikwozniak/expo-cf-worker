import type { Control, FieldError, FieldValues, Path } from "react-hook-form";
import React from "react";
import { View } from "react-native";
import { Controller } from "react-hook-form";

import { Input } from "~/shared-components/form/Input";
import { Label } from "~/shared-components/form/Label";

interface FormFieldProps<T extends FieldValues>
  extends React.ComponentPropsWithoutRef<typeof View> {
  control: Control<T>;
  error?: FieldError;
  name: Path<T>;
  label?: string;
  placeholder: string;
  isRequired?: boolean;
  customRules?: Record<string, unknown>;
  isPassword?: boolean;
  isNumeric?: boolean;
  isBottomSheet?: boolean;
}

export function FormField<FieldName extends FieldValues>({
  control,
  error,
  name,
  placeholder,
  label,
  isRequired,
  customRules,
  isPassword,
  isNumeric,
  isBottomSheet,
  ...props
}: FormFieldProps<FieldName>) {
  const isError = Object.keys(error ?? {}).length > 0;

  return (
    <View {...props}>
      <Controller
        name={name}
        control={control}
        rules={{ required: isRequired, ...customRules }}
        render={({ field: { value, onChange } }) => (
          <View>
            {label && label.length > 0 ? (
              <Label isError={isError} error={error} isRequired={isRequired}>
                {label}
              </Label>
            ) : null}
            <Input
              onChangeText={onChange}
              value={value}
              isError={isError}
              placeholder={placeholder}
              isPassword={isPassword}
              isBottomSheet={isBottomSheet}
              keyboardType={isNumeric ? "numeric" : "default"}
            />
          </View>
        )}
      />
    </View>
  );
}
