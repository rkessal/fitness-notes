import prisma from "../../utils/prisma";
import {
  CreateExerciseInput,
  DeleteExerciseInput,
  EditExerciseInput,
  GetExerciseByIdInput,
  GetExerciseInput,
} from "./exercise.dto";

export async function createExercise(input: CreateExerciseInput["body"]) {
  return prisma.exercise.create({
    data: {
      name: input.name,
      description: input.description,
      image: input.image,
      createdBy: {
        connect: {
          id: input.userId,
        },
      },
      users: {
        connect: {
          id: input.userId,
        },
      },
      categories: {
        connect: {
          id: input.categoryId,
        },
      },
    },
  });
}

export async function findExerciseById(input: GetExerciseByIdInput["query"]) {
  console.log("HELLO: ", input);
  return prisma.exercise.findUnique({
    where: {
      id: input.id,
    },
    include: {
      users: true,
      categories: true,
    },
  });
}

export async function findCreatedExercisesByUserId(
  input: GetExerciseInput["query"]
) {
  console.log(input);
  return prisma.exercise.findMany({
    where: {
      userId: input.userId,
    },
    include: {
      users: true,
      categories: true,
    },
  });
}

export async function findExercises() {
  return prisma.exercise.findMany({
    include: {
      users: true,
      categories: true,
    },
  });
}

export async function editExercise(input: EditExerciseInput) {
  return prisma.exercise.update({
    where: {
      id: input.query.id,
    },
    data: input.body,
  });
}

export async function deleteExercise(input: DeleteExerciseInput["query"]) {
  return prisma.exercise.delete({
    where: {
      id: input.id,
    },
  });
}
