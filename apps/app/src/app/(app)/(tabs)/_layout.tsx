import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";

import { HomeIcon, UserIcon } from "~/shared-components/icons";
import { useColor } from "~/shared-hooks/useColor";

export default function TabLayout() {
  const { t } = useTranslation();
  const { secondary: secondaryColor, light: lightColor } = useColor();

  const tabBarLabelStyle = {
    paddingTop: 12,
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: secondaryColor,
        tabBarStyle: {
          height: 84,
          paddingTop: 16,
          paddingLeft: 12,
          paddingRight: 12,
          backgroundColor: lightColor,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t("common.tabs.home"),
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          tabBarLabelStyle,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: t("common.tabs.account"),
          tabBarIcon: ({ color }) => (
            <UserIcon color={color} strokeWidth={3} width={26} height={26} />
          ),
          tabBarLabelStyle,
        }}
      />
    </Tabs>
  );
}
