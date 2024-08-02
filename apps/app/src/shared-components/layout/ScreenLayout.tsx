import type { ViewProps } from "react-native";
import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

import { HideKeyboard } from "~/shared-components/layout/HideKeyboard";
import { OverlayLoadingIndicator } from "~/shared-components/OverlayIndicator";
import { useColor } from "~/shared-hooks/useColor";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";

interface ScreeLayoutProps extends ViewProps {
  isForceLoading?: boolean;
  isScrollable?: boolean;
  isDisableSafeArea?: boolean;
  header?: React.ReactNode;
  children: React.ReactNode;
}

export function ScreenLayout({
  isForceLoading = false,
  isScrollable = false,
  isDisableSafeArea = false,
  header,
  children,
  ...props
}: ScreeLayoutProps) {
  const isLoading = useGlobalStore((store) => store.isLoading);
  const { light } = useColor();

  const Wrapper = isDisableSafeArea ? View : SafeAreaView;

  const ScrollableWrapper = isScrollable ? ScrollWrapper : React.Fragment;

  return (
    <Wrapper
      style={{
        flex: 1,
        backgroundColor: light,
      }}
      {...props}
    >
      <HideKeyboard>
        {header}
        <ScrollableWrapper>{children}</ScrollableWrapper>
      </HideKeyboard>
      <OverlayLoadingIndicator loading={isLoading || isForceLoading} />
    </Wrapper>
  );
}

function ScrollWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ScrollView>
      <View className="flex-1 p-4">{children}</View>
    </ScrollView>
  );
}
