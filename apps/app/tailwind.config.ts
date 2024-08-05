import type { Config } from "tailwindcss";

// import nativewind from "nativewind/preset";

import baseConfig from "@acme/tailwind-config/native";

const config = {
  darkMode: "class",
  content: [...baseConfig.content, "./node_modules/@acme/**/*.{ts,tsx}"],
  presets: [baseConfig],
} satisfies Config;

export default config;
