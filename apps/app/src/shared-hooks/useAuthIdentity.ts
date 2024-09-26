import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { setUser as setSentryUser } from "@sentry/react-native";
import { usePostHog } from "posthog-react-native";

export function useAuthIdentity() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const posthog = usePostHog();

  useEffect(() => {
    if (user) {
      setSentryUser({
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        name: user.fullName,
      });
      posthog.identify(user.id, {
        email: user.emailAddresses[0]?.emailAddress,
        name: user.fullName,
      });
    } else if (!isSignedIn) {
      setSentryUser(null);
      posthog.reset();
    }
  }, [isSignedIn, user]);
}
