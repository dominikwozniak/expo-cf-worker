import type { SubmitHandler } from "react-hook-form";
import { useCallback } from "react";
import { Keyboard } from "react-native";
import { useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAlert } from "~/shared-hooks/useAlert";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";
import { MMKV_ONBOARDING_COMPLETE, mmkvStore } from "~/utils/mmkv-store";

export interface FormValues {
  code: string;
}

export function useVerifyCode() {
  const router = useRouter();
  const { signIn, isLoaded, setActive } = useSignIn();
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
        const completeSignIn = await signIn.attemptFirstFactor({
          strategy: "email_code",
          code,
        });

        await setActive({ session: completeSignIn.createdSessionId });
        const isUserOnboarded = mmkvStore.getBoolean(MMKV_ONBOARDING_COMPLETE);
        router.replace(
          isUserOnboarded ? "/(app)/(tabs)/home" : "/(onboarding)",
        );
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
