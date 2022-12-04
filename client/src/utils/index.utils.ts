import type { ToastType } from "react-native-toast-notifications";

export const BRAND_COLOR = "#2274A5";
export const BASE_URL = "http://localhost:1337/api";

export const showToast = (
  toast: ToastType,
  type: "normal" | "success" | "warning" | "danger" | "custom",
  message: string
) => {
  toast.show(message, {
    type: type,
  });
};