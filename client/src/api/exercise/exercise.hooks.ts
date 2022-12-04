import { useMutation, useQuery, UseQueryResult } from "react-query";
import { CustomExercisePayload, Exercise } from "../../types/types";
import {
  addExerciseToWorkout,
  createCustomExercise,
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

  useCreateCustomExercise: () =>
    useMutation(async (payload: CustomExercisePayload) => {
      return await createCustomExercise(payload);
    }),
};
