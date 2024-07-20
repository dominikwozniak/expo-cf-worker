import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

interface UserIconProps extends SvgProps {
  strokeWidth?: 2 | 3;
}

export function UserIcon({ strokeWidth = 2, ...props }: UserIconProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M17.5 21h-11A2.5 2.5 0 014 18.5c0-4.08 6-4 8-4s8-.08 8 4a2.5 2.5 0 01-2.5 2.5zM12 11a4 4 0 100-8 4 4 0 000 8z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
