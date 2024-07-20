import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

export function ShieldIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M4.188 9.462c-.22-1.499.668-2.89 2.023-3.568l4-2a4 4 0 013.578 0l4 2c1.355.678 2.243 2.07 2.023 3.568-.647 4.402-2.95 9.366-6.743 11.137a2.53 2.53 0 01-2.138 0c-3.793-1.77-6.096-6.735-6.743-11.137z"
        stroke="#001A72"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
