import prisma from "../../utils/prisma";
import axios from "axios";
import {
  AddExerciseToWorkoutInput,
  CreateExerciseInput,
  DeleteExerciseInput,
  EditExerciseInput,
  GetExerciseByIdInput,
  GetExerciseInput,
} from "./exercise.dto";
import sanitizedConfig from "../../../config/config";

export async function createExercise(input: CreateExerciseInput["body"]) {
  return prisma.exercise.createMany({
    data: {
      ...input,
    },
  });
}

export async function findExerciseById(input: GetExerciseByIdInput["params"]) {
  return prisma.exercise.findUnique({
    where: {
      id: input.id,
    },
    include: {
      users: {
        select: {
          id: true,
          email: true,
          name: true,
          lastname: true,
        },
      },
    },
  });
}

export async function findExercises() {
  const response = await axios({
    url: `https://exercisedb.p.rapidapi.com/exercises`,
    method: "get",
    timeout: 8000,
    headers: {
      "X-RapidAPI-Key": sanitizedConfig.RAPIDAPIKEY,
      "X-RapidAPI-Host": sanitizedConfig.RAPIDAPIHOST,
    },
  });

  return response.data;
}

export async function editExercise(input: EditExerciseInput) {
  return prisma.exercise.update({
    where: {
      id: input.params.id,
    },
    data: input.body,
  });
}

export async function deleteExercise(input: DeleteExerciseInput["params"]) {
  return prisma.exercise.delete({
    where: {
      id: input.id,
    },
  });
}

export async function addExerciseToWorkout(input: AddExerciseToWorkoutInput) {
  return prisma.exercise.update({
    where: {
      id: input.params.id,
    },
    data: {
      users: {
        connect: {
          id: input.body.userId,
        },
      },
    },
  });
}

export async function findExercisesByUserId(input: GetExerciseInput) {
  return prisma.user.findMany({
    where: {
      id: input.query?.userId,
    },
    select: {
      exercises: true,
    },
  });
}

export async function findExerciseByIdFromApi(
  input: GetExerciseByIdInput["params"]
) {
  const response = await axios({
    url: `https://exercisedb.p.rapidapi.com/exercises/exercise/${input.id}`,
    method: "get",
    timeout: 8000,
    headers: {
      "X-RapidAPI-Key": sanitizedConfig.RAPIDAPIKEY,
      "X-RapidAPI-Host": sanitizedConfig.RAPIDAPIHOST,
    },
  });

  return response.data;
}
