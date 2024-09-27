import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Button } from "~/shared-components/Button";
import { Typography } from "~/shared-components/Typography";

export function TrialPremiumBanner() {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="title" weight="semiBold" className="text-center">
        {t("onboarding.onboardingScreen.slides.premium")}
      </Typography>
      <View className="mt-4 flex items-center justify-center rounded-2xl border-2 border-accent bg-accent-light p-2">
        <Typography variant="title" weight="semiBold" className="text-center">
          {t("premium.trialBanner.title")}
        </Typography>
        <Typography variant="paragraph" className="text-center">
          {t("premium.trialBanner.description")}
        </Typography>
        <Button
          backgroundColor="accent"
          textColor="accent"
          className="mt-2"
          // TODO: do during RevenueCat implementation
          onPress={() => console.log("Go to premium page")}
        >
          {t("premium.trialBanner.button")}
        </Button>
      </View>
    </>
  );
}
