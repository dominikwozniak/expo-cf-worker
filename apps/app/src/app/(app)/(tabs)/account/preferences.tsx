import { PreferredTheme } from "~/modules/account/components/PreferredTheme";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { TopBar } from "~/shared-components/TopBar";

export default function PreferencesScreen() {
  return (
    <ScreenLayout isScrollable>
      <TopBar title="Preferences" />

      <PreferredTheme />
    </ScreenLayout>
  );
}
