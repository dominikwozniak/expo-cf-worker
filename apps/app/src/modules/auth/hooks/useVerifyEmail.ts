import type { SubmitHandler } from "react-hook-form";
import { useCallback } from "react";
import { Keyboard } from "react-native";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { captureException } from "@sentry/react-native";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { mmkvConfig } from "~/config";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";
import { mmkvStore } from "~/utils/mmkv-store";
import { errorToast, successToast } from "~/utils/toast";

export interface FormValues {
  code: string;
}

export function useVerifyEmail() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { t } = useTranslation();
  const setLoading = useGlobalStore((state) => state.setLoading);

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

        successToast({
          title: t("common.success.verifyEmail.title"),
          message: t("common.success.verifyEmail.message"),
        });

        const isUserOnboarded = mmkvStore.getBoolean(
          mmkvConfig.onboardingComplete,
        );
        router.replace(
          isUserOnboarded ? "/(app)/(tabs)/home" : "/(onboarding)",
        );
      } catch (error) {
        captureException(new Error("Failed to verify email"), {
          extra: { error },
        });
        errorToast({
          title: t("common.error.verifyEmail.title"),
          message: t("common.error.verifyEmail.message"),
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
