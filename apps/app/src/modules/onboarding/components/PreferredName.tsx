import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { usePreferredName } from "~/modules/onboarding/hooks/usePreferredName";
import { FormField } from "~/shared-components/form/FormField";

export function PreferredName() {
  const { t } = useTranslation();
  const { control, onSubmitPress, errors } = usePreferredName();

  return (
    <View className="flex items-center">
      <FormField
        control={control}
        name="preferredName"
        placeholder={t("common.input.preferredName.placeholder")}
        error={errors.preferredName}
        customRules={{
          required: true,
          minLength: 1,
        }}
        onFinishedEditing={onSubmitPress}
        className="mt-4 w-4/5"
      />
    </View>
  );
}
