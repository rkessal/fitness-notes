import prisma from "../../utils/prisma";
import {
  CreateSetInput,
  DeleteSetInput,
  EditSetInput,
  GetSetByIdInput,
  GetSetsInput,
} from "./set.dto";

export async function createSet(input: CreateSetInput["body"]) {
  return prisma.set.create({
    data: {
      weight: input.weight,
      reps: input.reps,
      Exercise: {
        connect: {
          id: input.exerciseId,
        },
      },
      User: {
        connect: {
          id: input.userId,
        },
      },
    },
    include: {
      Exercise: true,
      User: true,
    },
  });
}

export async function findSets(input: GetSetsInput) {
  return prisma.set.findMany({
    where: {
      userId: input.query.userId,
    },
    include: {
      Exercise: true,
    },
  });
}

export async function findSetsByExerciseId(input: GetSetsInput) {
  return prisma.set.findMany({
    where: {
      userId: input.query.userId,
      exerciseId: input.query.exerciseId,
    },
    include: {
      Exercise: true,
    },
  });
}

export async function findSetById(input: GetSetByIdInput["params"]) {
  return prisma.set.findUnique({
    where: {
      id: input.setId,
    },
    include: {
      Exercise: true,
    },
  });
}

export async function editSet(input: EditSetInput) {
  return prisma.set.update({
    where: {
      id: input.params.setId,
    },
    data: {
      weight: input.body.weight,
      reps: input.body.reps,
    },
  });
}

export async function deleteSet(input: DeleteSetInput["params"]) {
  return prisma.set.delete({
    where: {
      id: input.setId,
    },
  });
}
