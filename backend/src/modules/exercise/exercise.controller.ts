import { Request, Response } from "express";
import logger from "../../utils/logger";
import { findExerciseCategoryById } from "../category/category.service";
import { findUser, findUserById } from "../user/user.service";
import {
  CreateExerciseInput,
  DeleteExerciseInput,
  EditExerciseInput,
  GetExerciseByIdInput,
  GetExerciseInput,
} from "./exercise.dto";
import {
  createExercise,
  findExercises,
  findExerciseById,
  findCreatedExercisesByUserId,
  deleteExercise,
  editExercise,
} from "./exercise.service";

export async function createExerciseHandler(
  req: Request<{}, {}, CreateExerciseInput["body"]>,
  res: Response
) {
  try {
    const category = await findExerciseCategoryById({
      id: req.body.categoryId,
    });
    if (category) {
      const exercise = await createExercise({
        ...req.body,
        userId: req.session.userId,
      });
      return res.send(exercise);
    }
    return res.status(404).send({ message: "Category not found" });
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error);
  }
}

export async function getExerciseHandler(
  req: Request<{}, {}, {}, GetExerciseInput["query"]>,
  res: Response
) {
  try {
    if (req.query?.userId) {
      const user = await findUserById({ userId: req.query.userId });
      if (user) {
        const exercise = await findCreatedExercisesByUserId(req.query);
        if (exercise) {
          return res.send(exercise);
        }
      }
      return res.status(404).send({ message: "User not found" });
    }

    const exercises = await findExercises();
    return res.send(exercises);
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

export async function getExerciseByIdHandler(
  req: Request<GetExerciseByIdInput["params"]>,
  res: Response
) {
  try {
    const exercise = await findExerciseById(req.params);
    if (exercise) {
      return res.send(exercise);
    }
    return res.status(404).send({ message: "Exercise not found" });
  } catch (error) {}
}

export async function editExerciseHandler(
  req: Request<EditExerciseInput["params"], {}, EditExerciseInput["body"]>,
  res: Response
) {
  try {
    const exercise = await findExerciseById(req.params);
    if (exercise) {
      if (exercise.userId === req.session.userId) {
        const response = await editExercise(req);
        return res.send(response);
      }
      return res.status(403).send({ message: "Invalid credentials" });
    }
    return res.status(404).send({ message: "Exercise not found" });
  } catch (error: any) {
    console.log(error);
    res.status(409).send(error.message);
  }
}

export async function deleteExerciseHandler(
  req: Request<DeleteExerciseInput["params"]>,
  res: Response
) {
  try {
    const exercise = await findExerciseById(req.params);
    if (exercise) {
      if (exercise.userId === req.session.userId) {
        const response = await deleteExercise(req.params);
        return res.send(response);
      }
      return res.status(403).send({ message: "Invalid credentials" });
    }
    return res.status(404).send({ message: "Exercise not found" });
  } catch (error: any) {
    res.status(409).send(error.message);
  }
}
