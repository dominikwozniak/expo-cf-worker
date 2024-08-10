import React from "react";
import { ScrollView, View } from "react-native";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";

import { RegisterForm } from "~/modules/auth/components/RegisterForm";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { TopBar } from "~/shared-components/TopBar";
import { Typography } from "~/shared-components/Typography";

export default function Register() {
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
            {t("auth.registerScreen.title")}
          </Typography>
          <Typography className="text-center">
            {t("auth.registerScreen.description")}
          </Typography>
          <RegisterForm />
          <View className="mt-4 flex-row justify-center">
            <Typography className="mr-2 text-right">
              {t("auth.registerScreen.alreadyHaveAccount.title")}{" "}
            </Typography>
            <Link href={"/(auth)/login"}>
              <Typography weight="semiBold" className="text-right underline">
                {t("auth.registerScreen.alreadyHaveAccount.button")}
              </Typography>
            </Link>
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
