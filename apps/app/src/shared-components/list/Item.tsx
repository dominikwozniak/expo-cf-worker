import type { VariantProps } from "class-variance-authority";
import type {
  GestureResponderEvent,
  TouchableOpacityProps,
  ViewProps,
} from "react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { cva } from "class-variance-authority";

import { ChevronIcon, ShareIcon } from "~/shared-components/icons";
import { Typography } from "~/shared-components/Typography";
import { useColor } from "~/shared-hooks/useColor";
import { cn } from "~/utils/classnames";

const itemVariants = cva(
  "flex flex-row items-center justify-between px-2 py-4",
  {
    variants: {
      isLastItem: {
        true: "border-0",
        false: "border-b border-gray",
      },
    },
    defaultVariants: {
      isLastItem: false,
    },
  },
);

interface ItemBaseProps extends ViewProps, VariantProps<typeof itemVariants> {
  icon?: React.ComponentType<{ color: string }>;
  title?: string;
  isAccent?: boolean;
  isChevronHidden?: boolean;
}

type ItemStaticProps = ItemBaseProps & {
  isTouchable?: false;
  href?: never;
  onPress?: never;
};

type ItemTouchableProps = ItemBaseProps & {
  isTouchable: true;
  href?: string;
  onPress?: TouchableOpacityProps["onPress"];
};

type ItemProps = ItemStaticProps | ItemTouchableProps;

export function Item({
  icon,
  title,
  isTouchable = false,
  isLastItem,
  isAccent,
  isChevronHidden,
  children,
  href,
  onPress,
  className,
  ...props
}: ItemProps) {
  const router = useRouter();
  const { primary: primaryColor, accent: accentColor } = useColor();

  const LeftIcon = icon ?? (() => null);

  const item = (
    <>
      <View className="flex flex-row items-center justify-center">
        {icon ? (
          <View className="mr-4">
            <LeftIcon color={isAccent ? accentColor : primaryColor} />
          </View>
        ) : null}
        {title ? <Title title={title} isAccent={isAccent} /> : null}
      </View>
      <View className="flex flex-row items-center">
        {children}
        {!isChevronHidden ? (
          <RightIcon href={href} isAccent={isAccent} />
        ) : null}
      </View>
    </>
  );

  const itemClassName = cn(itemVariants({ isLastItem }), className);

  if (!isTouchable) {
    return (
      <View className={itemClassName} {...props}>
        {item}
      </View>
    );
  }

  const handlePress = (event: GestureResponderEvent) => {
    if (onPress) {
      onPress(event);
      return;
    }

    if (!href) {
      return;
    }

    const isExternalLink = href.startsWith("http") && !href.startsWith("/");
    if (isExternalLink) {
      void Linking.openURL(href);
    } else {
      // @ts-expect-error no typed route
      router.push(href as unknown);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={itemClassName}
      onPress={handlePress}
      {...props}
    >
      {item}
    </TouchableOpacity>
  );
}

const Title = ({ isAccent, title }: { isAccent?: boolean; title: string }) => {
  return (
    <Typography
      variant="title"
      color={isAccent ? "accent" : "primary"}
      weight={isAccent ? "semiBold" : "regular"}
    >
      {title}
    </Typography>
  );
};

const RightIcon = ({
  isAccent,
  href = "",
}: {
  isAccent?: boolean;
  href?: string;
}) => {
  const { primary: primaryColor, accent: accentColor } = useColor();

  const isExternalLink = href.startsWith("http") && !href.startsWith("/");

  if (isExternalLink) {
    return <ShareIcon color={isAccent ? accentColor : primaryColor} />;
  }

  return <ChevronIcon color={isAccent ? accentColor : primaryColor} />;
};
