import type { Control, FieldValues, Path } from "react-hook-form";
import React from "react";
import { View } from "react-native";
import { Controller } from "react-hook-form";

import { Checkbox } from "~/shared-components/form/checkbox/Checkbox";

interface CheckboxProps<T extends FieldValues>
  extends React.ComponentPropsWithoutRef<typeof View> {
  control?: Control<T>;
  name: Path<T>;
  label: string;
  isAlternative?: boolean;
}

export function CheckboxController<FieldName extends FieldValues>({
  control,
  name,
  label,
  isAlternative,
  ...props
}: CheckboxProps<FieldName>) {
  return (
    <View {...props}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <Checkbox
              label={label}
              isChecked={value}
              onPress={() => onChange(!value)}
              variant={isAlternative ? "secondary" : "primary"}
            />
          );
        }}
      />
    </View>
  );
}
