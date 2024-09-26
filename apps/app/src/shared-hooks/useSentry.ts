import { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import { setUser } from "@sentry/react-native";

export function useSentry() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setUser({
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
      });
    } else {
      setUser(null);
    }
  }, [user]);
}
