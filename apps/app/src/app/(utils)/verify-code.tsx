import { ScrollView, View } from "react-native";

import { VerifyCodeForm } from "~/modules/auth/components/VerifyCodeForm";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { Typography } from "~/shared-components/Typography";
import { i18n } from "~/utils/i18n";

export default function VerifyCode() {
  return (
    <ScreenLayout>
      <ScrollView>
        <View className="flex-1 p-4">
          <Typography
            variant="subheader"
            weight="semiBold"
            className="mt-4 text-center"
          >
            {i18n.t("utils.verifyCodeScreen.title")}
          </Typography>
          <Typography className="mt-2 text-center">
            {i18n.t("utils.verifyCodeScreen.description")}
          </Typography>
          <VerifyCodeForm />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
