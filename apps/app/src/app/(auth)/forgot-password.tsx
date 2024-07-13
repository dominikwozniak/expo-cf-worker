import { ScrollView, View } from "react-native";

import { ForgotPasswordForm } from "~/modules/auth/components/ForgotPasswordForm";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { TopBar } from "~/shared-components/TopBar";
import { Typography } from "~/shared-components/Typography";

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
            Forgot Password
          </Typography>
          <Typography className="mt-2 text-center">
            Enter your email address to reset your password
          </Typography>
          <ForgotPasswordForm />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
