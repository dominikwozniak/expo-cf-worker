import { ScrollView, View } from "react-native";

import { VerifyEmailForm } from "~/module/auth/components/VerifyEmailForm";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { TopBar } from "~/shared-components/TopBar";
import { Typography } from "~/shared-components/Typography";

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
            Verify your email
          </Typography>
          <Typography className="mt-2 text-center">
            Enter the verification code sent to your email address
          </Typography>
          <VerifyEmailForm />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
