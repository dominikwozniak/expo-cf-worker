import * as Updates from "expo-updates";
import { useTranslation } from "react-i18next";

import { useGlobalStore } from "~/shared-hooks/useGlobalStore";
import { errorToast } from "~/utils/toast";

export function usePerformUpdate() {
  const { t } = useTranslation();

  const setLoading = useGlobalStore((state) => state.setLoading);

  const handleUpdate = async () => {
    try {
      if (__DEV__) {
        return;
      }

      setLoading(true);
      const update = await Updates.checkForUpdateAsync();

      if (!update.isAvailable) {
        return;
      }

      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch {
      errorToast({
        title: t("common.error.appUpdate.title"),
        message: t("common.error.appUpdate.message"),
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdate };
}
