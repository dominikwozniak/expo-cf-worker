import React from "react";
import { ScrollView, View } from "react-native";
import { Link } from "expo-router";

import { RegisterForm } from "~/modules/auth/components/RegisterForm";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { TopBar } from "~/shared-components/TopBar";
import { Typography } from "~/shared-components/Typography";

export default function Register() {
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
            Welcome to the community!
          </Typography>
          <Typography className="text-center">
            Create an account to get started
          </Typography>
          <RegisterForm />
          <View className="mt-4 flex-row justify-center">
            <Typography className="mr-2 text-right">
              Already have an account?{" "}
            </Typography>
            <Link href={"/(auth)/login"}>
              <Typography weight="semiBold" className="text-right underline">
                Sign in
              </Typography>
            </Link>
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
