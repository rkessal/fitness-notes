import axios from "axios";
import { BASE_URL } from "../../utils/index.utils";

export async function register(email: string, password: string) {
  try {
    const response = await axios.post(`${BASE_URL}/user`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
}

export async function login(email: string, password: string) {
  try {
    const response = await axios.post(`${BASE_URL}/session`, {
      email: email,
      candidatePassword: password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
}

export async function logout() {
  try {
    const response = await axios.delete(`${BASE_URL}/session`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
}
