import type { ViewProps } from "react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";

import { ArrowIcon } from "~/shared-components/icons";
import { Typography } from "~/shared-components/Typography";
import { useColor } from "~/shared-hooks/useColor";
import { cn } from "~/utils/classnames";

export interface TopBarProps extends ViewProps {
  isBackButtonHidden?: boolean;
  disabledGoBack?: boolean;
  backButtonOnPress?: () => void;
  title?: string;
  customElement?: React.ReactNode;
  isCustomElementRight?: boolean;
  type?: "default" | "space-between";
}

export function TopBar({
  isBackButtonHidden,
  disabledGoBack,
  backButtonOnPress,
  title,
  customElement,
  isCustomElementRight,
  type = "default",
  className,
  ...props
}: TopBarProps) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { dark: darkColor } = useColor();

  const defaultContainerStyle = type === "default" ? "justify-center" : "";
  const spaceBetweenContainerStyle =
    type === "space-between" ? "justify-between" : "";
  const containerStyle = cn([
    "mb-4 flex h-10 flex-row items-center px-4",
    defaultContainerStyle,
    spaceBetweenContainerStyle,
    className,
  ]);

  const handleBackButtonPress = () => {
    void (backButtonOnPress && backButtonOnPress());
    void (!disabledGoBack && navigation.goBack());
  };

  return (
    <View className={containerStyle} {...props}>
      {!isBackButtonHidden ? (
        <TouchableOpacity
          className="absolute left-4 top-0 h-full"
          onPress={handleBackButtonPress}
          accessibilityRole="button"
          accessibilityLabel={t("common.goBack")}
        >
          <ArrowIcon color={darkColor} width={32} height={32} />
        </TouchableOpacity>
      ) : null}
      {title ? <Typography weight="semiBold">{title}</Typography> : null}
      {customElement && isCustomElementRight ? (
        <View className="absolute right-4 top-0 h-full">{customElement}</View>
      ) : null}
      {customElement && !isCustomElementRight ? customElement : null}
    </View>
  );
}
