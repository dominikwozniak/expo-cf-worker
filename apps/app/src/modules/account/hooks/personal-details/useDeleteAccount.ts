import { useCallback } from "react";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { captureException } from "@sentry/react-native";
import { useTranslation } from "react-i18next";

import { useAlert } from "~/shared-hooks/useAlert";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";
import { api } from "~/utils/api";
import { mmkvStore } from "~/utils/mmkv-store";
import { errorToast } from "~/utils/toast";

export function useDeleteAccount() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useUser();
  const setLoading = useGlobalStore((state) => state.setLoading);

  const { mutateAsync: deleteUserMutation } = api.user.deleteUser.useMutation();

  const { showConfirmAlert } = useAlert();

  const handleDeleteAccount = useCallback(async () => {
    try {
      if (!user) {
        return;
      }

      setLoading(true);

      await deleteUserMutation();
      mmkvStore.clearAll();
      router.push("/(auth)");
    } catch (error) {
      captureException(new Error("Failed to delete account"), {
        extra: { error },
      });
      errorToast({
        title: t("common.error.deleteAccount.title"),
        message: t("common.error.deleteAccount.message"),
      });
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleShowDeleteAccountAlert = useCallback(() => {
    showConfirmAlert({
      title: t("account.personalDetails.deleteAccount.alert.title"),
      message: t("account.personalDetails.deleteAccount.alert.description"),
      onConfirm: handleDeleteAccount,
      textConfirm: t("account.personalDetails.deleteAccount.alert.confirm"),
    });
  }, [handleDeleteAccount, showConfirmAlert]);

  return {
    handleShowDeleteAccountAlert,
  };
}
