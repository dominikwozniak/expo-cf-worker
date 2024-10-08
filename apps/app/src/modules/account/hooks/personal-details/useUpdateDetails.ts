import type { SubmitHandler } from "react-hook-form";
import { useCallback } from "react";
import { Keyboard } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { captureException } from "@sentry/react-native";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useGlobalStore } from "~/shared-hooks/useGlobalStore";
import { errorToast, successToast } from "~/utils/toast";

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

        successToast({
          title: t("common.success.updateProfile.title"),
          message: t("common.success.updateProfile.message"),
        });
        onSuccess();
      } catch (error) {
        captureException(new Error("Failed to update details"), {
          extra: { error },
        });
        errorToast({
          title: t("common.error.updateProfile.title"),
          message: t("common.error.updateProfile.message"),
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
