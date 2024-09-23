import React from "react";
import { useTranslation } from "react-i18next";

import { List } from "~/shared-components/list";
import { Typography } from "~/shared-components/Typography";

// TODO: implement during notifications feature
// TODO: move to separate module
export function NotificationSettings() {
  const { t } = useTranslation();

  return (
    <List className="mt-4">
      <List.Inner>
        <List.Item title={"Reminders"} isChevronHidden>
          <Typography variant="small" color="primary">
            {t("notifications.pushNotifications.title")}
          </Typography>
        </List.Item>
        <List.Item title={"Special Offers"} isChevronHidden isLastItem>
          <Typography variant="small" color="primary">
            {t("notifications.dailyReminder.title")}
          </Typography>
        </List.Item>
      </List.Inner>
    </List>
  );
}
