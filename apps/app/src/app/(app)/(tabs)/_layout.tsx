import { Tabs } from "expo-router";

import { HomeIcon, UserIcon } from "~/shared-components/icons";
import { useColor } from "~/shared-hooks/useColor";
import { i18n } from "~/utils/i18n";

export default function TabLayout() {
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
          title: i18n.t("common.tabs.home"),
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          tabBarLabelStyle,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: i18n.t("common.tabs.account"),
          tabBarIcon: ({ color }) => (
            <UserIcon color={color} strokeWidth={3} width={26} height={26} />
          ),
          tabBarLabelStyle,
        }}
      />
    </Tabs>
  );
}
