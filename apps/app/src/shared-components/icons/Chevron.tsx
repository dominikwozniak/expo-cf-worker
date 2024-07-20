import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

export function ChevronIcon(props: SvgProps) {
  return (
    <Svg
      fill="none"
      height="24"
      width="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-8 w-8"
      {...props}
    >
      <Path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth={2} />
    </Svg>
  );
}
