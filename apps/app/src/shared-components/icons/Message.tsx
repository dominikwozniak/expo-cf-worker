import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

export function MessageIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M8 8h8m-8 4h5M3 10c0-5.353 2.118-7 9-7s9 1.647 9 7-2.118 7-9 7c-.34 0-.67-.004-.988-.012L7 21v-4.506C4.033 15.669 3 13.738 3 10z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
