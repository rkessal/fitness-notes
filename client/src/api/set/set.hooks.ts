import { useMutation, useQuery, UseQueryResult } from "react-query";
import { Exercise, Set } from "../../types/types";
import {
  addExerciseSet,
  deleteExerciseSet,
  editExerciseSet,
  getExerciseSets,
  getUserSets,
} from "./set.service";
export default {
  useGetExerciseSet: (
    payload: Pick<Set, "userId" | "exerciseId">
  ): UseQueryResult<Set[]> =>
    useQuery("getExerciseSet", async () => {
      if (payload) {
        return await getExerciseSets(payload);
      }
    }),
  useAddExerciseSet: () =>
    useMutation(async (payload: Omit<Set, "id" | "createdAt" | "Exercise">) => {
      return await addExerciseSet(payload);
    }),
  useEditExerciseSet: () =>
    useMutation(async (payload: Pick<Set, "id" | "weight" | "reps">) => {
      return await editExerciseSet(payload);
    }),
  useDeleteExerciseSet: () =>
    useMutation(async (payload: Pick<Set, "id">) => {
      return await deleteExerciseSet(payload);
    }),
  useGetUserSets: (payload: Pick<Set, "userId">): UseQueryResult<Set[]> =>
    useQuery("getUserSet", async () => {
      if (payload) {
        return await getUserSets(payload);
      }
    }),
};
