import type { SubmitHandler } from "react-hook-form";
import { useCallback } from "react";
import { Keyboard } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAlert } from "~/shared-hooks/useAlert";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";

export interface FormValues {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export function useChangePasswordForm(onSuccess: () => void) {
  const { t } = useTranslation();

  const setLoading = useGlobalStore((state) => state.setLoading);
  const { showAlert } = useAlert();
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
        onSuccess();
      } catch {
        showAlert({
          title: t("common.error.baseError.title"),
          message: t("common.error.baseError.message"),
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
