import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

import { UserInfoCard } from "~/modules/account/components/UserInfoCard";
import {
  DocumentIcon,
  LogoutIcon,
  MessageIcon,
  PencilIcon,
  QuestionIcon,
  SettingsIcon,
  ShieldIcon,
  StarFillIcon,
  UserIcon,
} from "~/shared-components/icons";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { List } from "~/shared-components/list";
import { Typography } from "~/shared-components/Typography";
import { i18n } from "~/utils/i18n";

const personalOptions = [
  {
    id: "personal-details",
    icon: UserIcon,
    title: i18n.t("account.accountScreen.personal.items.personal-details.title"),
    href: "/(app)/home",
  },
  {
    id: "settings",
    icon: SettingsIcon,
    title: i18n.t("account.accountScreen.personal.items.preferences.title"),
    href: "/(app)/account/preferences",
  },
  {
    id: "support",
    icon: MessageIcon,
    title: i18n.t("account.accountScreen.personal.items.support.title"),
    href: "/(app)/home",
  },
];

const aboutOptions = [
  {
    id: "faqs",
    icon: QuestionIcon,
    title: i18n.t("account.accountScreen.about.items.faqs.title"),
    href: "https://instagram.com",
  },
  {
    id: "review",
    icon: PencilIcon,
    title: i18n.t("account.accountScreen.about.items.review.title"),
    href: "https://www.example.com/review",
  },
];

const legalOptions = [
  {
    id: "terms",
    icon: DocumentIcon,
    title: i18n.t("account.accountScreen.legal.items.terms.title"),
    href: "https://www.example.com/terms-of-service",
  },
  {
    id: "privacy",
    icon: ShieldIcon,
    title: i18n.t("account.accountScreen.legal.items.privacy.title"),
    href: "https://www.example.com/privacy-policy",
  },
];

const logoutOptions = [
  {
    id: "logout",
    icon: LogoutIcon,
    title: i18n.t("account.accountScreen.logout.button"),
  },
];

export default function AccountScreen() {
  const router = useRouter();
  const { signOut } = useAuth();

  return (
    <ScreenLayout isScrollable>
      <Typography variant="header" weight="semiBold" color="primary">
        {i18n.t("account.accountScreen.title")}
      </Typography>
      <UserInfoCard />
      <List className="mt-4">
        <List.Inner isAccent>
          <List.Item
            icon={StarFillIcon}
            title={i18n.t("account.accountScreen.premium.button")}
            onPress={() => router.push("/(app)/home")}
            isAccent
            isTouchable
            isLastItem
          />
        </List.Inner>
      </List>
      <List className="mt-2">
        <List.Label>
          {i18n.t("account.accountScreen.personal.title")}
        </List.Label>
        <List.Inner>
          {personalOptions.map((option, index) => (
            <List.Item
              key={option.id}
              icon={option.icon}
              title={option.title}
              href={option.href}
              isTouchable
              isLastItem={index === personalOptions.length - 1}
            />
          ))}
        </List.Inner>
      </List>
      <List className="mt-2">
        <List.Label>{i18n.t("account.accountScreen.about.title")}</List.Label>
        <List.Inner>
          {aboutOptions.map((option, index) => (
            <List.Item
              key={option.id}
              icon={option.icon}
              title={option.title}
              href={option.href}
              isTouchable
              isLastItem={index === aboutOptions.length - 1}
            />
          ))}
        </List.Inner>
      </List>
      <List className="mt-2">
        <List.Label>{i18n.t("account.accountScreen.legal.title")}</List.Label>
        <List.Inner>
          {legalOptions.map((option, index) => (
            <List.Item
              key={option.id}
              icon={option.icon}
              title={option.title}
              href={option.href}
              isTouchable
              isLastItem={index === legalOptions.length - 1}
            />
          ))}
        </List.Inner>
      </List>
      <List className="mt-2">
        <List.Inner>
          {logoutOptions.map((option) => (
            <List.Item
              key={option.id}
              icon={option.icon}
              title={option.title}
              onPress={() => signOut()}
              isTouchable
              isLastItem
            />
          ))}
        </List.Inner>
      </List>
    </ScreenLayout>
  );
}
