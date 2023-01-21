import { Express } from "express";
import requireAuth from "../../middleware/requireAuth";
import validate from "../../middleware/validateResource";
import {
  createUserHandler,
  editUserHandler,
  editUserPasswordHandler,
  generateUserPasswordTokenController,
  getUserByIdHandler,
} from "./user.controller";
import {
  CreateUserSchema,
  EditPasswordSchema,
  EditUserSchema,
  GeneratePasswordTokenSchema,
  GetUserByIdSchema,
  GetUserSchema,
} from "./user.dto";

export function userRoutes(app: Express) {
  app.post("/api/user", validate(CreateUserSchema), createUserHandler);
  app.get("/api/user/:userId", validate(GetUserByIdSchema), getUserByIdHandler);
  app.put(
    "/api/user/:userId",
    [requireAuth, validate(EditUserSchema)],
    editUserHandler
  );
  app.put(
    "/api/userPassword/:userId",
    [requireAuth, validate(EditPasswordSchema)],
    editUserPasswordHandler
  );
  app.post(
    "/api/generatePasswordToken/:userEmail",
    validate(GeneratePasswordTokenSchema),
    generateUserPasswordTokenController
  );
}
