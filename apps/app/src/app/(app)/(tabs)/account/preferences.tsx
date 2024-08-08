import { PreferredTheme } from "~/modules/account/components/PreferredTheme";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { TopBar } from "~/shared-components/TopBar";
import { i18n } from "~/utils/i18n";

export default function PreferencesScreen() {
  return (
    <ScreenLayout isScrollable>
      <TopBar title={i18n.t("account.preferencesScreen.title")} />
      <PreferredTheme />
    </ScreenLayout>
  );
}
