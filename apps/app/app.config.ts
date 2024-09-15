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
  // extra: {
  //   eas: {
  //     projectId: "your-eas-project-id",
  //   },
  // },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: ["expo-router", "expo-localization"],
});
