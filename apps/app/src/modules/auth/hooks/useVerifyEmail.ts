import type { SubmitHandler } from "react-hook-form";
import { useCallback } from "react";
import { Keyboard } from "react-native";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAlert } from "~/shared-hooks/useAlert";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";

export interface FormValues {
  code: string;
}

export function useVerifyEmail() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { t } = useTranslation();
  const setLoading = useGlobalStore((state) => state.setLoading);
  const { showAlert } = useAlert();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async (data) => {
      try {
        if (!isLoaded) {
          return;
        }

        setLoading(true);
        const { code } = data;

        Keyboard.dismiss();

        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code,
        });
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/(app)/(tabs)/home");
      } catch {
        showAlert({
          title: t("common.error.baseError.title"),
          message: t("common.error.baseError.message"),
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
