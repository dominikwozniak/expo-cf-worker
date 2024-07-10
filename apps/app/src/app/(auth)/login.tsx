import React from "react";
import { ScrollView, View } from "react-native";
import { Link } from "expo-router";

import { LoginForm } from "~/module/auth/components/LoginForm";
import { OAuthForm } from "~/module/auth/components/OAuthForm";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { TopBar } from "~/shared-components/TopBar";
import { Typography } from "~/shared-components/Typography";

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
            Welcome back!
          </Typography>
          <Typography className="text-center">
            Log in to your account
          </Typography>
          <LoginForm />
          <OAuthForm />
          <View className="mt-2 flex-row justify-center">
            <Typography className="mr-2 text-right">
              Don't have an account?{" "}
            </Typography>
            <Link href="/(auth)/register">
              <Typography weight="semiBold" className="text-right underline">
                Sign up
              </Typography>
            </Link>
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
