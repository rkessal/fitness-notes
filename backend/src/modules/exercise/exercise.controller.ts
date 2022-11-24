import { Request, Response } from "express";
import logger from "../../utils/logger";
import { findUser } from "../user/user.service";
import {
  CreateExerciseInput,
  DeleteExerciseInput,
  EditExerciseInput,
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
    const exercise = await createExercise({
      ...req.body,
      userId: req.session.userId,
    });
    return res.send(exercise);
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
    if (req.query.id) {
      const exercise = await findExerciseById(req.query);
      if (exercise) {
        return res.send(exercise);
      }
      return res.status(404).send({ message: "Exercise not found" });
    }
    if (req.query.userId) {
      const exercise = await findCreatedExercisesByUserId(req.query);
      if (exercise) {
        return res.send(exercise);
      }
      return res.status(404).send({ message: "User not found" });
    }

    const exercises = await findExercises();
    return res.send(exercises);
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

export async function editExerciseHandler(
  req: Request<{}, {}, EditExerciseInput["body"], EditExerciseInput["query"]>,
  res: Response
) {
  try {
    const exercise = await findExerciseById(req.query);
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
  req: Request<{}, {}, {}, DeleteExerciseInput["query"]>,
  res: Response
) {
  try {
    const exercise = await findExerciseById(req.query);
    if (exercise) {
      if (exercise.userId === req.session.userId) {
        const response = await deleteExercise(req.query);
        return res.send(response);
      }
      return res.status(403).send({ message: "Invalid credentials" });
    }
    return res.status(404).send({ message: "Exercise not found" });
  } catch (error: any) {
    res.status(409).send(error.message);
  }
}
