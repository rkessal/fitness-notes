import type { ToastType } from "react-native-toast-notifications";

export const BRAND_COLOR = "#2274A5";
export const BASE_URL = "https://fitness-notes-production.up.railway.app/api";

export const showToast = (
  toast: ToastType,
  type: "normal" | "success" | "warning" | "danger" | "custom",
  message: string
) => {
  toast.show(message, {
    type: type,
    style: {
      width: "100%",
      paddingVertical: 20,
      borderRadius: 16,
    },
    textStyle: {
      fontWeight: "700",
      marginLeft: "auto",
      marginRight: "auto",
    },
    duration: 1000,
  });
};
