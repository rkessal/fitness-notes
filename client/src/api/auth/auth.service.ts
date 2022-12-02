import axiosClient, { throwErrorMessage } from "../client";
import axios from "axios";

export interface LoginData {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginData) => {
  try {
    const { data } = await axiosClient.post("/session", {
      email: email,
      candidatePassword: password,
    });
    return data;
  } catch (error) {
    throwErrorMessage(error);
  }
};

export const register = async ({ email, password }: LoginData) => {
  try {
    const { data } = await axiosClient.post("/user", {
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    throwErrorMessage(error);
  }
};

export const logout = async () => {
  try {
    const { data } = await axiosClient.delete("/session");
    return data;
  } catch (error) {
    if (error) {
      throwErrorMessage(error);
    }
  }
};
