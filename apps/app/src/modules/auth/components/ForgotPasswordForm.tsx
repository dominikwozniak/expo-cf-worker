import { useForgotPassword } from "~/modules/auth/hooks/useForgotPassword";
import { Button } from "~/shared-components/Button";
import { FormField } from "~/shared-components/form/FormField";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";
import { i18n } from "~/utils/i18n";

export function ForgotPasswordForm() {
  const isLoading = useGlobalStore((state) => state.isLoading);
  const { control, onSubmitPress, errors, isButtonDisabled } =
    useForgotPassword();

  return (
    <>
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
        className="mt-8"
      />
      <Button
        onPress={onSubmitPress}
        disabled={isButtonDisabled || isLoading}
        className="mt-8"
      >
        {i18n.t("auth.forgotPasswordScreen.button")}
      </Button>
    </>
  );
}
