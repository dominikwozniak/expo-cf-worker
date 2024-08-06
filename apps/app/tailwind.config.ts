import { writeFileSync } from "fs";
import { join } from "path";
import type { Config } from "tailwindcss";
import resolveConfig from "tailwindcss/resolveConfig";

// @ts-expect-error - no types
import nativewind from "nativewind/preset";

import baseConfig from "@acme/tailwind-config/native";


// const config = {
//   darkMode: "class",
//   content: [...baseConfig.content, "./node_modules/@acme/**/*.{ts,tsx}"],
//   presets: [baseConfig],
// } satisfies Config;

// FIXME: move configuration to a tooling package
const config = {
  darkMode: "class",
  content: ["src/**/*.{ts,tsx}"],
  presets: [nativewind],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary-default)",
          light: "var(--primary-light)",
        },
        secondary: {
          DEFAULT: "var(--secondary-default)",
          light: "var(--secondary-light)",
        },
        tertiary: {
          DEFAULT: "var(--tertiary-default)",
          light: "var(--tertiary-light)",
        },
        accent: {
          DEFAULT: "var(--accent-default)",
          light: "var(--accent-light)",
        },
        gray: {
          DEFAULT: "var(--gray-default)",
          light: "var(--gray-light)",
        },
        slate: {
          DEFAULT: "var(--slate-default)",
        },
        dark: {
          DEFAULT: "var(--dark-default)",
        },
        light: {
          DEFAULT: "var(--light-default)",
        },
        overlay: {
          DEFAULT: "var(--overlay)",
        },
      },
      fontFamily: {
        poppins: ["Poppins_400Regular"],
        poppinsSemiBold: ["Poppins_600SemiBold"],
        poppinsBold: ["Poppins_700Bold"],
      },
    },
  },
} satisfies Config;

const resolvedConfig = resolveConfig(config);
const configString = JSON.stringify(resolvedConfig, null, 2);
const outputPath = join(__dirname, "resolved-tailwind-config.json");
writeFileSync(outputPath, configString, "utf-8");

export default config;
