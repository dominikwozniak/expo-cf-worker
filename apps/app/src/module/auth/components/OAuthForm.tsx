import React from "react";
import { TouchableOpacity, View } from "react-native";

import { OAuthStrategy, useOAuth } from "~/module/auth/hooks/useOAuth";
import {
  AppleIcon,
  ArrowIcon,
  FacebookIcon,
  GoogleIcon,
} from "~/shared-components/icons";
import { Typography } from "~/shared-components/Typography";
import { useColor } from "~/shared-hooks/useColor";
import { useGlobalStore } from "~/shared-hooks/useGlobalStore";

const providers = [
  {
    name: "facebook",
    oauth: "oauth_facebook",
    background: "#3b5998",
  },
  {
    name: "google",
    oauth: "oauth_google",
    background: "#fffdfd",
  },
  {
    name: "apple",
    oauth: "oauth_apple",
    background: "#000",
  },
];

export function OAuthForm() {
  const { handleOAuth, isLoaded } = useOAuth();
  const isLoading = useGlobalStore((state) => state.isLoading);
  const { light: lightColor } = useColor();

  if (!isLoaded) {
    return null;
  }

  return (
    <View className="mt-10">
      <View className="flex flex-row items-center justify-center gap-4">
        <View className="flex-1 border-t border-gray" />
        <Typography weight="semiBold">or sign in with</Typography>
        <View className="flex-1 border-t border-gray" />
      </View>
      <View className="mt-6 flex flex-row justify-center">
        {providers.map((provider, index) => (
          <TouchableOpacity
            key={provider.name}
            activeOpacity={0.7}
            disabled={isLoading}
            onPress={() => handleOAuth(provider.oauth as OAuthStrategy)}
            className="flex h-16 w-16 items-center justify-center rounded-full shadow-md"
            style={{
              backgroundColor: provider.background,
              marginHorizontal: index === 1 ? 16 : 0,
            }}
          >
            {provider.name === "apple" ? <AppleIcon /> : null}
            {provider.name === "facebook" ? <FacebookIcon /> : null}
            {provider.name === "google" ? <GoogleIcon /> : null}
          </TouchableOpacity>
        ))}
      </View>
      <ArrowIcon color={lightColor} />
    </View>
  );
}
