import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "expo-router";

export function useRouterLoadedAction(callback?: () => void | Promise<void>) {
  const loaded = useRef(false);
  const [isRouterLoaded, setIsRouterLoaded] = useState(loaded.current);

  const navigation = useNavigation();

  const stateSubscriptionCallback = useCallback(() => {
    if (!loaded.current) {
      void callback?.();
      loaded.current = true;
      setIsRouterLoaded(true);

      // Remove the listener after the first load
      navigation.removeListener("state", stateSubscriptionCallback);
    }
  }, [callback, navigation]);

  useEffect(() => {
    navigation.addListener("state", stateSubscriptionCallback);

    return () => {
      navigation.removeListener("state", stateSubscriptionCallback);
    };
  }, [navigation, stateSubscriptionCallback]);

  return { isRouterLoaded };
}
