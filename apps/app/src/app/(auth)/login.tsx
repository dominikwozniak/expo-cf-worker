import React from "react";
import { ScrollView, View } from "react-native";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";



import { LoginForm } from "~/modules/auth/components/LoginForm";
import { OAuthForm } from "~/modules/auth/components/OAuthForm";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { TopBar } from "~/shared-components/TopBar";
import { Typography } from "~/shared-components/Typography";


export default function LoginScreen() {
  const { t } = useTranslation();

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
            {t("auth.loginScreen.title")}
          </Typography>
          <Typography className="text-center">
            {t("auth.loginScreen.description")}
          </Typography>
          <LoginForm />
          <View className="mt-4">
            <Link href="/(auth)/forgot-password">
              <Typography className="text-right underline">
                {t("auth.loginScreen.forgotPassword")}
              </Typography>
            </Link>
          </View>
          <OAuthForm />
          <View className="mt-2 flex-row justify-center">
            <Typography className="mr-2 text-right">
              {t("auth.loginScreen.noAccount.title")}
            </Typography>
            <Link href="/(auth)/register">
              <Typography weight="semiBold" className="text-right underline">
                {t("auth.loginScreen.noAccount.button")}
              </Typography>
            </Link>
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
