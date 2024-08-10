import { ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";

import { VerifyEmailForm } from "~/modules/auth/components/VerifyEmailForm";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { TopBar } from "~/shared-components/TopBar";
import { Typography } from "~/shared-components/Typography";

export default function VerifyEmail() {
  const { t } = useTranslation();
  return (
    <ScreenLayout>
      <ScrollView>
        <View className="flex-1 p-4">
          <TopBar isBackButtonHidden />
          <Typography
            variant="subheader"
            weight="semiBold"
            className="mt-4 text-center"
          >
            {t("utils.verifyEmailScreen.title")}
          </Typography>
          <Typography className="mt-2 text-center">
            {t("utils.verifyEmailScreen.description")}
          </Typography>
          <VerifyEmailForm />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
