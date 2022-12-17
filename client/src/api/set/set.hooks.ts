import { useMutation, useQuery, UseQueryResult } from "react-query";
import { Exercise, Set } from "../../types/types";
import {
  addExerciseSet,
  editExerciseSet,
  getExerciseSets,
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
      console.log(payload);
      return await editExerciseSet(payload);
    }),
};
