import * as React from "react";
import type { ViewStyle } from "react-native";
import { Keyboard } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type {
  BottomSheetBackdropProps} from "@gorhom/bottom-sheet";
import {
  BottomSheetBackdrop as GBottomSheetBackdrop,
  BottomSheetModal as GBottomSheetModal,
  BottomSheetView as GBottomSheetView,
} from "@gorhom/bottom-sheet";

import { useColor } from "~/shared-hooks/useColor";
import { useColorScheme } from "~/shared-hooks/useColorScheme";
import { cn } from "~/utils/classnames";

type BottomSheetViewProps = Omit<
  React.ComponentPropsWithoutRef<typeof GBottomSheetView>,
  "style"
> & {
  style?: ViewStyle;
};

function BottomSheetView({
  className,
  children,
  style,
  ...props
}: BottomSheetViewProps) {
  const insets = useSafeAreaInsets();

  return (
    <GBottomSheetView
      style={[
        {
          paddingBottom: insets.bottom,
        },
        style,
      ]}
      className={cn(`px-4`, className)}
      {...props}
    >
      {children}
    </GBottomSheetView>
  );
}

const BottomSheet = React.forwardRef<
  GBottomSheetModal,
  React.ComponentPropsWithoutRef<typeof GBottomSheetModal>
>(
  (
    {
      style,
      enableDynamicSizing = true,
      enablePanDownToClose = true,
      android_keyboardInputMode = "adjustResize",
      ...props
    },
    ref,
  ) => {
    const insets = useSafeAreaInsets();
    const { light: lightColor, dark: darkColor } = useColor();
    const { isDarkColorScheme } = useColorScheme();

    const renderBackdrop = React.useCallback(
      (props: BottomSheetBackdropProps) => {
        const {
          pressBehavior = "close",
          opacity = isDarkColorScheme ? 0.8 : 0.7,
          style,
          ...rest
        } = {
          ...props,
        };
        return (
          <GBottomSheetBackdrop
            opacity={opacity}
            disappearsOnIndex={-1}
            pressBehavior={pressBehavior}
            style={[{ backgroundColor: "rgba(0,0,0,0.8)" }, style]}
            onPress={() => {
              if (Keyboard.isVisible()) {
                Keyboard.dismiss();
              }
            }}
            {...rest}
          />
        );
      },
      [isDarkColorScheme],
    );

    return (
      <GBottomSheetModal
        ref={ref}
        index={0}
        topInset={insets.top}
        enableDynamicSizing={enableDynamicSizing}
        enablePanDownToClose={enablePanDownToClose}
        android_keyboardInputMode={android_keyboardInputMode}
        backgroundStyle={{
          backgroundColor: lightColor,
        }}
        style={
          style ?? {
            shadowColor: "#262626",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }
        }
        handleIndicatorStyle={{
          backgroundColor: darkColor,
        }}
        backdropComponent={renderBackdrop}
        {...props}
      />
    );
  },
);

type BottomSheetContentRef = React.ElementRef<typeof GBottomSheetModal>;

function useBottomSheet() {
  const ref = React.useRef<BottomSheetContentRef>(null);

  const open = React.useCallback(() => {
    ref.current?.present();
  }, []);

  const close = React.useCallback(() => {
    ref.current?.dismiss();
  }, []);

  return { ref, open, close };
}

BottomSheet.displayName = "BottomSheet";

export { BottomSheetView, BottomSheet, useBottomSheet };
