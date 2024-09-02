import { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useTranslation } from "react-i18next";

import { UpdateDetailsForm } from "~/modules/account/components/personal-details/UpdateDetailsForm";
import { UpdateDetailsFormKeys } from "~/modules/account/hooks/personal-details/useUpdateDetails";
import {
  BottomSheet,
  BottomSheetView,
  useBottomSheet,
} from "~/shared-components/BottomSheet";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { List } from "~/shared-components/list";
import { TopBar } from "~/shared-components/TopBar";
import { Typography } from "~/shared-components/Typography";

export default function PersonalDetails() {
  const { t } = useTranslation();
  const { user } = useUser();

  const {
    ref,
    open: openBottomSheet,
    close: closeBottomSheet,
  } = useBottomSheet();

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

  const personalActions = [
    {
      id: "changePassword",
      title: t("account.personalDetails.changePassword.title"),
      disabled: !user?.passwordEnabled,
    },
    {
      id: "deleteAccount",
      title: t("account.personalDetails.deleteAccount.title"),
      disabled: false,
    },
  ].filter((detail) => !detail.disabled);

  const [selectedOption, setSelectedOption] = useState<
    (typeof personalDetails)[number] | null
  >(null);

  const handlePressPersonalDetail = (
    option: (typeof personalDetails)[number],
  ) => {
    setSelectedOption(option);
    openBottomSheet();
  };

  const handleCloseModal = () => {
    setSelectedOption(null);
    closeBottomSheet();
  };

  return (
    <ScreenLayout isScrollable>
      <TopBar title={t("account.personalDetails.title")} />
      <List>
        <List.Inner>
          {personalDetails.map((detail, index) => (
            <List.Item
              key={detail.id}
              title={detail.title}
              onPress={() => handlePressPersonalDetail(detail)}
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

      <List className="mt-2">
        <List.Inner>
          {personalActions.map((detail, index) => (
            <List.Item
              key={detail.id}
              title={detail.title}
              isTouchable
              isLastItem={index === personalActions.length - 1}
            />
          ))}
        </List.Inner>
      </List>
      <BottomSheet ref={ref}>
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
    </ScreenLayout>
  );
}
