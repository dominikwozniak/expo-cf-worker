import * as Updates from "expo-updates";
import { useTranslation } from "react-i18next";

import { useAlert } from "~/shared-hooks/useAlert";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";

export function usePerformUpdate() {
  const { t } = useTranslation();
  const { showAlert } = useAlert();
  const setLoading = useGlobalStore((state) => state.setLoading);

  const handleUpdate = async () => {
    try {
      if (__DEV__) {
        return;
      }

      setLoading(true)
      const update = await Updates.checkForUpdateAsync();

      if (!update.isAvailable) {
        return;
      }

      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch {
      showAlert({
        title: t("common.error.baseError.title"),
        message: t("common.error.baseError.message"),
      });
    } finally {
      setLoading(false)
    }
  };

  return { handleUpdate };
}
