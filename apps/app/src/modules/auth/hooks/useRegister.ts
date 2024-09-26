import type { SubmitHandler } from "react-hook-form";
import { useCallback } from "react";
import { Keyboard } from "react-native";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { captureException } from "@sentry/react-native";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useGlobalStore } from "~/shared-hooks/useGlobalStore";
import { errorToast, successToast } from "~/utils/toast";

export interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export function useRegister() {
  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();
  const { t } = useTranslation();

  const setLoading = useGlobalStore((state) => state.setLoading);

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async (data) => {
      try {
        if (!isLoaded) {
          return;
        }

        const { email, firstName, lastName, password } = data;
        setLoading(true);

        Keyboard.dismiss();
        await signUp.create({
          emailAddress: email,
          firstName,
          lastName,
          password,
        });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        successToast({
          title: t("common.success.register.title"),
          message: t("common.success.register.message"),
        });

        router.push("/(utils)/verify-email");
      } catch (error) {
        captureException(new Error("Failed to register"), { extra: { error } });
        errorToast({
          title: t("common.error.register.title"),
          message: t("common.error.register.message"),
        });
      } finally {
        setLoading(false);
      }
    },
    [reset, isLoaded],
  );

  const onSubmitPress = handleSubmit(onSubmit);

  return {
    control,
    errors,
    getValues,
    onSubmitPress,
  };
}
