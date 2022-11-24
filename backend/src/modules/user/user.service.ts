import prisma from "../../utils/prisma";
import {
  CreateUserInput,
  EditUserInput,
  EditUserPasswordInput,
  GetUserByIdInput,
} from "./user.dto";
import argon2 from "argon2";

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
  // console.log(input);
  const user = await prisma.user.findUnique({
    where: {
      email: input,
    },
    include: {
      exercises: true,
    },
  });
  return user;
}

export async function findUserById(input: GetUserByIdInput["query"]) {
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
      id: input.query.userId,
    },
    data: {
      lastname: input.body.lastname,
      name: input.body.name,
    },
  });
}

export async function editUserPassword(input: EditUserPasswordInput) {
  const password = await argon2.hash(input.body.password);
  return await prisma.user.update({
    where: {
      id: input.query.userId,
    },
    data: {
      password: password,
    },
  });
}
