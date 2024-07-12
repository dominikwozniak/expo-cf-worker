import { useCallback } from "react";
import { Keyboard } from "react-native";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAlert } from "~/shared-hooks/useAlert";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";

export interface FormValues {
  code: string;
}

export function useVerifyEmail() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
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
    isButtonDisabled: !isValid,
    control,
    errors,
    onSubmitPress,
  };
}
