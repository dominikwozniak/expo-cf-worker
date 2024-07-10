import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

export function ArrowIcon(props: SvgProps) {
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
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
      />
    </Svg>
  );
}
