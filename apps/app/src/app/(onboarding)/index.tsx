import { useTranslation } from "react-i18next";

import { OnboardingSlider } from "~/modules/onboarding/components/OnboardingSlider";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { Typography } from "~/shared-components/Typography";

export default function OnboardingScreen() {
  const { t } = useTranslation();

  return (
    <ScreenLayout isScrollable>
      <Typography
        variant="header"
        weight="semiBold"
        color="primary"
        className="mt-8 text-center"
      >
        {t("onboarding.onboardingScreen.title")}
      </Typography>
      <Typography variant="paragraph" className="my-2 text-center">
        {t("onboarding.onboardingScreen.description")}
      </Typography>
      <OnboardingSlider />
    </ScreenLayout>
  );
}
