import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { en, pl } from "@acme/translation";

import { mmkvStore } from "~/utils/mmkv-store";

const resources = {
  en: { translation: en },
  pl: { translation: pl },
};

const getLocale = () => {
  const savedLanguage = mmkvStore.getString("locale");

  if (savedLanguage) {
    return savedLanguage;
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const deviceLanguage = Localization.getLocales()?.[0]?.languageCode ?? "en";
  const isLanguageSupported = Object.keys(resources).includes(deviceLanguage);

  return isLanguageSupported ? deviceLanguage : "en";
};

const initI18n = () => {
  const language = getLocale();

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: language,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
