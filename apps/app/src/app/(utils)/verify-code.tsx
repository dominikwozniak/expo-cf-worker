import { ScrollView, View } from "react-native";

import { VerifyCodeForm } from "~/module/auth/components/VerifyCodeForm";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { TopBar } from "~/shared-components/TopBar";
import { Typography } from "~/shared-components/Typography";

export default function VerifyCode() {
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
            Enter verification code
          </Typography>
          <Typography className="mt-2 text-center">
            After you provide verification code, you will be able to sign in to
            your account. Then you can change your password on the account
            settings screen.
          </Typography>
          <VerifyCodeForm />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
