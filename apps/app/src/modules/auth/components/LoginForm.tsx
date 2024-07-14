import React from "react";
import { View } from "react-native";

import { useLogin } from "~/modules/auth/hooks/useLogin";
import { Button } from "~/shared-components/Button";
import { FormField } from "~/shared-components/form/FormField";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";
import { i18n } from "~/utils/i18n";

export function LoginForm() {
  const isLoading = useGlobalStore((state) => state.isLoading);
  const { control, onSubmitPress, errors, isButtonDisabled } = useLogin();

  return (
    <View className="mt-4">
      <FormField
        control={control}
        error={errors.email}
        name={"email"}
        label={i18n.t("common.input.email.label")}
        placeholder={i18n.t("common.input.email.placeholder")}
        isRequired
        customRules={{
          required: true,
          minLength: 0,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: i18n.t("common.input.email.error"),
          },
        }}
        className="mt-4"
      />
      <FormField
        control={control}
        error={errors.password}
        name={"password"}
        label={i18n.t("common.input.password.label")}
        placeholder={i18n.t("common.input.password.placeholder")}
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
        {i18n.t("auth.loginScreen.button")}
      </Button>
    </View>
  );
}
