import { Express } from "express";
import requireAuth from "../../middleware/requireAuth";
import validate from "../../middleware/validateResource";
import {
  createExerciseCategoryHandler,
  deleteExerciseCategoryHandler,
  editExerciseCategoryHandler,
  getExerciseCategoryByIdHandler,
  getExerciseCategoryHandler,
} from "./category.controller";
import {
  CreateCategorySchema,
  DeleteCategorySchema,
  EditCategorySchema,
  GetCategoryByIdSchema,
  GetCategorySchema,
} from "./category.dto";

export function categoryRoutes(app: Express) {
  app.post(
    "/api/category",
    [validate(CreateCategorySchema), requireAuth],
    createExerciseCategoryHandler
  );
  app.get("/api/category", getExerciseCategoryHandler);
  app.get(
    "/api/category/:id",
    validate(GetCategoryByIdSchema),
    getExerciseCategoryByIdHandler
  );
  app.put(
    "/api/category/:id",
    [requireAuth, validate(EditCategorySchema)],
    editExerciseCategoryHandler
  );
  app.delete(
    "/api/category/:id",
    [requireAuth, validate(DeleteCategorySchema)],
    deleteExerciseCategoryHandler
  );
}
