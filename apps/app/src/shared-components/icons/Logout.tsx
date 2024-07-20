import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

export function LogoutIcon(props: SvgProps) {
  return (
    <Svg
      fill="none"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="0.5"
      {...props}
    >
      <Path
        d="M2 12l-.78-.625-.5.625.5.625L2 12zm9 1a1 1 0 100-2v2zM5.22 6.375l-4 5 1.56 1.25 4-5-1.56-1.25zm-4 6.25l4 5 1.56-1.25-4-5-1.56 1.25zM2 13h9v-2H2v2z"
        fill="currentColor"
      />
      <Path
        d="M10 8.132v-.743c0-1.619 0-2.428.474-2.987.474-.56 1.272-.693 2.868-.96l1.672-.278c3.243-.54 4.864-.81 5.925.088C22 4.151 22 5.795 22 9.082v5.835c0 3.288 0 4.932-1.06 5.83-1.062.9-2.683.63-5.926.089l-1.672-.279c-1.596-.266-2.394-.399-2.868-.958C10 19.039 10 18.229 10 16.61v-.545"
        stroke="currentColor"
        strokeWidth={2}
      />
    </Svg>
  );
}
