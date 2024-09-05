import { useCallback, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useTranslation } from "react-i18next";

import { ChangePasswordForm } from "~/modules/account/components/personal-details/ChangePasswordForm";
import { useDeleteAccount } from "~/modules/account/hooks/personal-details/useDeleteAccount";
import {
  BottomSheet,
  BottomSheetView,
  useBottomSheet,
} from "~/shared-components/BottomSheet";
import { List } from "~/shared-components/list";

export function UserActionsPanel() {
  const { t } = useTranslation();
  const { user } = useUser();

  const {
    ref,
    open: openBottomSheet,
    close: closeBottomSheet,
  } = useBottomSheet();
  const { handleShowDeleteAccountAlert } = useDeleteAccount();

  const [changePasswordFormVisible, setChangePasswordFormVisible] =
    useState(false);

  const handleOpenModal = useCallback(() => {
    openBottomSheet();
    setChangePasswordFormVisible(true);
  }, [openBottomSheet]);

  const personalActions = [
    {
      id: "changePassword",
      title: t("account.personalDetails.changePassword.title"),
      onPress: handleOpenModal,
      disabled: !user?.passwordEnabled,
    },
    {
      id: "deleteAccount",
      title: t("account.personalDetails.deleteAccount.title"),
      onPress: handleShowDeleteAccountAlert,
      disabled: false,
    },
  ].filter((detail) => !detail.disabled);

  const handleCloseModal = useCallback(() => {
    setChangePasswordFormVisible(false);
    closeBottomSheet();
  }, [closeBottomSheet]);

  return (
    <>
      <List>
        <List.Inner>
          {personalActions.map((detail, index) => (
            <List.Item
              key={detail.id}
              title={detail.title}
              onPress={detail.onPress}
              isTouchable
              isLastItem={index === personalActions.length - 1}
            />
          ))}
        </List.Inner>
      </List>
      <BottomSheet ref={ref} onDismiss={handleCloseModal}>
        <BottomSheetView>
          {changePasswordFormVisible ? (
            <ChangePasswordForm onSuccess={handleCloseModal} />
          ) : null}
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
