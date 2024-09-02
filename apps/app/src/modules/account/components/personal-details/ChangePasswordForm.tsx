import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { useChangePasswordForm } from "~/modules/account/hooks/personal-details/useChangePasswordForm";
import { Button } from "~/shared-components/Button";
import { FormField } from "~/shared-components/form/FormField";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";

interface UpdateDetailsFormProps {
  onSuccess: () => void;
}
export function ChangePasswordForm({ onSuccess }: UpdateDetailsFormProps) {
  const isLoading = useGlobalStore((state) => state.isLoading);
  const { t } = useTranslation();

  const { control, onSubmitPress, errors, getValues, isSubmitDisabled } =
    useChangePasswordForm(onSuccess);

  return (
    <View className="mt-2">
      <FormField
        control={control}
        error={errors.currentPassword}
        name={"currentPassword"}
        label={t("common.input.currentPassword.label")}
        placeholder={t("common.input.currentPassword.placeholder")}
        isRequired
        isPassword
        customRules={{
          required: true,
          minLength: 1,
        }}
        className="mt-4"
        isBottomSheet
      />
      <FormField
        control={control}
        error={errors.password}
        name={"password"}
        label={t("common.input.changePassword.label")}
        placeholder={t("common.input.changePassword.placeholder")}
        isRequired
        isPassword
        customRules={{
          required: true,
          minLength: 8,
        }}
        className="mt-4"
        isBottomSheet
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
        isBottomSheet
      />
      <Button
        onPress={onSubmitPress}
        disabled={isLoading || isSubmitDisabled()}
        className="mt-8"
      >
        {t("account.personalDetails.changePassword.title")}
      </Button>
    </View>
  );
}
