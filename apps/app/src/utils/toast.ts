import { toast } from "sonner-native";

interface ToastOptions {
  title: string;
  message?: string;
}

const styles = {
  title: {
    fontSize: 18,
  },
  description: {
    fontSize: 16,
  },
};

export const successToast = ({ title, message }: ToastOptions) =>
  toast.success(title, {
    closeButton: true,
    styles,
    duration: 5000,
    ...(message ? { description: message } : {}),
  });

export const infoToast = ({ title, message }: ToastOptions) =>
  toast.info(title, {
    closeButton: true,
    styles,
    duration: 5000,
    ...(message ? { description: message } : {}),
  });

export const errorToast = ({ title, message }: ToastOptions) =>
  toast.error(title, {
    closeButton: true,
    styles,
    duration: 5000,
    ...(message ? { description: message } : {}),
  });
