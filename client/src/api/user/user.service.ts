import axios, { AxiosResponse } from "axios";
import axiosClient, { throwErrorMessage } from "../client";

export type UserData = {
  userId: string;
  email: string;
  password: string;
  candidatePassword: string;
  name: string;
  lastname: string;
};

export async function getUserData(userId: string) {
  try {
    const { data } = await axiosClient.get(`/user/${userId}`);
    return data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

export async function editUserData(
  userId: string,
  { lastname, name }: Pick<UserData, "lastname" | "name">
) {
  try {
    const { data } = await axiosClient.put(`/user/${userId}`, {
      lastname,
      name,
    });
    return data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

export async function editUserPassword(
  userId: string,
  {
    password,
    candidatePassword,
  }: Pick<UserData, "password" | "candidatePassword">
) {
  try {
    const { data, status }: AxiosResponse = await axiosClient.put(
      `/userPassword/${userId}`,
      {
        password,
        candidatePassword,
      }
    );
    if (status === 200) return data;
    throw new Error(data.message);
  } catch (error) {
    throwErrorMessage(error);
  }
}
