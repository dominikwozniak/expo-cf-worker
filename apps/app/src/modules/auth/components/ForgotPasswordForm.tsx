import { useTranslation } from "react-i18next";

import { useForgotPassword } from "~/modules/auth/hooks/useForgotPassword";
import { Button } from "~/shared-components/Button";
import { FormField } from "~/shared-components/form/FormField";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";

export function ForgotPasswordForm() {
  const { t } = useTranslation();
  const isLoading = useGlobalStore((state) => state.isLoading);
  const { control, onSubmitPress, errors, isButtonDisabled } =
    useForgotPassword();

  return (
    <>
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
        className="mt-8"
      />
      <Button
        onPress={onSubmitPress}
        disabled={isButtonDisabled || isLoading}
        className="mt-8"
      >
        {t("auth.forgotPasswordScreen.button")}
      </Button>
    </>
  );
}
