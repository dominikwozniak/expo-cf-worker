import React from "react";
import { View } from "react-native";
import { Link, useRouter } from "expo-router";

import { Button } from "~/shared-components/Button";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { ThemeToggle } from "~/shared-components/ThemeToggle";
import { Typography } from "~/shared-components/Typography";
import { i18n } from "~/utils/i18n";

export default function Auth() {
  const router = useRouter();

  return (
    <ScreenLayout>
      <View className="flex-1 p-4">
        <Typography variant="header" weight="semiBold" className="mt-4">
          {i18n.t("auth.welcomeScreen.title")}
        </Typography>
        <Typography variant="paragraph" className="mt-2">
          {i18n.t("auth.welcomeScreen.description")}
        </Typography>
        <ThemeToggle />
        <Button
          onPress={() => router.push("/(auth)/register")}
          className="mt-8"
        >
          {i18n.t("auth.welcomeScreen.register.button")}
        </Button>
        <View className="mt-4 flex flex-row justify-center">
          <Typography variant="paragraph">
            {i18n.t("auth.welcomeScreen.login.description")}{" "}
          </Typography>
          <Link href="/(auth)/login">
            <Typography
              variant="paragraph"
              weight="semiBold"
              className="underline"
            >
              {i18n.t("auth.welcomeScreen.login.button")}
            </Typography>
          </Link>
        </View>
      </View>
    </ScreenLayout>
  );
}
