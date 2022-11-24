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
    },
    include: {
      Exercise: true,
    },
  });
}

export async function findSets(input: GetSetsInput["query"]) {
  return prisma.set.findMany({
    where: {
      exerciseId: input.exerciseId,
    },
    include: {
      Exercise: true,
    },
  });
}

export async function findSetById(input: GetSetByIdInput["query"]) {
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
      id: input.query.setId,
    },
    data: {
      weight: input.body.weight,
      reps: input.body.reps,
    },
  });
}

export async function deleteSet(input: DeleteSetInput["query"]) {
  return prisma.set.delete({
    where: {
      id: input.setId,
    },
  });
}
