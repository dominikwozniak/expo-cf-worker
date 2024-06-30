import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { SignIn } from "~/module/auth/sign-in";
import { SignUp } from "~/module/auth/sign-up";
import { api } from "~/utils/api";

export default function Index() {
  const postQuery = api.post.test.useQuery();

  return (
    <SafeAreaView className="bg-background">
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="bg-background h-full w-full p-4">
        <Text className="text-foreground pb-2 text-center text-5xl font-bold">
          {postQuery.data ?? "Welcome to the app"}
        </Text>

        <SignIn />

        <SignUp />
      </View>
    </SafeAreaView>
  );
}
