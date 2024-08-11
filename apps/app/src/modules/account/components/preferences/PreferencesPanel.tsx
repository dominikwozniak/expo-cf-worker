import { useTranslation } from "react-i18next";

import { ColorSchemeSwitch } from "~/modules/account/components/preferences/ColorSchemeSwitch";
import { useChangeLanguage } from "~/modules/account/hooks/preferences/useChangeLanguage";
import { BellIcon, LocationIcon, MoonIcon } from "~/shared-components/icons";
import { List } from "~/shared-components/list";
import { Typography } from "~/shared-components/Typography";

export function PreferencesPanel() {
  const { t } = useTranslation();

  const { handleLanguageChange, currentLanguageLabel } = useChangeLanguage();

  return (
    <List className="mt-4">
      <List.Inner>
        <List.Item
          icon={MoonIcon}
          title={t("account.preferencesScreen.darkMode.button")}
          isChevronHidden
        >
          <ColorSchemeSwitch />
        </List.Item>
        <List.Item
          icon={LocationIcon}
          title={t("account.preferencesScreen.language.button")}
          onPress={handleLanguageChange}
          isTouchable
          isChevronHidden
        >
          <Typography variant="small" color="primary">
            {currentLanguageLabel}
          </Typography>
        </List.Item>
        <List.Item
          icon={BellIcon}
          title={t("account.preferencesScreen.notifications.button")}
          isChevronHidden
          isLastItem
        >
          <Typography variant="small" color="primary">
            {t("common.notifications.enabled")}
          </Typography>
        </List.Item>
      </List.Inner>
    </List>
  );
}
