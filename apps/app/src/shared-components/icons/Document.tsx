import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

export function DocumentIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M8 8h8m-8 4h8m-8 4h4m-8.5-4c0-6.5 2-8.5 8.5-8.5s8.5 2 8.5 8.5-2 8.5-8.5 8.5-8.5-2-8.5-8.5z"
        stroke="#001A72"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
