import { z } from "zod";

export const Email = z
  .string({
    required_error: "Email is required",
  })
  .email("Email is not a valid email.");

export const Password = z
  .string({
    required_error: "Password is required",
  })
  .min(8, {
    message: "Password must be atleast 8 characters long",
  });

export const Name = z.string().max(30, "Name can be 30 chars long").optional();
export const LastName = z
  .string()
  .max(30, "LastName can be 30 chars long")
  .optional();

export const Id = z.string().optional();

export const UserSchema = z.object({
  userId: Id,
  email: Email,
  password: Password,
  name: Name,
  lastname: LastName,
});

export const CreateUserSchema = z.object({
  body: UserSchema,
});

export const GetUserSchema = z.object({
  query: z.object({
    email: Email,
  }),
});

export const GetUserByIdSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export const EditUserSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
  body: z.object({
    name: Name,
    lastname: LastName,
  }),
});

export const EditPasswordSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
  body: z.object({
    password: Password,
    candidatePassword: Password,
  }),
});

export const GeneratePasswordTokenSchema = z.object({
  params: z.object({
    userEmail: Email,
  }),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type GetUserInput = z.infer<typeof GetUserSchema>;
export type GetUserByIdInput = z.infer<typeof GetUserByIdSchema>;
export type EditUserInput = z.infer<typeof EditUserSchema>;
export type EditUserPasswordInput = z.infer<typeof EditPasswordSchema>;
export type GeneratePasswordTokenInput = z.infer<
  typeof GeneratePasswordTokenSchema
>;
