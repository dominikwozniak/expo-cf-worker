import { useWindowDimensions, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";

import { NotificationSettings } from "~/modules/onboarding/components/NotificationSettings";
import { PreferredName } from "~/modules/onboarding/components/PreferredName";
import { TrialPremiumBanner } from "~/modules/onboarding/components/TrialPremiumBanner";
import { Button } from "~/shared-components/Button";
import { Typography } from "~/shared-components/Typography";
import { useListSlideControl } from "~/shared-hooks/useListSlideControl";
import { cn } from "~/utils/classnames";

export function OnboardingSlider() {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  const slides = [
    {
      id: 1,
      title: t("onboarding.onboardingScreen.slides.name"),
      component: <PreferredName />,
    },
    {
      id: 2,
      title: t("onboarding.onboardingScreen.slides.notifications"),
      component: <NotificationSettings />,
    },
    {
      id: 3,
      title: t("onboarding.onboardingScreen.slides.premium"),
      component: <TrialPremiumBanner />,
    },
  ] as const;

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
              <Typography
                variant="title"
                weight="semiBold"
                className="text-center"
              >
                {item.title}
              </Typography>
              {item.component}
            </View>
          )}
          onViewableItemsChanged={handleViewableItemsChanged}
          ref={listRef}
        />
      </View>
      <View className="flex-1">
        <View className="mt-4 flex-row justify-center">
          {slides.map((_, index) => (
            <View
              key={index}
              className={cn([
                "mx-2 h-2 w-2 rounded-full",
                index === currentIndex ? "bg-primary" : "bg-gray",
              ])}
            />
          ))}
        </View>
        <Button
          disabled={currentIndex === slides.length - 1}
          onPress={handleNextSlide}
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
