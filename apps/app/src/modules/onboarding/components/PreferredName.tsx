import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { usePreferredName } from "~/modules/onboarding/hooks/usePreferredName";
import { FormField } from "~/shared-components/form/FormField";
import { Typography } from "~/shared-components/Typography";

export function PreferredName() {
  const { t } = useTranslation();
  const { control, onSubmitPress, errors } = usePreferredName();

  return (
    <View className="flex items-center">
      <Typography variant="title" weight="semiBold" className="text-center">
        {t("onboarding.onboardingScreen.slides.name")}
      </Typography>
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
