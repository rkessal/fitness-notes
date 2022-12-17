import { z } from "zod";
import { Email, Password } from "../user/user.dto";

export const Id = z.string();

export const Session = z.object({
  id: Id,
  email: Email,
  password: Password,
  candidatePassword: Password,
});

export const CreateSessionSchema = z.object({
  body: Session.omit({ password: true, id: true }),
});

export type CreateSessionInput = z.infer<typeof CreateSessionSchema>;
export type GetSessionIdInput = z.infer<typeof Id>;
