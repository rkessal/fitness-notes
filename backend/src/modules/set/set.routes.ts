import { Express } from "express";
import requireAuth from "../../middleware/requireAuth";
import validate from "../../middleware/validateResource";
import {
  createSetHandler,
  deleteSetHandler,
  editSetHandler,
  getSetByIdHandler,
  getSetsHandler,
} from "./set.controller";
import {
  CreateSetSchema,
  DeleteSetSchema,
  EditSetSchema,
  GetSetByIdSchema,
  GetSetsSchema,
} from "./set.dto";

export function setRoutes(app: Express) {
  app.post(
    "/api/set",
    [requireAuth, validate(CreateSetSchema)],
    createSetHandler
  );
  app.get("/api/set", [requireAuth, validate(GetSetsSchema)], getSetsHandler);
  app.get(
    "/api/set/:setId",
    [requireAuth, validate(GetSetByIdSchema)],
    getSetByIdHandler
  );
  app.put(
    "/api/set:setId",
    [requireAuth, validate(EditSetSchema)],
    editSetHandler
  );
  app.delete(
    "/api/set:setId",
    [requireAuth, validate(DeleteSetSchema)],
    deleteSetHandler
  );
}
