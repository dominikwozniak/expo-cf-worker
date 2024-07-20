import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

export function HomeIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M4.5 5c1.461-1.461 3.093-2.581 4.197-3.26a2.474 2.474 0 012.605 0C12.406 2.42 14.04 3.54 15.5 5c3.168 3.168 3 5 3 8 0 1.41-.11 2.599-.227 3.463-.124.91-.917 1.537-1.835 1.537H15a2 2 0 01-2-2v-2a3 3 0 00-6 0v2a2 2 0 01-2 2H3.562c-.918 0-1.711-.627-1.835-1.537A25.992 25.992 0 011.5 13c0-3-.168-4.832 3-8z"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
