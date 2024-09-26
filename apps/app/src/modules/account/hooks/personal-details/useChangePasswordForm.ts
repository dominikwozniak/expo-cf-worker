import type { SubmitHandler } from "react-hook-form";
import { useCallback } from "react";
import { Keyboard } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { captureException } from "@sentry/react-native";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useGlobalStore } from "~/shared-hooks/useGlobalStore";
import { errorToast, successToast } from "~/utils/toast";

export interface FormValues {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export function useChangePasswordForm(onSuccess: () => void) {
  const { t } = useTranslation();

  const setLoading = useGlobalStore((state) => state.setLoading);

  const {
    handleSubmit,
    control,
    watch,
    getValues,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { user } = useUser();

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async (data) => {
      if (!user) {
        return;
      }

      try {
        const { password, currentPassword } = data;
        setLoading(true);

        await user.updatePassword({
          newPassword: password,
          currentPassword,
        });
        Keyboard.dismiss();

        successToast({
          title: t("common.success.updatePassword.title"),
          message: t("common.success.updatePassword.message"),
        });

        onSuccess();
      } catch (error) {
        captureException(new Error("Failed to change password"), {
          extra: { error },
        });
        errorToast({
          title: t("common.error.updatePassword.title"),
          message: t("common.error.updatePassword.message"),
        });
      } finally {
        setLoading(false);
      }
    },
    [reset],
  );

  const onSubmitPress = handleSubmit(onSubmit);

  const isSubmitDisabled = useCallback(() => {
    return (
      watch("password") !== watch("confirmPassword") ||
      watch("password") === "" ||
      watch("confirmPassword") === ""
    );
  }, [watch]);

  return {
    control,
    errors,
    getValues,
    onSubmitPress,
    isSubmitDisabled,
  };
}
