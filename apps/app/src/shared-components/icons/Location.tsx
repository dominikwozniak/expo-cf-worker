import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

export function LocationIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12.816 20.608C16.85 18.55 20 15.143 20 11a8 8 0 10-16 0c0 4.143 3.15 7.55 7.184 9.608.513.261 1.12.261 1.632 0z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
