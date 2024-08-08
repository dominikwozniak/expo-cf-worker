import type { SubmitHandler } from "react-hook-form";
import { useCallback } from "react";
import { Keyboard } from "react-native";
import { useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { useForm } from "react-hook-form";

import { useAlert } from "~/shared-hooks/useAlert";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";
import { i18n } from "~/utils/i18n";

export interface FormValues {
  email: string;
}

export function useForgotPassword() {
  const router = useRouter();
  const { signIn, isLoaded } = useSignIn();
  const setLoading = useGlobalStore((state) => state.setLoading);
  const { showAlert } = useAlert();
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

        router.push("/(utils)/verify-code");
      } catch {
        showAlert({
          title: i18n.t("common.error.baseError.title"),
          message: i18n.t("common.error.baseError.message"),
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
