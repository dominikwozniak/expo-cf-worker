import { useTranslation } from "react-i18next";

import { UserActionsPanel } from "~/modules/account/components/personal-details/UserActionsPanel";
import { UserDetailsPanel } from "~/modules/account/components/personal-details/UserDetailsPanel";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { TopBar } from "~/shared-components/TopBar";

export default function PersonalDetails() {
  const { t } = useTranslation();

  return (
    <ScreenLayout isScrollable>
      <TopBar title={t("account.personalDetails.title")} />
      <UserDetailsPanel />
      <UserActionsPanel />
    </ScreenLayout>
  );
}
