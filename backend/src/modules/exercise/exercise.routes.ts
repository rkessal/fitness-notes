import { Express } from "express";
import requireAuth from "../../middleware/requireAuth";
import validate from "../../middleware/validateResource";
import {
  createExerciseHandler,
  deleteExerciseHandler,
  editExerciseHandler,
  getExerciseHandler,
} from "./exercise.controller";
import {
  CreateExerciseSchema,
  DeleteExerciseSchema,
  EditExerciseSchema,
  GetExerciseSchema,
} from "./exercise.dto";

export function exerciseRoutes(app: Express) {
  app.post(
    "/api/exercise",
    [validate(CreateExerciseSchema), requireAuth],
    createExerciseHandler
  );
  app.get("/api/exercise", validate(GetExerciseSchema), getExerciseHandler);
  app.put(
    "/api/exercise",
    [validate(EditExerciseSchema), requireAuth],
    editExerciseHandler
  );
  app.delete(
    "/api/exercise",
    [validate(DeleteExerciseSchema), requireAuth],
    deleteExerciseHandler
  );
}
