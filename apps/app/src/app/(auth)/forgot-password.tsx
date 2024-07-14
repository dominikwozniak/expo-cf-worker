import { ScrollView, View } from "react-native";

import { ForgotPasswordForm } from "~/modules/auth/components/ForgotPasswordForm";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { TopBar } from "~/shared-components/TopBar";
import { Typography } from "~/shared-components/Typography";
import { i18n } from "~/utils/i18n";

export default function ForgotPassword() {
  return (
    <ScreenLayout>
      <ScrollView>
        <View className="flex-1 p-4">
          <TopBar />
          <Typography
            variant="subheader"
            weight="semiBold"
            className="mt-4 text-center"
          >
            {i18n.t("auth.forgotPasswordScreen.title")}
          </Typography>
          <Typography className="mt-2 text-center">
            {i18n.t("auth.forgotPasswordScreen.description")}
          </Typography>
          <ForgotPasswordForm />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
