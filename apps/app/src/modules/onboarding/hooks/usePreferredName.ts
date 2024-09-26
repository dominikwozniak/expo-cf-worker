import { useCallback, useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-expo";
import { captureException } from "@sentry/react-native";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { errorToast } from "~/utils/toast";

export interface FormValues {
  preferredName: string;
}

export function usePreferredName() {
  const submitting = useRef(false);
  const { user } = useUser();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      preferredName: user?.firstName ?? "",
    },
  });

  const onSubmit = useCallback(
    async (data: FormValues) => {
      try {
        if (!user || submitting.current) {
          return;
        }

        submitting.current = true;
        await user.update({ firstName: data.preferredName });
      } catch (error) {
        captureException(new Error("Failed to register"), { extra: { error } });
        errorToast({
          title: t("common.error.updatePreferredName.title"),
          message: t("common.error.updatePreferredName.message"),
        });
      } finally {
        submitting.current = false;
      }
    },
    [reset, user],
  );

  const onSubmitPress = handleSubmit(onSubmit);

  const isError = Object.keys(errors).length > 0;

  // Reset the form if there is an error
  useEffect(() => {
    if (isError) {
      reset();
    }
  }, [isError]);

  return {
    control,
    errors,
    onSubmitPress,
  };
}
