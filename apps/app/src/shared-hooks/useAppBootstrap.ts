import { useAuth } from "@clerk/clerk-expo";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";

import { useAppUpdate } from "~/shared-hooks/update/useAppUpdate";
import { useAuthIdentity } from "~/shared-hooks/useAuthIdentity";

export const useAppBootstrap = () => {
  const [fontsLoaded, fontLoadedError] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const { isLoaded: isClerkLoaded } = useAuth();
  const { isCheckingAppUpdate } = useAppUpdate();
  useAuthIdentity();

  const isAppReady =
    fontsLoaded && !fontLoadedError && isClerkLoaded && !isCheckingAppUpdate;

  return {
    isAppReady,
  };
};
