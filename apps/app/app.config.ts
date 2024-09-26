import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "rnstarter",
  slug: "rnstarter",
  scheme: "rnstarter",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#936FFE",
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/c71b12f7-3026-491a-ab63-28f338a72f9a",
  },
  runtimeVersion: {
    policy: "appVersion",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "com.dominikwozniak.rnstarter",
    supportsTablet: true,
  },
  android: {
    package: "com.dominikwozniak.rnstarter",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#936FFE",
    },
  },
  extra: {
    eas: {
      projectId: "c71b12f7-3026-491a-ab63-28f338a72f9a",
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: [
    "expo-router",
    "expo-localization",
    [
      "expo-dynamic-app-icon",
      {
        default: {
          image: "./assets/icon.png",
          prerendered: true,
        },
        dark: {
          image: "./assets/icon-dark.png",
          prerendered: true,
        },
      },
    ],
    [
      "@sentry/react-native/expo",
      {
        url: "https://sentry.io/",
        project: "react-native-starter-app",
        organization: "dominikwozniak",
      },
    ],
  ],
});
