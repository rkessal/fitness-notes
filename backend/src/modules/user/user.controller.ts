import { Request, Response } from "express";
import {
  CreateUserInput,
  EditUserInput,
  EditUserPasswordInput,
  GetUserInput,
} from "./user.dto";
import {
  createUser,
  editUser,
  editUserPassword,
  findUser,
  findUserById,
} from "./user.service";
import { omit } from "lodash";
import logger from "../../utils/logger";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const userExists = await findUser(req.body.email);
    if (!userExists) {
      const user = await createUser(req.body);
      return res.send(omit(user, "password"));
    }
    return res.status(403).send({ message: "User already exists" });
  } catch (error: any) {
    logger.error(error);
    return;
  }
}

export async function getUserHandler(
  req: Request<{}, {}, {}, GetUserInput["query"]>,
  res: Response
) {
  console.log("User: ", req);
  try {
    const user = await findUser(req.query.email);
    if (user) {
      return res.send(omit(user, "password"));
    }
    return res.status(404).send({ message: "User not found" });
  } catch (error: any) {
    return res.status(409).send({ message: error.message });
  }
}

export async function editUserHandler(
  req: Request<{}, {}, EditUserInput["body"], EditUserInput["query"]>,
  res: Response
) {
  try {
    const user = await findUserById(req.query);
    if (user) {
      if (user.id === req.session.userId) {
        const response = await editUser(req);
        return res.send(omit(response, "password"));
      }
      return res.status(403).send();
    }
    return res.status(404).send({ message: "User not found" });
  } catch (error: any) {
    return res.status(409).send({ message: error.message });
  }
}

export async function editUserPasswordHandler(
  req: Request<
    {},
    {},
    EditUserPasswordInput["body"],
    EditUserPasswordInput["query"]
  >,
  res: Response
) {
  try {
    const user = await findUserById(req.query);
    if (user) {
      if (user.id === req.session.userId) {
        const response = await editUserPassword(req);
        return res.send(omit(response, "password"));
      }
      return res.status(403).send();
    }
    return res.status(404).send({ message: "User not found" });
  } catch (error: any) {
    return res.status(409).send({ message: error.message });
  }
}
