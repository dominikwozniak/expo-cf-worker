import React, { Fragment } from "react";
import { View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { cssInterop } from "nativewind";

import { Typography } from "~/shared-components/Typography";
import { cn } from "~/utils/classnames";

const CELL_COUNT = 6;

cssInterop(CodeField, {
  className: {
    target: "rootStyle",
  },
});

interface ConfirmationCodeProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  value: string;
  setValue: (value: string) => void;
}

export function ConfirmationCode({
  value,
  setValue,
  className,
  ...props
}: ConfirmationCodeProps) {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View className={cn("flex justify-center", className)}>
      <CodeField
        ref={ref}
        {...codeFieldProps}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        className="mx-auto flex gap-2"
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              className="flex h-14 w-12 items-center justify-center rounded-2xl border-2 border-primary bg-light"
            >
              <Typography variant="title">
                {symbol || (isFocused ? <Cursor /> : null)}
              </Typography>
            </View>
            {index === 2 ? (
              <View
                key={`separator-${index}`}
                className="my-auto h-[2px] w-4 bg-primary"
              />
            ) : null}
          </Fragment>
        )}
      />
    </View>
  );
}
