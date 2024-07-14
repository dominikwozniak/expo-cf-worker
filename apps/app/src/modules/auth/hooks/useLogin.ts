import { useCallback } from "react";
import { Keyboard } from "react-native";
import { useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAlert } from "~/shared-hooks/useAlert";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";
import { i18n } from "~/utils/i18n";

export interface FormValues {
  email: string;
  password: string;
}

export function useLogin() {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
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
        router.replace("/(app)/(tabs)/home");
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
