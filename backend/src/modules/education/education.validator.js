import { z } from "zod";

export const educationSchema = z
  .object({
    institution: z.string().trim().min(1).max(180),
    degree: z.string().trim().min(1).max(150),

    fieldOfStudy: z.string().trim().max(150).optional(),
    location: z.string().trim().max(150).optional(),

    startDate: z.coerce.date(),
    endDate: z.coerce.date().nullable().optional(),

    currentlyStudying: z.boolean().optional(),

    grade: z.string().trim().max(100).optional(),
    description: z.string().trim().max(3000).optional(),

    order: z.number().int().min(0).optional(),
    published: z.boolean().optional(),
  })
  .refine(
    (data) =>
      data.currentlyStudying === true ||
      data.endDate === undefined ||
      data.endDate === null ||
      data.endDate >= data.startDate,
    {
      message: "End date cannot be before start date",
      path: ["endDate"],
    }
  );

export const updateEducationSchema = educationSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });