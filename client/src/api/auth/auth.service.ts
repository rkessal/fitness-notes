import axiosClient, { throwErrorMessage } from "../client";

export interface LoginData {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginData) {
  try {
    const { data } = await axiosClient.post("/session", {
      email: email,
      candidatePassword: password,
    });
    return data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

export async function register({ email, password }: LoginData) {
  try {
    const { data } = await axiosClient.post("/user", {
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

export async function logout() {
  try {
    const { data } = await axiosClient.delete("/session");
    return data;
  } catch (error) {
    if (error) {
      throwErrorMessage(error);
    }
  }
}

export async function getUserSession() {
  try {
    const { data } = await axiosClient.get("/session");
    return data;
  } catch (error) {
    console.log(error);
    throwErrorMessage(error);
  }
}
