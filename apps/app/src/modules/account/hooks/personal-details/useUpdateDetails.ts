import type { SubmitHandler } from "react-hook-form";
import { useCallback } from "react";
import { Keyboard } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAlert } from "~/shared-hooks/useAlert";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";

export interface FormValues {
  firstName: string;
  lastName: string;
}

export type UpdateDetailsFormKeys = keyof FormValues;

export type InitialValues = Partial<Record<keyof FormValues, string>>;

export function useUpdateDetails(
  initialValues: InitialValues,
  onSuccess: () => void,
) {
  const { t } = useTranslation();

  const setLoading = useGlobalStore((state) => state.setLoading);
  const { showAlert } = useAlert();
  const {
    handleSubmit,
    control,
    watch,
    getValues,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      firstName: initialValues.firstName ?? "",
      lastName: initialValues.lastName ?? "",
    },
  });

  const { user } = useUser();

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async (data) => {
      if (!user) {
        return;
      }

      try {
        const { firstName, lastName } = data;
        setLoading(true);

        await user.update({
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
        });
        Keyboard.dismiss();
        onSuccess();
      } catch {
        showAlert({
          title: t("common.error.baseError.title"),
          message: t("common.error.baseError.message"),
        });
      } finally {
        setLoading(false);
      }
    },
    [reset],
  );

  const onSubmitPress = handleSubmit(onSubmit);

  const checkButtonDisabled = useCallback(
    (optionKey: UpdateDetailsFormKeys) => {
      return watch(optionKey) === initialValues[optionKey];
    },
    [watch],
  );

  return {
    control,
    errors,
    getValues,
    onSubmitPress,
    checkButtonDisabled,
  };
}
