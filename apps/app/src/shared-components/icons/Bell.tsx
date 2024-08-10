import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

export function BellIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M9 17.5v1c0 1.657 1.343 2.5 3 2.5s3-.843 3-2.5v-1m-9-9c0-3.314 2.686-5 6-5s6 1.686 6 5c0 1.94.705 4.113 1.432 5.839.603 1.433-.41 3.161-1.964 3.161H6.532c-1.554 0-2.567-1.728-1.964-3.161C5.295 12.613 6 10.439 6 8.5z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
