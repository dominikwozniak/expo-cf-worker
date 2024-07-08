import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

export function CheckmarkIcon(props: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M5 14L9 17L18 6" stroke="currentColor" strokeWidth="3" />
    </Svg>
  );
}
