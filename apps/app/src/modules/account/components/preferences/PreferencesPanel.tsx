import React from "react";
import { useTranslation } from "react-i18next";

import { ColorSchemeSwitch } from "~/modules/account/components/preferences/ColorSchemeSwitch";
import { IconPicker } from "~/modules/account/components/preferences/IconPicker";
import { useChangeLanguage } from "~/modules/account/hooks/preferences/useChangeLanguage";
import {
  BottomSheet,
  BottomSheetView,
  useBottomSheet,
} from "~/shared-components/BottomSheet";
import {
  BellIcon,
  LocationIcon,
  MoonIcon,
  StarIcon,
} from "~/shared-components/icons";
import { List } from "~/shared-components/list";
import { Typography } from "~/shared-components/Typography";

export function PreferencesPanel() {
  const { t } = useTranslation();

  const {
    ref,
    open: openBottomSheet,
    close: closeBottomSheet,
  } = useBottomSheet();

  const { handleLanguageChange, currentLanguageLabel } = useChangeLanguage();

  return (
    <>
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
          >
            <Typography variant="small" color="primary">
              {t("common.notifications.enabled")}
            </Typography>
          </List.Item>
          <List.Item
            icon={StarIcon}
            title={t("account.preferencesScreen.appIcon.button")}
            onPress={openBottomSheet}
            isTouchable
            isLastItem
          />
        </List.Inner>
      </List>
      <BottomSheet ref={ref} onDismiss={closeBottomSheet}>
        <BottomSheetView>
          <IconPicker />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
