import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

export function CrossIcon(props: SvgProps) {
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-8 w-8"
      {...props}
    >
      <Path
        d="M19 5L5 19M5 5l14 14"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
