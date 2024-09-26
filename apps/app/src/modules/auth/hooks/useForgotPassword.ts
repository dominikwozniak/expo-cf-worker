import type { SubmitHandler } from "react-hook-form";
import { useCallback } from "react";
import { Keyboard } from "react-native";
import { useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { captureException } from "@sentry/react-native";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useGlobalStore } from "~/shared-hooks/useGlobalStore";
import { errorToast, successToast } from "~/utils/toast";

export interface FormValues {
  email: string;
}

export function useForgotPassword() {
  const router = useRouter();
  const { signIn, isLoaded } = useSignIn();
  const { t } = useTranslation();
  const setLoading = useGlobalStore((state) => state.setLoading);
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async (data) => {
      try {
        if (!isLoaded) {
          return;
        }

        setLoading(true);
        const { email } = data;

        Keyboard.dismiss();
        await signIn.create({
          strategy: "email_code",
          identifier: email,
        });

        successToast({
          title: t("common.success.forgotPassword.title"),
          message: t("common.success.forgotPassword.message"),
        });
        router.push("/(utils)/verify-code");
      } catch (error) {
        captureException(new Error("Failed to forgot password"), {
          extra: { error },
        });
        errorToast({
          title: t("common.error.forgotPassword.title"),
          message: t("common.error.forgotPassword.message"),
        });
      } finally {
        setLoading(false);
      }
    },
    [reset, isLoaded],
  );

  const onSubmitPress = handleSubmit(onSubmit);

  return {
    isButtonDisabled: !isValid,
    control,
    errors,
    onSubmitPress,
  };
}
