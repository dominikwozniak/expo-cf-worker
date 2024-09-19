import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import { Button } from "~/shared-components/Button";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { Typography } from "~/shared-components/Typography";
import { usePerformUpdate } from "~/shared-hooks/update/usePerformUpdate";

export default function AppUpdate() {
  const { t } = useTranslation();
  const { required } = useLocalSearchParams<{ required?: string }>();
  const router = useRouter();

  const { handleUpdate } = usePerformUpdate();

  const isUpdateRequired = required === "true";

  return (
    <ScreenLayout>
      <View className="flex-1 px-4">
        <View className="flex-1 justify-center">
          <Typography
            variant="header"
            weight="semiBold"
            className="text-center"
          >
            {t("utils.appUpdateScreen.title")}
          </Typography>
          <Typography variant="paragraph" className="text-center">
            {t("utils.appUpdateScreen.description")}
          </Typography>
        </View>
        <View>
          <Button onPress={handleUpdate}>
            {t("utils.appUpdateScreen.button")}
          </Button>
          {!isUpdateRequired ? (
            <Button
              onPress={() => router.replace("/")}
              backgroundColor="alternative"
              textColor="alternative"
              className="mt-4"
            >
              {t("utils.appUpdateScreen.backButton")}
            </Button>
          ) : null}
        </View>
      </View>
    </ScreenLayout>
  );
}
