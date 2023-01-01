import { useMutation, useQuery, UseQueryResult } from "react-query";
import { CustomExercisePayload, Exercise } from "../../types/types";
import {
  addExerciseToWorkout,
  createCustomExercise,
  getExerciseById,
  getExercises,
} from "./exercise.service";

export default {
  useGetExercises: (): UseQueryResult<Exercise[]> =>
    useQuery("getExercises", () => {
      return getExercises();
    }),

  useGetExerciseById: (exerciseId: string): UseQueryResult<Exercise> =>
    useQuery("getExerciseById", () => {
      return getExerciseById(exerciseId);
    }),

  useAddExerciseToWorkout: () =>
    useMutation(async (payload: { exerciseId: string; userId: string }) => {
      return await addExerciseToWorkout(payload.exerciseId, payload.userId);
    }),

  useCreateCustomExercise: () =>
    useMutation(async (payload: CustomExercisePayload) => {
      return await createCustomExercise(payload);
    }),
};
