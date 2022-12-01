import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../utils/index.utils";

export type UserData = {
  userId: string;
  email: string;
  password: string;
  candidatePassword: string;
  name: string;
  lastname: string;
};

export async function editUser(
  userId: string,
  data: Pick<UserData, "lastname" | "name">
) {
  try {
    const user = await axios.put(`${BASE_URL}/user/${userId}`, { ...data });
    return user.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
}

export async function getUserData(userId: string) {
  try {
    const userData = await axios.get(`${BASE_URL}/user/${userId}`);
    return userData.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
}

export async function editUserPassword(
  userId: string,
  data: Pick<UserData, "password" | "candidatePassword">
) {
  try {
    const response = await axios.put(`${BASE_URL}/userPassword/${userId}`, {
      ...data,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
}
