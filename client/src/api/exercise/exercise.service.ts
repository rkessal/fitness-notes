import { CustomExercisePayload } from "../../types/types";
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

export async function addExerciseToWorkout(exerciseId: string, userId: string) {
  try {
    const { data } = await axiosClient.post(`/exercise/${exerciseId}/add`, {
      userId,
    });
    return data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

export async function createCustomExercise(payload: CustomExercisePayload) {
  try {
    const { data } = await axiosClient.post(`/exercise`, {
      ...payload,
    });
    return data;
  } catch (error) {
    throwErrorMessage(error);
  }
}
