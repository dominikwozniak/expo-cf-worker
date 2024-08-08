import type { SubmitHandler } from "react-hook-form";
import { useCallback } from "react";
import { Keyboard } from "react-native";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { useForm } from "react-hook-form";

import { useAlert } from "~/shared-hooks/useAlert";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";
import { i18n } from "~/utils/i18n";

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
  const setLoading = useGlobalStore((state) => state.setLoading);
  const { showAlert } = useAlert();
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

        router.push("/(utils)/verify-email");
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
    control,
    errors,
    getValues,
    onSubmitPress,
  };
}
