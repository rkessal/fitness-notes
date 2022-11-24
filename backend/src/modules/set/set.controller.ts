import { Request, Response } from "express";
import { findExerciseById } from "../exercise/exercise.service";
import { findUserById } from "../user/user.service";
import {
  CreateSetInput,
  DeleteSetInput,
  EditSetInput,
  GetSetByIdInput,
  GetSetsInput,
} from "./set.dto";
import {
  createSet,
  deleteSet,
  editSet,
  findSetById,
  findSets,
} from "./set.service";

export async function createSetHandler(
  req: Request<{}, {}, CreateSetInput["body"]>,
  res: Response
) {
  try {
    if (req.session.userId) {
      const user = await findUserById({ userId: req.session.userId });
      const exercise = await findExerciseById({ id: req.body.exerciseId });
      if (user) {
        if (exercise) {
          if (user.id === exercise.userId) {
            const set = await createSet(req.body);
            return res.send(set);
          }
          return res.status(403).send({ message: "Invalid credentials" });
        }
        return res.status(404).send({ message: "Exercise not found" });
      }
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(403).send({ message: "Invalid credentials" });
  } catch (error: any) {
    return res.status(409).send({ message: error.message });
  }
}

export async function getSetsHandler(
  req: Request<{}, {}, {}, GetSetsInput["query"]>,
  res: Response
) {
  try {
    const exercise = await findExerciseById({ id: req.query.exerciseId });
    if (exercise) {
      const sets = await findSets(req.query);
      return res.send(sets);
    }
    res.status(404).send({ message: "Exercise not found" });
  } catch (error: any) {
    return res.status(409).send({ message: error.message });
  }
}

export async function getSetByIdHandler(
  req: Request<{}, {}, {}, GetSetByIdInput["query"]>,
  res: Response
) {
  try {
    const set = await findSetById(req.query);
    if (set) {
      res.send(set);
    }
    res.status(404).send({ message: "Set not found" });
  } catch (error: any) {
    return res.status(409).send({ message: error.message });
  }
}

export async function editSetHandler(
  req: Request<{}, {}, EditSetInput["body"], EditSetInput["query"]>,
  res: Response
) {
  try {
    const set = await findSetById(req.query);
    if (set?.exerciseId) {
      const exercise = await findExerciseById({ id: set.exerciseId });
      if (exercise?.userId === req.session.userId) {
        const response = await editSet(req);
        return res.send(response);
      }
      return res.status(403).send({ message: "Invalid credentials" });
    }
    return res.status(404).send({ message: "Set not found" });
  } catch (error: any) {
    return res.status(409).send({ message: error.message });
  }
}

export async function deleteSetHandler(
  req: Request<{}, {}, {}, DeleteSetInput["query"]>,
  res: Response
) {
  try {
    const set = await findSetById(req.query);
    if (set?.exerciseId) {
      const exercise = await findExerciseById({ id: set.exerciseId });
      if (exercise?.userId === req.session.userId) {
        const response = await deleteSet(req.query);
        return res.send(response);
      }
      return res.status(403).send({ message: "Invalid credentials" });
    }
    return res.status(404).send({ message: "Set not found" });
  } catch (error: any) {
    return res.status(409).send({ message: error.message });
  }
}
