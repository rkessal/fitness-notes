import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/index.utils";

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

export const throwErrorMessage = (error: any) => {
  if (axios.isAxiosError(error)) {
    throw (
      error.response?.data.message || error.response?.data.issues[0].message
    );
  }
};

export default axiosClient;
