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
