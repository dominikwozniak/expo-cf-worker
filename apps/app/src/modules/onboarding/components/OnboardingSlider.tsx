import { useWindowDimensions, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";

import { NotificationSettings } from "~/modules/onboarding/components/NotificationSettings";
import { PreferredName } from "~/modules/onboarding/components/PreferredName";
import { TrialPremiumBanner } from "~/modules/onboarding/components/TrialPremiumBanner";
import { useOnboarding } from "~/modules/onboarding/hooks/useOnboarding";
import { AnimatedDots } from "~/shared-components/AnimatedDots";
import { Button } from "~/shared-components/Button";
import { useListSlideControl } from "~/shared-hooks/useListSlideControl";

export function OnboardingSlider() {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  const slides = [
    {
      id: 1,
      component: <PreferredName />,
    },
    {
      id: 2,
      component: <NotificationSettings />,
    },
    {
      id: 3,
      component: <TrialPremiumBanner />,
    },
  ] as const;

  const { completeOnboarding } = useOnboarding();
  const { listRef, handleNextSlide, currentIndex, handleViewableItemsChanged } =
    useListSlideControl<(typeof slides)[number]>(slides);

  return (
    <>
      <View className="mt-8 flex-1" style={{ height: 500, width: width - 32 }}>
        <FlashList
          data={slides}
          horizontal
          pagingEnabled={false}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          estimatedItemSize={400}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ width: width - 32, height: "100%" }}>
              {item.component}
            </View>
          )}
          onViewableItemsChanged={handleViewableItemsChanged}
          ref={listRef}
        />
      </View>
      <View className="flex-1">
        <AnimatedDots dotsCount={slides.length} currentIndex={currentIndex} />
        <Button
          disabled={currentIndex > slides.length - 1}
          onPress={
            currentIndex >= slides.length - 1
              ? completeOnboarding
              : handleNextSlide
          }
          className="mt-4"
        >
          {currentIndex === slides.length - 1
            ? t("common.complete")
            : t("common.next")}
        </Button>
      </View>
    </>
  );
}
