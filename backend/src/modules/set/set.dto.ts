import { z } from "zod";

const setId = z.string().optional();

const Weight = z
  .number({
    required_error: "Weight is required",
  })
  .nonnegative("Rep number can't be negative");

const Reps = z
  .number({
    required_error: "Rep number is required",
  })
  .nonnegative("Rep number can't be negative")
  .int("Rep number must be an integer");

const SetSchema = z.object({
  setId: setId,
  weight: Weight,
  reps: Reps,
  exerciseId: z.string(),
});

export const CreateSetSchema = z.object({
  body: SetSchema,
});

export const GetSetsSchema = z.object({
  query: z.object({
    exerciseId: z.string(),
  }),
});

export const GetSetByIdSchema = z.object({
  query: z.object({
    setId: z.string(),
  }),
});

export const EditSetSchema = z.object({
  query: z.object({
    setId: z.string(),
  }),
  body: SetSchema.omit({
    setId: true,
    exerciseId: true,
  }),
});

export const DeleteSetSchema = z.object({
  query: z.object({
    setId: z.string(),
  }),
});

export type CreateSetInput = z.infer<typeof CreateSetSchema>;
export type GetSetsInput = z.infer<typeof GetSetsSchema>;
export type GetSetByIdInput = z.infer<typeof GetSetByIdSchema>;
export type EditSetInput = z.infer<typeof EditSetSchema>;
export type DeleteSetInput = z.infer<typeof DeleteSetSchema>;
