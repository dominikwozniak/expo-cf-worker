import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";

export default {
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
    },
  },
} satisfies Config;
