import { Express } from "express";
import requireAuth from "../../middleware/requireAuth";
import validate from "../../middleware/validateResource";
import {
  createExerciseHandler,
  deleteExerciseHandler,
  editExerciseHandler,
  getExerciseByIdHandler,
  getExerciseHandler,
} from "./exercise.controller";
import {
  CreateExerciseSchema,
  DeleteExerciseSchema,
  EditExerciseSchema,
  GetExerciseByIdSchema,
} from "./exercise.dto";

export function exerciseRoutes(app: Express) {
  app.post(
    "/api/exercise",
    [validate(CreateExerciseSchema), requireAuth],
    createExerciseHandler
  );
  app.get("/api/exercise", getExerciseHandler);
  app.get(
    "/api/exercise/:id",
    validate(GetExerciseByIdSchema),
    getExerciseByIdHandler
  );
  app.put(
    "/api/exercise/:id",
    [validate(EditExerciseSchema), requireAuth],
    editExerciseHandler
  );
  app.delete(
    "/api/exercise/:id",
    [validate(DeleteExerciseSchema), requireAuth],
    deleteExerciseHandler
  );
}
