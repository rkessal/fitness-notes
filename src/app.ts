import logger from "./utils/logger";
import express, { Request, Response } from "express";
import { userRoutes } from "./modules/user/user.routes";
import { exerciseRoutes } from "./modules/exercise/exercise.routes";
import expressSession, { RedisStore } from "./middleware/session";
import { sessionRoutes } from "./modules/session/session.routes";
import cors from "cors";
import { categoryRoutes } from "./modules/category/category.routes";
import { setRoutes } from "./modules/set/set.routes";
import config from "../config/config";

const port = config.PORT;
const host = config.HOST;
const app = express();
app.use(express.json());
app.use(expressSession);
app.set("host", host);

app.get("/api/healthcheck", (req: Request, res: Response) => {
  console.log("SESSION: " + req.session.userId);
});

app.listen(port, host, async () => {
  logger.info(`App is running at port: ${port}`);
  console.log(express);
  userRoutes(app);
  exerciseRoutes(app);
  sessionRoutes(app);
  categoryRoutes(app);
  setRoutes(app);
});
