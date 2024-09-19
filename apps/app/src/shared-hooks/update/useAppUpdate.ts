import { useEffect } from "react";
import { useRouter } from "expo-router";
import { checkForUpdateAsync, useUpdates } from "expo-updates";

import { isUpdateCritical } from "~/shared-hooks/update/isUpdateCritical";
import { useForegroundAppAction } from "~/shared-hooks/utils/useForegroundAppAction";
import { useRouterLoadedAction } from "~/shared-hooks/utils/useRouterLoadedAction";

export function useAppUpdate() {
  const {
    isChecking: isCheckingAppUpdate,
    availableUpdate,
    currentlyRunning,
  } = useUpdates();
  const router = useRouter();

  const { isRouterLoaded } = useRouterLoadedAction();

  useEffect(() => {
    if (!__DEV__ && isRouterLoaded && availableUpdate) {
      const isRequiredUpdate = isUpdateCritical(
        availableUpdate,
        currentlyRunning,
      );
      router.replace(`/(utils)/app-update?required=${isRequiredUpdate}`);
    }
  }, [isRouterLoaded, availableUpdate]);

  const checkIfUpdateAvailable = async () => {
    if (__DEV__) {
      return;
    }

    const availableUpdateAsync = await checkForUpdateAsync();
    const isRequiredUpdate = isUpdateCritical(
      availableUpdateAsync,
      currentlyRunning,
    );
    router.replace(`/(utils)/app-update?required=${isRequiredUpdate}`);
  };

  useForegroundAppAction(checkIfUpdateAvailable);

  return { isCheckingAppUpdate };
}
