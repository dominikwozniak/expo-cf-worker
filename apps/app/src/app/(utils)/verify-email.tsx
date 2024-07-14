import { ScrollView, View } from "react-native";

import { VerifyEmailForm } from "~/modules/auth/components/VerifyEmailForm";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { TopBar } from "~/shared-components/TopBar";
import { Typography } from "~/shared-components/Typography";
import { i18n } from "~/utils/i18n";

export default function VerifyEmail() {
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
            {i18n.t("utils.verifyEmailScreen.title")}
          </Typography>
          <Typography className="mt-2 text-center">
            {i18n.t("utils.verifyEmailScreen.description")}
          </Typography>
          <VerifyEmailForm />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
