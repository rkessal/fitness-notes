import { Express } from "express";
import requireAuth from "../../middleware/requireAuth";
import validate from "../../middleware/validateResource";
import {
  createSessionHandler,
  deleteSessionHandler,
  getSessionHandler,
} from "./session.controller";
import { CreateSessionSchema } from "./session.dto";

export function sessionRoutes(app: Express) {
  app.post("/api/session", validate(CreateSessionSchema), createSessionHandler);
  app.delete("/api/session", requireAuth, deleteSessionHandler);
  app.get("/api/session", getSessionHandler);
  //   app.get("/api/user", validate(GetUserSchema), getUserHandler);
}
