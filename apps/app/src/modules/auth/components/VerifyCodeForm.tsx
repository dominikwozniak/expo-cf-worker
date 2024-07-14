import React from "react";

import { useVerifyCode } from "~/modules/auth/hooks/useVerifyCode";
import { Button } from "~/shared-components/Button";
import { ConfirmationCodeController } from "~/shared-components/form/confirmation-code/ConfirmationCodeController";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";
import { i18n } from "~/utils/i18n";

export function VerifyCodeForm() {
  const isLoading = useGlobalStore((state) => state.isLoading);
  const { control, onSubmitPress, isButtonDisabled } = useVerifyCode();

  return (
    <>
      <ConfirmationCodeController
        control={control}
        name="code"
        isRequired
        customRules={{
          required: true,
          minLength: 6,
        }}
        className="mt-8"
      />
      <Button
        onPress={onSubmitPress}
        disabled={isButtonDisabled || isLoading}
        className="mt-8"
      >
        {i18n.t("utils.verifyCodeScreen.button")}
      </Button>
    </>
  );
}
