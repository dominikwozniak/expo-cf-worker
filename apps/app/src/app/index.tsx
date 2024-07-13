import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function IndexScreen() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href="/(auth)" />;
  }

  return <Redirect href="/(app)/(tabs)/home" />;
}
