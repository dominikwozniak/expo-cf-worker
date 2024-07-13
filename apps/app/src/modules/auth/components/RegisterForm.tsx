import React from "react";
import { View } from "react-native";

import { useRegister } from "~/modules/auth/hooks/useRegister";
import { Button } from "~/shared-components/Button";
import { FormField } from "~/shared-components/form/FormField";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";

export function RegisterForm() {
  const isLoading = useGlobalStore((state) => state.isLoading);
  const { control, onSubmitPress, errors, getValues } = useRegister();

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
        error={errors.firstName}
        name={"firstName"}
        label="Fisrst Name"
        placeholder="Enter your first name"
        isRequired
        customRules={{
          required: true,
          minLength: 2,
        }}
        className="mt-4"
      />
      <FormField
        control={control}
        error={errors.lastName}
        name={"lastName"}
        label="Last Name"
        placeholder="Enter your last name"
        isRequired
        customRules={{
          required: true,
          minLength: 2,
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
      <FormField
        control={control}
        error={errors.confirmPassword}
        name={"confirmPassword"}
        label="Confirm Password"
        placeholder="Confirm your password"
        isRequired
        isPassword
        customRules={{
          minLength: 6,
          validate: (value: string) =>
            value === getValues().password || "The passwords do not match",
        }}
        className="mt-4"
      />
      <Button onPress={onSubmitPress} disabled={isLoading} className="mt-8">
        Create Your Account
      </Button>
    </View>
  );
}
