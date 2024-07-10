import { Tabs } from "expo-router";

import { useColor } from "~/shared-hooks/useColor";

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
          title: "Home",
          tabBarLabelStyle,
        }}
      />
    </Tabs>
  );
}
