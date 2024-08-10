import { useActionSheet } from "@expo/react-native-action-sheet";
import { useTranslation } from "react-i18next";

import { mmkvStore } from "~/utils/mmkv-store";

export function useChangeLanguage() {
  const { showActionSheetWithOptions } = useActionSheet();
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;
  const currentLanguageLabel = t(`common.languages.${currentLanguage}`);

  const languages = [
    { label: t("common.languages.en"), value: "en" },
    { label: t("common.languages.pl"), value: "pl" },
  ] as const;
  const options = [...languages.map((lang) => lang.label), t("common.cancel")];
  const cancelButtonIndex = 2;

  const changeLanguage = (language: string) => {
    mmkvStore.set("locale", language);
    void i18n.changeLanguage(language);
  }

  const handleLanguageChange = () => {
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
          case 1:
            changeLanguage(languages[selectedIndex].value);
            break;
        }
      },
    );
  };

  return { handleLanguageChange, currentLanguageLabel };
}
