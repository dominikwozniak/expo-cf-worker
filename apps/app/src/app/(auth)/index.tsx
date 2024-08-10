import React from "react";
import { View } from "react-native";
import { Link, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import { Button } from "~/shared-components/Button";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { Typography } from "~/shared-components/Typography";

export default function Auth() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <ScreenLayout>
      <View className="flex-1 p-4">
        <Typography variant="header" weight="semiBold" className="mt-4">
          {t("auth.welcomeScreen.title")}
        </Typography>
        <Typography variant="paragraph" className="mt-2">
          {t("auth.welcomeScreen.description")}
        </Typography>
        <Button
          onPress={() => router.push("/(auth)/register")}
          className="mt-8"
        >
          {t("auth.welcomeScreen.register.button")}
        </Button>
        <View className="mt-4 flex flex-row justify-center">
          <Typography variant="paragraph">
            {t("auth.welcomeScreen.login.description")}{" "}
          </Typography>
          <Link href="/(auth)/login">
            <Typography
              variant="paragraph"
              weight="semiBold"
              className="underline"
            >
              {t("auth.welcomeScreen.login.button")}
            </Typography>
          </Link>
        </View>
      </View>
    </ScreenLayout>
  );
}
