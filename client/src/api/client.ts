import axios from "axios";
import { signout } from "../redux/slices/authSlice";
import { store } from "../redux/store";
import { BASE_URL } from "../utils/index.utils";

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

export const throwErrorMessage = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      store.dispatch(signout());
    }
    throw (
      error.response?.data ||
      error.response?.data.message ||
      error.response?.data.issues[0].message
    );
  }
};

export default axiosClient;
