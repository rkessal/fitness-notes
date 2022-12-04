import { useMutation, useQuery, UseQueryResult } from "react-query";
import { Exercise, User } from "../../types/types";
import {
  editUserData,
  editUserPassword,
  getUserData,
  getUserExercises,
  UserData,
} from "./user.service";

export default {
  useGetUserData: (userId: string | undefined): UseQueryResult<UserData> =>
    useQuery("getUserData", async () => {
      if (userId) {
        return await getUserData(userId);
      }
    }),

  useEditUserData: (userId: string | undefined) =>
    useMutation(
      async ({ lastname, name }: Pick<UserData, "lastname" | "name">) => {
        if (userId) {
          return await editUserData(userId, { lastname, name });
        }
      }
    ),

  useEditUserPassword: (userId: string | undefined) =>
    useMutation(
      async ({
        password,
        candidatePassword,
      }: Pick<UserData, "password" | "candidatePassword">) => {
        if (userId) {
          return await editUserPassword(userId, {
            password,
            candidatePassword,
          });
        }
      }
    ),

  useGetUserExercises: (
    userId: string | undefined
  ): UseQueryResult<Exercise[]> =>
    useQuery("getUserExercises", () => {
      if (userId) {
        return getUserExercises(userId);
      }
    }),
};
