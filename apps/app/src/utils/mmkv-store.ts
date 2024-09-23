import { MMKV } from "react-native-mmkv";

export const MMKV_COLOR_SCHEME = "@acme/color-scheme";
export const MMKV_LANGUAGE = "@acme/language";
export const MMKV_ONBOARDING_COMPLETE = "@acme/onboarding-complete";

export const mmkvStore = new MMKV({
  id: "app-storage",
});
