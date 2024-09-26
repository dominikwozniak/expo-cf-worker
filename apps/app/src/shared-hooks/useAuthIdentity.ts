import { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import { setUser as setSentryUser} from "@sentry/react-native";

export function useSentry() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setSentryUser({
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
      });
    } else {
      setSentryUser(null);
    }
  }, [user]);
}
