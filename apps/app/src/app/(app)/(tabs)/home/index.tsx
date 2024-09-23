import { useRouter } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";

import { Button } from "~/shared-components/Button";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { Typography } from "~/shared-components/Typography";

export default function VerifyEmail() {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <ScreenLayout>
      <Button onPress={() => signOut()}>Sign out</Button>
      <Button
        onPress={() => router.push("/(utils)/app-update?required=true")}
        backgroundColor="alternative"
        textColor="alternative"
        className="mt-2"
      >
        App Update
      </Button>
      <Button
        onPress={() => router.push("/(onboarding)/")}
        backgroundColor="alternative"
        textColor="alternative"
        className="mt-2"
      >
        Onboarding
      </Button>
      <Typography>{JSON.stringify(user, null, 2)}</Typography>
    </ScreenLayout>
  );
}
