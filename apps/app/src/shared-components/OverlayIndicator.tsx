import React from "react";
import { ActivityIndicator, View } from "react-native";

export function OverlayLoadingIndicator({ loading }: { loading: boolean }) {
  if (!loading) {
    return null;
  }

  return (
    <View className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center bg-overlay">
      <ActivityIndicator size="large" />
    </View>
  );
}
