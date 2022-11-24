import { Express } from "express";
import requireAuth from "../../middleware/requireAuth";
import validate from "../../middleware/validateResource";
import {
  createExerciseCategoryHandler,
  deleteExerciseCategoryHandler,
  editExerciseCategoryHandler,
  getExerciseCategoryHandler,
} from "./category.controller";
import {
  CreateCategorySchema,
  DeleteCategorySchema,
  EditCategorySchema,
  GetCategorySchema,
} from "./category.dto";

export function categoryRoutes(app: Express) {
  app.post(
    "/api/category",
    [validate(CreateCategorySchema), requireAuth],
    createExerciseCategoryHandler
  );
  app.get(
    "/api/category",
    validate(GetCategorySchema),
    getExerciseCategoryHandler
  );
  app.put(
    "/api/category",
    [requireAuth, validate(EditCategorySchema)],
    editExerciseCategoryHandler
  );
  app.delete(
    "/api/category",
    [requireAuth, validate(DeleteCategorySchema)],
    deleteExerciseCategoryHandler
  );
}
