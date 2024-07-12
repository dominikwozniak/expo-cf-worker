import { useAuth, useUser } from "@clerk/clerk-expo";

import { Button } from "~/shared-components/Button";
import { ScreenLayout } from "~/shared-components/layout/ScreenLayout";
import { Typography } from "~/shared-components/Typography";

export default function VerifyEmail() {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <ScreenLayout>
      <Button onPress={() => signOut()}>Sign out</Button>
      <Typography>{JSON.stringify(user, null, 2)}</Typography>
    </ScreenLayout>
  );
}
