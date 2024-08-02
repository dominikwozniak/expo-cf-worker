import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

export function MoonIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M4.672 18.797c-.699-.564-.114-1.573.78-1.652 5.79-.51 9.608-7.07 7.007-12.144-.41-.802.124-1.871.988-1.615C17.244 4.51 20 7.942 20 12c0 4.971-3.881 9-9 9-2.34 0-4.62-.824-6.328-2.203z"
        stroke="#001A72"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
