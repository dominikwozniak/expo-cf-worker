import { useCallback, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useTranslation } from "react-i18next";

import type { UpdateDetailsFormKeys } from "~/modules/account/hooks/personal-details/useUpdateDetails";
import { UpdateDetailsForm } from "~/modules/account/components/personal-details/UpdateDetailsForm";
import {
  BottomSheet,
  BottomSheetView,
  useBottomSheet,
} from "~/shared-components/BottomSheet";
import { List } from "~/shared-components/list";
import { Typography } from "~/shared-components/Typography";

export function UserDetailsPanel() {
  const { t } = useTranslation();
  const { user } = useUser();

  const {
    ref,
    open: openBottomSheet,
    close: closeBottomSheet,
  } = useBottomSheet();

  const [selectedOption, setSelectedOption] = useState<
    (typeof personalDetails)[number] | null
  >(null);

  const personalDetails = [
    {
      id: "email",
      title: t("account.personalDetails.email.title"),
      value: user?.primaryEmailAddress?.emailAddress,
      // TODO: implement changing email using clerk backend sdk
      disabled: true,
    },
    {
      id: "firstName",
      title: t("account.personalDetails.firstName.title"),
      value: user?.firstName,
      disabled: false,
    },
    {
      id: "lastName",
      title: t("account.personalDetails.lastName.title"),
      value: user?.lastName,
      disabled: false,
    },
  ].filter((detail) => !detail.disabled);

  const handleOpenModal = useCallback(
    (option: (typeof personalDetails)[number]) => {
      openBottomSheet();
      setSelectedOption(option);
    },
    [],
  );

  const handleCloseModal = useCallback(() => {
    setSelectedOption(null);
    closeBottomSheet();
  }, [closeBottomSheet]);

  return (
    <>
      <List>
        <List.Inner>
          {personalDetails.map((detail, index) => (
            <List.Item
              key={detail.id}
              title={detail.title}
              onPress={() => handleOpenModal(detail)}
              isTouchable
              isChevronHidden
              isLastItem={index === personalDetails.length - 1}
            >
              <Typography variant="small" color="primary">
                {detail.value}
              </Typography>
            </List.Item>
          ))}
        </List.Inner>
      </List>
      <BottomSheet ref={ref} onDismiss={handleCloseModal}>
        <BottomSheetView>
          {selectedOption?.value && selectedOption.title ? (
            <UpdateDetailsForm
              initialValue={selectedOption.value}
              optionKey={selectedOption.id as UpdateDetailsFormKeys}
              onSuccess={handleCloseModal}
            />
          ) : null}
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
