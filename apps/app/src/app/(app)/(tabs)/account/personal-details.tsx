import { useUser } from "@clerk/clerk-expo";
import { useTranslation } from "react-i18next";

import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { List } from "~/shared-components/list";
import { TopBar } from "~/shared-components/TopBar";
import { Typography } from "~/shared-components/Typography";

export default function PersonalDetails() {
  const { t } = useTranslation();
  const { user } = useUser();

  const personalDetails = [
    {
      id: "email",
      title: t("account.personalDetails.email.title"),
      value: user?.primaryEmailAddress?.emailAddress,
    },
    {
      id: "firstName",
      title: t("account.personalDetails.firstName.title"),
      value: user?.firstName,
    },
    {
      id: "lastName",
      title: t("account.personalDetails.lastName.title"),
      value: user?.lastName,
    },
  ];

  const personalActions = [
    {
      id: "changePassword",
      title: t("account.personalDetails.changePassword.title"),
    },
    {
      id: "deleteAccount",
      title: t("account.personalDetails.deleteAccount.title"),
    },
  ];

  return (
    <ScreenLayout isScrollable>
      <TopBar title={t("account.personalDetails.title")} />
      <List>
        <List.Inner>
          {personalDetails.map((detail, index) => (
            <List.Item
              key={detail.id}
              title={detail.title}
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
    </ScreenLayout>
  );
}
