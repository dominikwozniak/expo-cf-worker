import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";



import { useRegister } from "~/modules/auth/hooks/useRegister";
import { Button } from "~/shared-components/Button";
import { FormField } from "~/shared-components/form/FormField";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";


export function RegisterForm() {
  const { t } = useTranslation();
  const isLoading = useGlobalStore((state) => state.isLoading);
  const { control, onSubmitPress, errors, getValues } = useRegister();

  return (
    <View className="mt-4">
      <FormField
        control={control}
        error={errors.email}
        name={"email"}
        label={t("common.input.email.label")}
        placeholder={t("common.input.email.placeholder")}
        isRequired
        customRules={{
          required: true,
          minLength: 0,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: t("common.input.email.error"),
          },
        }}
        className="mt-4"
      />
      <FormField
        control={control}
        error={errors.firstName}
        name={"firstName"}
        label={t("common.input.firstName.label")}
        placeholder={t("common.input.firstName.placeholder")}
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
        label={t("common.input.lastName.label")}
        placeholder={t("common.input.lastName.placeholder")}
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
        label={t("common.input.password.label")}
        placeholder={t("common.input.password.placeholder")}
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
        label={t("common.input.confirmPassword.label")}
        placeholder={t("common.input.confirmPassword.placeholder")}
        isRequired
        isPassword
        customRules={{
          minLength: 6,
          validate: (value: string) =>
            value === getValues().password ||
            t("common.input.confirmPassword.error"),
        }}
        className="mt-4"
      />
      <Button onPress={onSubmitPress} disabled={isLoading} className="mt-8">
        {t("auth.registerScreen.button")}
      </Button>
    </View>
  );
}
