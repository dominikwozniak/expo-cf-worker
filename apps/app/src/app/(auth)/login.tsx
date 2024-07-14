import React from "react";
import { ScrollView, View } from "react-native";
import { Link } from "expo-router";

import { LoginForm } from "~/modules/auth/components/LoginForm";
import { OAuthForm } from "~/modules/auth/components/OAuthForm";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { TopBar } from "~/shared-components/TopBar";
import { Typography } from "~/shared-components/Typography";
import { i18n } from "~/utils/i18n";

export default function LoginScreen() {
  return (
    <ScreenLayout>
      <ScrollView>
        <View className="flex-1 p-4">
          <TopBar />
          <Typography
            variant="header"
            weight="semiBold"
            className="mt-4 text-center"
          >
            {i18n.t("auth.loginScreen.title")}
          </Typography>
          <Typography className="text-center">
            {i18n.t("auth.loginScreen.description")}
          </Typography>
          <LoginForm />
          <Link href="/(auth)/forgot-password" className="mt-4">
            <Typography className="text-right underline">
              {i18n.t("auth.loginScreen.forgotPassword")}
            </Typography>
          </Link>
          <OAuthForm />
          <View className="mt-2 flex-row justify-center">
            <Typography className="mr-2 text-right">
              {i18n.t("auth.loginScreen.noAccount.title")}
            </Typography>
            <Link href="/(auth)/register">
              <Typography weight="semiBold" className="text-right underline">
                {i18n.t("auth.loginScreen.noAccount.button")}
              </Typography>
            </Link>
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
