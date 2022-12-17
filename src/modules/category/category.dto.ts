import { z } from "zod";

export const Id = z.string().optional();

const Name = z
  .string({
    required_error: "Name is required",
  })
  .max(50, "Length is 50 characters max");

const Image = z.string().optional();

export const CategorySchema = z.object({
  id: Id,
  name: Name,
  image: Image,
});

export const CreateCategorySchema = z.object({
  body: CategorySchema,
});

export const GetCategorySchema = z.object({
  query: z.object({
    id: Id,
  }),
});

export const GetCategoryByIdSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "Category id is required" }),
  }),
});

export const EditCategorySchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: Name.optional(),
    image: Image,
  }),
});

export const DeleteCategorySchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export type CreateExerciseCategoryType = z.infer<typeof CreateCategorySchema>;
export type GetExerciseCategoryType = z.infer<typeof GetCategorySchema>;
export type GetExerciseCategoryByIdType = z.infer<typeof GetCategoryByIdSchema>;
export type EditExerciseCategoryType = z.infer<typeof EditCategorySchema>;
export type DeleteExerciseCategoryType = z.infer<typeof DeleteCategorySchema>;
