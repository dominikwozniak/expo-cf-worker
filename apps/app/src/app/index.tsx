import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { api } from "~/utils/api";

export default function Index() {
  const postQuery = api.post.test.useQuery();

  return (
    <SafeAreaView className="bg-background">
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full bg-background p-4">
        <Text className="pb-2 text-center text-5xl font-bold text-foreground">
          RN + CF
          {postQuery.isLoading ? "..." : postQuery.data}
        </Text>
      </View>
    </SafeAreaView>
  );
}
