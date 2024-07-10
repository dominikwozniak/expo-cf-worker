import React from "react";
import { View } from "react-native";
import { Link, useRouter } from "expo-router";

import { Button } from "~/shared-components/Button";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { Typography } from "~/shared-components/Typography";

export default function Auth() {
  const router = useRouter();

  return (
    <ScreenLayout>
      <View className="flex-1 p-4">
        <Typography variant="header" weight="semiBold" className="mt-4">
          Hello, welcome to the app!
        </Typography>
        <Typography variant="paragraph" className="mt-2">
          Let's get started by creating your account.
        </Typography>
        <Button
          onPress={() => router.push("/(auth)/register")}
          className="mt-8"
        >
          Let's start
        </Button>
        <View className="mt-4 flex flex-row justify-center">
          <Typography variant="paragraph">Already have an account? </Typography>
          <Link href="/(auth)/login">
            <Typography
              variant="paragraph"
              weight="semiBold"
              className="underline"
            >
              Sign in
            </Typography>
          </Link>
        </View>
      </View>
    </ScreenLayout>
  );
}
