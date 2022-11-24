import { number, z } from "zod";
import { Id as userId, UserSchema } from "../user/user.dto";
import { Id as categoryId } from "../category/category.dto";

export const Weight = z
  .number({
    required_error: "Weight is required",
  })
  .nonnegative("Number must be positive");

export const Reps = z
  .number({
    required_error: "Number of reps is required",
  })
  .int("Number of reps must be an integer");

export const Id = z.string().optional();

export const Name = z
  .string({
    required_error: "Name is required",
  })
  .max(30, "Name can be 30 chars long");

export const Description = z
  .string({
    required_error: "Description is required",
  })
  .max(350, { message: "Description length is too long (350)" });

export const ExerciseSchema = z.object({
  id: Id,
  name: Name,
  description: Description,
  image: z.string().optional(),
  userId: userId,
  categoryId: categoryId,
});

export const CreateExerciseSchema = z.object({
  body: ExerciseSchema,
});

export const GetExerciseSchema = z.object({
  query: z.object({
    id: Id.optional(),
    userId: userId.optional(),
  }),
});

export const GetExerciseByIdSchema = z.object({
  query: z.object({
    id: Id,
  }),
});

export const DeleteExerciseSchema = z.object({
  query: z.object({
    id: z.string(),
  }),
});

export const EditExerciseSchema = z.object({
  query: z.object({
    id: z.string(),
  }),
  body: z
    .object({
      name: Name,
      description: Description,
      image: z.string(),
      categoryId: categoryId,
    })
    .partial(),
});

export type CreateExerciseInput = z.infer<typeof CreateExerciseSchema>;
export type GetExerciseInput = z.infer<typeof GetExerciseSchema>;
export type GetExerciseByIdInput = z.infer<typeof GetExerciseByIdSchema>;
export type DeleteExerciseInput = z.infer<typeof DeleteExerciseSchema>;
export type EditExerciseInput = z.infer<typeof EditExerciseSchema>;
