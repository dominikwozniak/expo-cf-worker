import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

export function useForegroundAppAction(
  stateWillForegroundCallback?: () => void | Promise<void>,
) {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        /inactive|background/.exec(appState.current) &&
        nextAppState === "active"
      ) {
        void stateWillForegroundCallback?.();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, [stateWillForegroundCallback]);

  return { appStateVisible };
}
