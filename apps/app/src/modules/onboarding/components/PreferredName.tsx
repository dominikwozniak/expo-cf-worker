import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { usePreferredName } from "~/modules/onboarding/hooks/usePreferredName";
import { FormField } from "~/shared-components/form/FormField";

export function PreferredName() {
  const { t } = useTranslation();
  const { control, onSubmitPress, errors } = usePreferredName();

  return (
    <View>
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
        className="mx-auto mt-4 w-3/4"
      />
    </View>
  );
}
