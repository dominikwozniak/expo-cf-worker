import React from "react";

import { useVerifyCode } from "~/module/auth/hooks/useVerifyCode";
import { Button } from "~/shared-components/Button";
import { FormField } from "~/shared-components/form/FormField";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";

export function VerifyCodeForm() {
  const isLoading = useGlobalStore((state) => state.isLoading);
  const { control, onSubmitPress, errors, isButtonDisabled } = useVerifyCode();

  return (
    <>
      <FormField
        control={control}
        error={errors.code}
        name={"code"}
        label={"Code"}
        placeholder="Enter verification code"
        isRequired
        isNumeric
        customRules={{
          required: true,
          minLength: 1,
        }}
        className="mt-8"
      />
      <Button
        onPress={onSubmitPress}
        disabled={isButtonDisabled || isLoading}
        className="mt-8"
      >
        Verify
      </Button>
    </>
  );
}
