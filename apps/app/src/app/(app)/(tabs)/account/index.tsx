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

const personalOptions = [
  {
    id: "personal-details",
    icon: UserIcon,
    title: "Personal Details",
    href: "/(app)/home",
  },
  {
    id: "settings",
    icon: SettingsIcon,
    title: "Preferences",
    href: "/(app)/account/preferences",
  },
  {
    id: "support",
    icon: MessageIcon,
    title: "Support",
    href: "/(app)/home",
  },
];

const aboutOptions = [
  {
    id: "faqs",
    icon: QuestionIcon,
    title: "FAQ's",
    href: "https://instagram.com",
  },
  {
    id: "review",
    icon: PencilIcon,
    title: "Write a Review",
    href: "https://www.example.com/review",
  },
];

const legalOptions = [
  {
    id: "terms",
    icon: DocumentIcon,
    title: "Terms of Service",
    href: "https://www.example.com/terms-of-service",
  },
  {
    id: "privacy",
    icon: ShieldIcon,
    title: "Privacy Policy",
    href: "https://www.example.com/privacy-policy",
  },
];

const logoutOptions = [
  {
    id: "logout",
    icon: LogoutIcon,
    title: "Log out",
  },
];

export default function AccountScreen() {
  const router = useRouter();
  const { signOut } = useAuth();

  return (
    <ScreenLayout isScrollable>
      <Typography variant="header" weight="semiBold" color="primary">
        My Account
      </Typography>
      <UserInfoCard />
      <List className="mt-4">
        <List.Inner isAccent>
          <List.Item
            icon={StarFillIcon}
            title={"Active premium"}
            onPress={() => router.push("/(app)/home")}
            isAccent
            isTouchable
            isLastItem
          />
        </List.Inner>
      </List>
      <List className="mt-2">
        <List.Label>Personal</List.Label>
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
        <List.Label>About Us</List.Label>
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
        <List.Label>Legal</List.Label>
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
