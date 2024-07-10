import React from "react";
import { View } from "react-native";
import { Link } from "expo-router";

import { useLogin } from "~/module/auth/hooks/useLogin";
import { Button } from "~/shared-components/Button";
import { FormField } from "~/shared-components/form/FormField";
import { Typography } from "~/shared-components/Typography";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";

export function LoginForm() {
  const isLoading = useGlobalStore((state) => state.isLoading);
  const { control, onSubmitPress, errors, isButtonDisabled } = useLogin();

  return (
    <View className="mt-4">
      <FormField
        control={control}
        error={errors.email}
        name={"email"}
        label="Email"
        placeholder="Enter your email address"
        isRequired
        customRules={{
          required: true,
          minLength: 0,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        }}
        className="mt-4"
      />
      <FormField
        control={control}
        error={errors.password}
        name={"password"}
        label="Password"
        placeholder="Enter your password"
        isRequired
        isPassword
        customRules={{
          required: true,
          minLength: 8,
        }}
        className="mt-4"
      />
      <Button
        onPress={onSubmitPress}
        disabled={isButtonDisabled || isLoading}
        className="mt-8"
      >
        Sign in
      </Button>
      <View className="mt-4">
        <Link href="/(auth)/forgot-password">
          <Typography className="text-right underline">
            Forgot password?
          </Typography>
        </Link>
      </View>
    </View>
  );
}
