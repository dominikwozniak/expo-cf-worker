import { createContext, useContext } from "react";
import { Alert } from "react-native";

type AlertContextData = ReturnType<typeof useProvideAlert>;
export const AlertContext = createContext<AlertContextData>(
  {} as AlertContextData,
);

interface ShowAlert {
  title: string;
  message?: string;
  onDismiss?: () => void;
  buttonText?: string;
}

export const useProvideAlert = () => {
  const showAlert = ({ title, message, onDismiss, buttonText }: ShowAlert) => {
    Alert.alert(title, message, [
      { text: buttonText ?? "OK", onPress: onDismiss },
    ]);
  };

  return { showAlert };
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!Object.keys(context).length) {
    throw new Error("useAlert must be used within a AlertProvider");
  }

  return context;
};
