import axiosClient, { throwErrorMessage } from "../client";
import { Set } from "../../types/types";

export async function getExerciseSets(
  payload: Pick<Set, "userId" | "exerciseId">
) {
  try {
    const { data } = await axiosClient.get("/set", {
      params: {
        ...payload,
      },
    });
    return data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

export async function addExerciseSet(
  payload: Omit<Set, "id" | "createdAt" | "Exercise">
) {
  try {
    const { data } = await axiosClient.post("/set", {
      ...payload,
    });
    return data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

export async function editExerciseSet(
  payload: Pick<Set, "id" | "weight" | "reps">
) {
  try {
    const { data } = await axiosClient.put(`/set/${payload.id}`, {
      reps: payload.reps,
      weight: payload.weight,
    });
    return data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

export async function deleteExerciseSet(payload: Pick<Set, "id">) {
  try {
    const { data } = await axiosClient.delete(`/set/${payload.id}`);
    return data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

export async function getUserSets(payload: Pick<Set, "userId">) {
  try {
    const { data } = await axiosClient.get("/set", {
      params: {
        ...payload,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throwErrorMessage(error);
  }
}
