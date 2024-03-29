import { Request, Response } from "express";
import {
  ResetPasswordInput,
  CreateUserInput,
  EditUserInput,
  EditUserPasswordInput,
  GeneratePasswordTokenInput,
  GetUserByIdInput,
  GetUserInput,
} from "./user.dto";
import {
  checkPassword,
  checkToken,
  createUser,
  editUser,
  editUserPassword,
  findUser,
  findUserById,
  generateUserPasswordToken,
  getUserPassword,
  resetUserPassword,
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

export async function getUserByIdHandler(
  req: Request<GetUserByIdInput["params"]>,
  res: Response
) {
  try {
    const user = await findUserById(req.params);
    if (user) {
      return res.send(omit(user, "password"));
    }
    return res.status(404).send({ message: "User not found" });
  } catch (error: any) {
    return res.status(409).send(error);
  }
}

export async function editUserHandler(
  req: Request<EditUserInput["params"], {}, EditUserInput["body"]>,
  res: Response
) {
  try {
    const user = await findUserById(req.params);
    if (user) {
      if (user.id === req.session.userId) {
        const response = await editUser(req);
        return res.send(omit(response, "password"));
      }
      return res.status(401).send({ message: "Forbidden" });
    }
    return res.status(404).send({ message: "User not found" });
  } catch (error: any) {
    return res.status(409).send(error);
  }
}

export async function resetUserPasswordHandler(
  req: Request<{}, {}, ResetPasswordInput["body"]>,
  res: Response
) {
  try {
    const decodedToken = checkToken(req.body.token);
    if (decodedToken.expired) {
      return res.status(400).send({ message: "Token expired" });
    }
    if (decodedToken.decodedToken) {
      const user = await findUser(decodedToken.decodedToken.email);
      if (user) {
        if (user.token) {
          const response = await resetUserPassword(
            req.body.candidatePassword,
            decodedToken.decodedToken.email
          );
          console.log(response);
          return res.send(omit(response, "password"));
        }
        return res.status(400).send({ message: "Token expired" });
      }
    }
    return res.status(404).send({ message: "No user with this email address" });
  } catch (error) {}
}

export async function editUserPasswordHandler(
  req: Request<
    EditUserPasswordInput["params"],
    {},
    EditUserPasswordInput["body"]
  >,
  res: Response
) {
  try {
    const user = await findUserById(req.params);
    if (user) {
      if (user.id === req.session.userId) {
        const userPassword = await getUserPassword(req);
        if (userPassword) {
          const check = await checkPassword(
            userPassword.password,
            req.body.candidatePassword
          );
          if (check) {
            const response = await editUserPassword(req);
            return res.send(omit(response, "password"));
          }
          return res.status(400).send({ message: "Invalid current password" });
        }
      }
      return res.status(401).send({ message: "Forbidden" });
    }
    return res.status(404).send({ message: "User not found" });
  } catch (error: any) {
    return res.status(409).send(error);
  }
}

export async function generateUserPasswordTokenHandler(
  req: Request<GeneratePasswordTokenInput["params"]>,
  res: Response
) {
  try {
    const user = await findUser(req.params.userEmail);
    if (user) {
      console.log(req);
      const response = await generateUserPasswordToken(req);
      return res.status(200).send(omit(response, "password"));
    }
    return res.status(404).send({ message: "Email not found" });
  } catch (error) {
    return res.status(409).send(error.message);
  }
}
