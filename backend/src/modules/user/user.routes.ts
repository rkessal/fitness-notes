import { Express } from "express";
import requireAuth from "../../middleware/requireAuth";
import validate from "../../middleware/validateResource";
import {
  createUserHandler,
  editUserHandler,
  editUserPasswordHandler,
  getUserHandler,
} from "./user.controller";
import {
  CreateUserSchema,
  EditPasswordSchema,
  EditUserSchema,
  GetUserSchema,
} from "./user.dto";

export function userRoutes(app: Express) {
  app.post("/api/user", validate(CreateUserSchema), createUserHandler);
  app.get("/api/user", validate(GetUserSchema), getUserHandler);
  app.put(
    "/api/user",
    [requireAuth, validate(EditUserSchema)],
    editUserHandler
  );
  app.put(
    "/api/userPassword",
    [requireAuth, validate(EditPasswordSchema)],
    editUserPasswordHandler
  );
}
