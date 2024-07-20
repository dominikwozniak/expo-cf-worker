import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

export function PencilIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M18.945 9.188l-4-4m4 4l-4.999 4.998c-.659.659-1.458 1.179-2.376 1.337-.927.16-2.077.213-2.626-.335-.548-.549-.495-1.7-.335-2.626.158-.918.678-1.717 1.337-2.376l4.998-4.998m4 4s3-3 1-5-5 1-5 1M20.5 12c0 6.5-2 8.5-8.5 8.5s-8.5-2-8.5-8.5 2-8.5 8.5-8.5"
        stroke="#001A72"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
