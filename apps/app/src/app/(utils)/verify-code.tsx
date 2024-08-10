import { ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";



import { VerifyCodeForm } from "~/modules/auth/components/VerifyCodeForm";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { Typography } from "~/shared-components/Typography";


export default function VerifyCode() {
  const { t } = useTranslation();

  return (
    <ScreenLayout>
      <ScrollView>
        <View className="flex-1 p-4">
          <Typography
            variant="subheader"
            weight="semiBold"
            className="mt-4 text-center"
          >
            {t("utils.verifyCodeScreen.title")}
          </Typography>
          <Typography className="mt-2 text-center">
            {t("utils.verifyCodeScreen.description")}
          </Typography>
          <VerifyCodeForm />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
