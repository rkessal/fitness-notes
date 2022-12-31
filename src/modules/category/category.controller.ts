import { Request, Response } from "express";
import {
  CreateExerciseCategoryType,
  DeleteExerciseCategoryType,
  EditExerciseCategoryType,
  GetExerciseCategoryByIdType,
  GetExerciseCategoryType,
} from "./category.dto";
import {
  createExerciseCategory,
  deleteExerciseCategory,
  editExerciseCategory,
  findExerciseCategories,
  findExerciseCategoryById,
} from "./category.service";

export async function createExerciseCategoryHandler(
  req: Request<{}, {}, CreateExerciseCategoryType["body"]>,
  res: Response
) {
  try {
    const category = await createExerciseCategory(req.body);
    return res.send(category);
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

export async function getExerciseCategoryHandler(
  req: Request<{}, {}, {}, GetExerciseCategoryType["query"]>,
  res: Response
) {
  try {
    const categories = await findExerciseCategories();
    return res.send(categories);
  } catch (error: any) {
    res.status(409).send(error.message);
  }
}

export async function getExerciseCategoryByIdHandler(
  req: Request<GetExerciseCategoryByIdType["params"]>,
  res: Response
) {
  try {
    const category = await findExerciseCategoryById(req.params);
    if (category) {
      return res.send(category);
    }
    return res.status(404).send({ message: "Category not found" });
  } catch (error: any) {
    res.status(409).send(error.message);
  }
}

export async function editExerciseCategoryHandler(
  req: Request<
    EditExerciseCategoryType["params"],
    {},
    EditExerciseCategoryType["body"]
  >,
  res: Response
) {
  try {
    const category = await findExerciseCategoryById(req.params);
    if (category) {
      const response = await editExerciseCategory(req);
      return res.send(response);
    }
    return res.status(404).send({ message: "Category not found" });
  } catch (error: any) {
    res.status(409).send(error.message);
  }
}

export async function deleteExerciseCategoryHandler(
  req: Request<DeleteExerciseCategoryType["params"], {}, {}>,
  res: Response
) {
  try {
    const category = await findExerciseCategoryById(req.params);
    if (category) {
      const response = await deleteExerciseCategory(req.params);
      return res.send(response);
    }
    return res.status(404).send({ message: "Category not found" });
  } catch (error: any) {
    res.status(409).send(error.message);
  }
}
