import type { SvgProps } from "react-native-svg";
import React from "react";

const icons = {
  checkmark: React.lazy(() =>
    import("./Checkmark").then((module) => ({
      default: module.CheckmarkIcon,
    })),
  ),
} as const;

type IconName = keyof typeof icons;

interface IconProps extends SvgProps {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  const Icon = icons[name];

  return (
    <React.Suspense fallback={null}>
      <Icon {...props} />
    </React.Suspense>
  );
}
