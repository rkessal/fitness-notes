import axios from "axios";
import { BASE_URL } from "../utils/index.utils";

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

export default axiosClient;
