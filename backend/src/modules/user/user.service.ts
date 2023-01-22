import * as jwt from "jsonwebtoken";
import prisma from "../../utils/prisma";
import {
  ResetPasswordInput,
  CreateUserInput,
  EditUserInput,
  EditUserPasswordInput,
  GeneratePasswordTokenInput,
  GetUserByIdInput,
} from "./user.dto";
import argon2 from "argon2";
import transporter from "../../utils/mailer";
import config from "../../../config/config";
import sanitizedConfig from "../../../config/config";

export async function createUser(input: CreateUserInput["body"]) {
  const password = await argon2.hash(input.password);
  return await prisma.user.create({
    data: {
      ...input,
      email: input.email.toLocaleLowerCase(),
      password: password,
    },
  });
}

export async function findUser(input: CreateUserInput["body"]["email"]) {
  const user = await prisma.user.findUnique({
    where: {
      email: input.toLocaleLowerCase(),
    },
    include: {
      exercises: true,
    },
  });
  return user;
}

export async function findUserById(input: GetUserByIdInput["params"]) {
  return await prisma.user.findUnique({
    where: {
      id: input.userId,
    },
    include: {
      exercises: true,
    },
  });
}

export async function editUser(input: EditUserInput) {
  return await prisma.user.update({
    where: {
      id: input.params.userId,
    },
    data: {
      lastname: input.body.lastname,
      name: input.body.name,
    },
  });
}
export async function resetUserPassword(
  candidatePassword: string,
  email: string
) {
  const password = await argon2.hash(candidatePassword);
  return await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      password: password,
      token: null,
    },
  });
}

export async function editUserPassword(input: EditUserPasswordInput) {
  const password = await argon2.hash(input.body.candidatePassword);
  return await prisma.user.update({
    where: {
      id: input.params.userId,
    },
    data: {
      password: password,
    },
  });
}

export async function checkPassword(
  password: string,
  candidatePassword: string
) {
  return await argon2.verify(password, candidatePassword);
}

export function checkToken(token: string) {
  try {
    const decodedToken = <jwt.EmailJwtPayload>(
      jwt.verify(token, sanitizedConfig.JWTKEY)
    );
    return {
      valid: true,
      expired: false,
      decodedToken,
    };
  } catch (error) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decodedToken: null,
    };
  }
}

export async function getUserPassword(input: GetUserByIdInput) {
  return await prisma.user.findUnique({
    where: {
      id: input.params.userId,
    },
    select: {
      password: true,
    },
  });
}

export async function generateUserPasswordToken(
  input: GeneratePasswordTokenInput
) {
  const secret = sanitizedConfig.JWTKEY;
  const payload = { email: input.params.userEmail };
  const options = { expiresIn: "1h" };
  const token = jwt.sign(payload, secret, options);
  sendPasswordToken(input.params.userEmail, token);
  return await prisma.user.update({
    where: {
      email: input.params.userEmail,
    },
    data: {
      token: token,
    },
  });
}

export function sendPasswordToken(
  input: GeneratePasswordTokenInput["params"]["userEmail"],
  token: string
) {
  const mailOptions = {
    from: config.MAILUSER,
    to: input,
    subject: "Password Reset Request",
    text:
      "Here is your link to reset your password: fitness-notes.errka.dev/resetPassword/" +
      token,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(info.response);
    }
  });
}
