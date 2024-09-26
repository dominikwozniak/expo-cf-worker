import type { SubmitHandler } from "react-hook-form";
import { useCallback } from "react";
import { Keyboard } from "react-native";
import { useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { captureException } from "@sentry/react-native";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { mmkvConfig } from "~/config";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";
import { mmkvStore } from "~/utils/mmkv-store";
import { errorToast } from "~/utils/toast";

export interface FormValues {
  email: string;
  password: string;
}

export function useLogin() {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
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
      password: "",
    },
  });

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async (data) => {
      try {
        if (!isLoaded) {
          return;
        }

        setLoading(true);
        const { email, password } = data;

        Keyboard.dismiss();
        const completeSignIn = await signIn.create({
          identifier: email,
          password,
        });

        await setActive({ session: completeSignIn.createdSessionId });

        const isUserOnboarded = mmkvStore.getBoolean(
          mmkvConfig.onboardingComplete,
        );
        router.replace(
          isUserOnboarded ? "/(app)/(tabs)/home" : "/(onboarding)",
        );
      } catch (error) {
        captureException(new Error("Failed to login"), { extra: { error } });
        errorToast({
          title: t("common.error.login.title"),
          message: t("common.error.login.message"),
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
