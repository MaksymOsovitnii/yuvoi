import { writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";

export type ToastVariant = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

const createToastStore = () => {
  const { subscribe, update } = writable<Toast[]>([]);

  return {
    subscribe,
    add: (toast: Omit<Toast, "id">) => {
      const id = uuidv4();
      const newToast: Toast = {
        ...toast,
        id,
        duration: toast.duration ?? 3000,
      };

      update((toasts) => [...toasts, newToast]);

      // Auto remove after duration
      const duration = newToast.duration ?? 3000;
      if (duration > 0) {
        setTimeout(() => {
          update((toasts) => toasts.filter((t) => t.id !== id));
        }, duration);
      }

      return id;
    },
    remove: (id: string) => {
      update((toasts) => toasts.filter((t) => t.id !== id));
    },
    clear: () => {
      update(() => []);
    },
  };
};

export const toastStore = createToastStore();
