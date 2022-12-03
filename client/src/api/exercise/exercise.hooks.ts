import { useMutation, useQuery, UseQueryResult } from "react-query";
import { Exercise } from "../../screens/types/types";
import { getExerciseById, getExercises } from "./exercise.service";

export default {
  useGetExercises: () =>
    useQuery("getExercises", () => {
      return getExercises();
    }),

  useGetExerciseById: (exerciseId: string): UseQueryResult<Exercise> =>
    useQuery("getExerciseById", () => {
      return getExerciseById(exerciseId);
    }),
};
