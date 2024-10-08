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
        d="M4 12h16M4 12l6-6m-6 6l6 6"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
