import { Platform } from "react-native";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useAuth, useOAuth as useOAuthClerk } from "@clerk/clerk-expo";
import { useTranslation } from "react-i18next";

import { useGlobalStore } from "~/shared-hooks/useGlobalStore";
import { useWarmUpBrowser } from "~/shared-hooks/utils/useWarmUpBrowser";
import { MMKV_ONBOARDING_COMPLETE, mmkvStore } from "~/utils/mmkv-store";
import { errorToast } from "~/utils/toast";

WebBrowser.maybeCompleteAuthSession();

export type OAuthStrategy = "oauth_facebook" | "oauth_google" | "oauth_apple";

export const useOAuth = () => {
  useWarmUpBrowser();

  const router = useRouter();
  const { isLoaded } = useAuth();
  const { t } = useTranslation();
  const setLoading = useGlobalStore((state) => state.setLoading);

  const { startOAuthFlow: startOAuthFlowApple } = useOAuthClerk({
    strategy: "oauth_apple",
  });
  const { startOAuthFlow: startOAuthFlowGoogle } = useOAuthClerk({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startOAuthFlowFacebook } = useOAuthClerk({
    strategy: "oauth_facebook",
  });

  // TODO: check if needed -> copied from v1
  // useEffect(() => {
  //   const checkUserRoute = async () => {
  //     if (isSignedIn && isLoaded) {
  //       setLoading(true)
  //       await refetchUser()
  //     }
  //   }
  //   checkUserRoute()
  // }, [isSignedIn, isLoaded])

  const handleOAuth = async (strategy: OAuthStrategy) => {
    if (!isLoaded) {
      return;
    }

    try {
      setLoading(true);
      const startOAuthFlow = {
        oauth_apple: startOAuthFlowApple,
        oauth_google: startOAuthFlowGoogle,
        oauth_facebook: startOAuthFlowFacebook,
      }[strategy];

      if (Platform.OS !== "ios" && strategy === "oauth_apple") {
        throw new Error("Apple OAuth is only supported on iOS");
      }

      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId && setActive) {
        void setActive({ session: createdSessionId });
        const isUserOnboarded = mmkvStore.getBoolean(MMKV_ONBOARDING_COMPLETE);
        router.replace(
          isUserOnboarded ? "/(app)/(tabs)/home" : "/(onboarding)",
        );
      } else {
        throw new Error("OAuth flow failed");
      }
    } catch {
      errorToast({
        title: t("common.error.oauth.title"),
        message: t("common.error.oauth.message"),
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoaded,
    handleOAuth,
  };
};
