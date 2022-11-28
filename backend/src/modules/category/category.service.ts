import prisma from "../../utils/prisma";
import {
  CreateExerciseCategoryType,
  DeleteExerciseCategoryType,
  EditExerciseCategoryType,
  GetExerciseCategoryByIdType,
  GetExerciseCategoryType,
} from "./category.dto";

export async function createExerciseCategory(
  input: CreateExerciseCategoryType["body"]
) {
  return prisma.exerciseCategory.create({
    data: {
      name: input.name,
      image: input.image,
    },
  });
}

export async function findExerciseCategoryById(
  input: GetExerciseCategoryByIdType["params"]
) {
  console.log(input.id);
  return prisma.exerciseCategory.findUnique({
    where: {
      id: input.id,
    },
    include: {
      exercises: true,
    },
  });
}

export async function findExerciseCategories() {
  return prisma.exerciseCategory.findMany({
    include: {
      exercises: true,
    },
  });
}

export async function editExerciseCategory(input: EditExerciseCategoryType) {
  return prisma.exerciseCategory.update({
    where: {
      id: input.params.id,
    },
    data: {
      name: input.body.name,
      image: input.body.image,
    },
  });
}

export async function deleteExerciseCategory(
  input: DeleteExerciseCategoryType["params"]
) {
  return prisma.exerciseCategory.delete({
    where: {
      id: input.id,
    },
  });
}
