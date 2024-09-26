import * as SecureStore from "expo-secure-store";
import { captureException } from "@sentry/react-native";

export const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);

      if (!item) {
        return null;
      }

      return item;
    } catch (error) {
      captureException(new Error("SecureStore get item error"), {
        extra: { error },
      });
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch {
      return;
    }
  },
};
