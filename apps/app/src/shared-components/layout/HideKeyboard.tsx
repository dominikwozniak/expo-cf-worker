import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

// TODO: fix this component
export const HideKeyboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      {children}
    </KeyboardAvoidingView>
  );
};
