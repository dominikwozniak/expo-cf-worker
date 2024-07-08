import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { SignIn } from "~/module/auth/sign-in";
import { SignUp } from "~/module/auth/sign-up";
import { Button } from "~/shared-components/Button";
import { Typography } from "~/shared-components/Typography";
import { api } from "~/utils/api";

export default function Index() {
  const postQuery = api.post.test.useQuery();

  return (
    <SafeAreaView className="bg-background">
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="bg-background h-full w-full p-4">
        <Typography variant="hero" color="primary" weight="regular">
          Hello world!
        </Typography>
        <Typography variant="regular" color="primary" weight="bold">
          DATA:
          {postQuery.data}
        </Typography>
        <Button>Test</Button>

        <SignIn />

        <SignUp />
      </View>
    </SafeAreaView>
  );
}
