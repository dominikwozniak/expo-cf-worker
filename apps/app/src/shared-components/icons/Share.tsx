import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

export function ShareIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M20 13v4.5c0 3.058-4 3-8 3s-8 .058-8-3V13m8-10v12m0-12l4 4m-4-4L8 7"
        stroke="#001A72"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
