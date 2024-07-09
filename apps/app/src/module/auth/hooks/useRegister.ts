import { useCallback } from "react";
import { Keyboard } from "react-native";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAlert } from "~/shared-hooks/useAlert";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";

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
        setLoading(true);
        const { email, firstName, lastName, password } = data;

        if (!isLoaded) {
          return;
        }

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

        router.push("/(verify)/email");
      } catch {
        showAlert({
          title: "Error!",
          message: "Something went wrong. Please try again.",
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
