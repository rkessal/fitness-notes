import { string, z } from "zod";

const setId = z.string().optional();

const Weight = z
  .number({
    required_error: "Weight is required",
  })
  .nonnegative("Rep number can't be negative")
  .min(0.5, "Minimum weight is 0.5");

const Reps = z
  .number({
    required_error: "Rep number is required",
  })
  .nonnegative("Rep number can't be negative")
  .int("Rep number must be an integer")
  .min(1, "Minimum rep is 1");

const SetSchema = z.object({
  setId: setId,
  weight: Weight,
  reps: Reps,
  exerciseId: z.string(),
  userId: z.string(),
});

export const CreateSetSchema = z.object({
  body: SetSchema,
});

export const GetSetsSchema = z.object({
  query: z.object({
    exerciseId: z.string().optional(),
    userId: z.string(),
  }),
});

export const GetSetByIdSchema = z.object({
  params: z.object({
    setId: z.string(),
  }),
});

export const EditSetSchema = z.object({
  params: z.object({
    setId: z.string(),
  }),
  body: SetSchema.pick({
    weight: true,
    reps: true,
  }),
});

export const DeleteSetSchema = z.object({
  params: z.object({
    setId: z.string(),
  }),
});

export type CreateSetInput = z.infer<typeof CreateSetSchema>;
export type GetSetsInput = z.infer<typeof GetSetsSchema>;
export type GetSetByIdInput = z.infer<typeof GetSetByIdSchema>;
export type EditSetInput = z.infer<typeof EditSetSchema>;
export type DeleteSetInput = z.infer<typeof DeleteSetSchema>;
