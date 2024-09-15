import { View } from "react-native";
import { useTranslation } from "react-i18next";

import type {
  UpdateDetailsFormKeys} from "~/modules/account/hooks/personal-details/useUpdateDetails";
import {
  useUpdateDetails,
} from "~/modules/account/hooks/personal-details/useUpdateDetails";
import { Button } from "~/shared-components/Button";
import { FormField } from "~/shared-components/form/FormField";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";

interface UpdateDetailsFormProps {
  initialValue?: string;
  optionKey: UpdateDetailsFormKeys;
  onSuccess: () => void;
}
export function UpdateDetailsForm({
  initialValue,
  optionKey,
  onSuccess,
}: UpdateDetailsFormProps) {
  const isLoading = useGlobalStore((state) => state.isLoading);
  const { t } = useTranslation();

  const initialValues = {
    [optionKey]: initialValue,
  };

  const { control, errors, checkButtonDisabled, onSubmitPress } =
    useUpdateDetails(initialValues, onSuccess);

  return (
    <View className="mt-2">
      <FormField
        control={control}
        error={errors[optionKey]}
        name={optionKey}
        label={t(`common.input.${optionKey}.label`)}
        placeholder={t(`common.input.${optionKey}.placeholder`)}
        customRules={{
          required: true,
          minLength: 1,
        }}
        isBottomSheet
      />
      <Button
        onPress={onSubmitPress}
        disabled={checkButtonDisabled(optionKey) || isLoading}
        className="mt-4"
      >
        {t("common.save")}
      </Button>
    </View>
  );
}
