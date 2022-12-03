import axiosClient, { throwErrorMessage } from "../client";

export async function getExercises() {
  try {
    const { data } = await axiosClient.get("/exercise");
    return data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

export async function getExerciseById(exerciseId: string) {
  try {
    const { data } = await axiosClient.get(`/exercise/${exerciseId}`);
    return data;
  } catch (error) {
    throwErrorMessage(error);
  }
}
