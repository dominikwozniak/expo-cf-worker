import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

import { en, pl } from "@acme/translation";

const availableLocales = { en, pl };

const getLocale = () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const deviceLanguage = Localization.getLocales()?.[0]?.languageCode ?? "en";
  const isLanguageSupported =
    Object.keys(availableLocales).includes(deviceLanguage);

  return isLanguageSupported ? deviceLanguage : "en";
};
const i18n = new I18n(availableLocales);

i18n.locale = getLocale();
i18n.defaultLocale = "en";
i18n.enableFallback = true;

function changeLanguage(lang: keyof typeof availableLocales) {
  i18n.locale = lang;
}

export { i18n, changeLanguage };
