import { createContext, useContext } from "react";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";

type AlertContextData = ReturnType<typeof useProvideAlert>;
export const AlertContext = createContext<AlertContextData>(
  {} as AlertContextData,
);

interface ShowAlert {
  title: string;
  message?: string;
  onDismiss?: () => void;
  textDismiss?: string;
}

interface ShowConfirmAlert extends ShowAlert {
  onConfirm: () => void | Promise<void>;
  textConfirm?: string;
}

export const useProvideAlert = () => {
  const { t } = useTranslation();

  const showAlert = ({ title, message, onDismiss, textDismiss }: ShowAlert) => {
    Alert.alert(title, message, [
      {
        text: textDismiss ?? t("common.alert.confirm"),
        onPress: () => onDismiss?.(),
      },
    ]);
  };

  const showConfirmAlert = ({
    title,
    message,
    onDismiss,
    textDismiss,
    onConfirm,
    textConfirm,
  }: ShowConfirmAlert) => {
    Alert.alert(title, message, [
      {
        text: textDismiss ?? t("common.alert.cancel"),
        onPress: () => onDismiss?.(),
        style: "destructive",
      },
      {
        text: textConfirm ?? t("common.alert.confirm"),
        onPress: () => {
          void onConfirm();
        },
      },
    ]);
  };

  return { showAlert, showConfirmAlert };
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!Object.keys(context).length) {
    throw new Error("useAlert must be used within a AlertProvider");
  }

  return context;
};
