import { useTranslation } from "react-i18next";

import { MoonIcon } from "~/shared-components/icons";
import { List } from "~/shared-components/list";

export function ChangeLanguageSheet() {
  const { t } = useTranslation();

  return (
    <List.Item
      icon={MoonIcon}
      title={t("account.preferencesScreen.darkMode.button")}
      isChevronHidden
      isLastItem
    ></List.Item>
  );
}
