import { useMutation, useQuery, UseQueryResult } from "react-query";
import { Exercise } from "../../types/types";
import {
  addExerciseToWorkout,
  getExerciseById,
  getExercises,
} from "./exercise.service";

export default {
  useGetExercises: () =>
    useQuery("getExercises", () => {
      return getExercises();
    }),

  useGetExerciseById: (exerciseId: string): UseQueryResult<Exercise> =>
    useQuery("getExerciseById", () => {
      return getExerciseById(exerciseId);
    }),

  useAddExerciseToWorkout: (exerciseId: string) =>
    useMutation(async (userId: string) => {
      return await addExerciseToWorkout(exerciseId, userId);
    }),
};
