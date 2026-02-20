import { toastStore, type ToastVariant } from "./toast-store.js";

export const toast = (message: string, variant: ToastVariant = "info", duration?: number) => {
  return toastStore.add({ message, variant, duration });
};

export const toastSuccess = (message: string, duration?: number) => {
  return toast(message, "success", duration);
};

export const toastError = (message: string, duration?: number) => {
  return toast(message, "error", duration ?? 7000);
};

export const toastInfo = (message: string, duration?: number) => {
  return toast(message, "info", duration);
};

export const toastWarning = (message: string, duration?: number) => {
  return toast(message, "warning", duration);
};
