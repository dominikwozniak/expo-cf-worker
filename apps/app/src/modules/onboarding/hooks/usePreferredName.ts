import { useCallback, useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useForm } from "react-hook-form";

export interface FormValues {
  preferredName: string;
}

export function usePreferredName() {
  const submitting = useRef(false);
  const { user } = useUser();
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
        console.error(error);
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
