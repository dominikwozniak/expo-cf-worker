import { useAuth } from "@clerk/clerk-expo";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";

export const useAppBootstrap = () => {
  const [fontsLoaded, fontLoadedError] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const { isLoaded: isClerkLoaded } = useAuth();

  const isAppReady = fontsLoaded && !fontLoadedError && isClerkLoaded;

  return {
    isAppReady,
  };
};
