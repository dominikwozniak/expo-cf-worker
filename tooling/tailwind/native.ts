import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";

import base from "./base";

export default {
  content: base.content,
  presets: [base, nativewind],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins_400Regular"],
        poppinsSemiBold: ["Poppins_600SemiBold"],
        poppinsBold: ["Poppins_700Bold"],
      },
    },
  },
} satisfies Config;
