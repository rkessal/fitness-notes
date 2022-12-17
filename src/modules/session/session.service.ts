import argon2 from "argon2";
import { findUser } from "../user/user.service";
import { CreateSessionInput, GetSessionIdInput } from "./session.dto";

export async function createSession(input: CreateSessionInput["body"]) {
  const user = await findUser(input.email);
  if (user) {
    const correctPassword = await comparePassword(
      user.password,
      input.candidatePassword
    );
    if (correctPassword) {
      return user.id;
    }
  }
  return null;
}

export async function comparePassword(
  password: string,
  candidatePassword: string
) {
  return await argon2.verify(password, candidatePassword);
}

export function getCookie() {
  return process.env.COOKIE_NAME;
}
