import { useForgotPassword } from "~/module/auth/hooks/useForgotPassword";
import { Button } from "~/shared-components/Button";
import { FormField } from "~/shared-components/form/FormField";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";

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
        className="mt-8"
      />
      <Button
        onPress={onSubmitPress}
        disabled={isButtonDisabled || isLoading}
        className="mt-8"
      >
        Reset password
      </Button>
    </>
  );
}
