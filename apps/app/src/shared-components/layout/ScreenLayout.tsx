import type { ViewProps } from "react-native";
import React from "react";
import { SafeAreaView, View } from "react-native";

import { HideKeyboard } from "~/shared-components/layout/HideKeyboard";
import { OverlayLoadingIndicator } from "~/shared-components/OverlayIndicator";
import { useColor } from "~/shared-hooks/useColor";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";

interface ScreeLayoutProps extends ViewProps {
  isForceLoading?: boolean;
  isDisableSafeArea?: boolean;
  children: React.ReactNode;
}

export function ScreenLayout({
  isForceLoading = false,
  isDisableSafeArea = false,
  children,
  ...props
}: ScreeLayoutProps) {
  const isLoading = useGlobalStore((store) => store.isLoading);
  const { light } = useColor();

  const Wrapper = isDisableSafeArea ? View : SafeAreaView;

  return (
    <Wrapper
      style={{
        flex: 1,
        backgroundColor: light,
      }}
      {...props}
    >
      <HideKeyboard>{children}</HideKeyboard>
      <OverlayLoadingIndicator loading={isLoading || isForceLoading} />
    </Wrapper>
  );
}
