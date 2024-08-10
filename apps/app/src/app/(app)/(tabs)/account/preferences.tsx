import { useTranslation } from "react-i18next";

import { PreferencesPanel } from "~/modules/account/components/preferences/PreferencesPanel";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { TopBar } from "~/shared-components/TopBar";

export default function PreferencesScreen() {
  const { t } = useTranslation();

  return (
    <ScreenLayout isScrollable>
      <TopBar title={t("account.preferencesScreen.title")} />
      <PreferencesPanel />
    </ScreenLayout>
  );
}
