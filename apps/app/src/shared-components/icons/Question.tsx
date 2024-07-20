import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

export function QuestionIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 17v-.007m0-2.136c0-3.214 3-2.5 3-5C15 8.28 13.657 7 12 7c-1.343 0-2.48.84-2.863 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        stroke="#001A72"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
