import { z } from "zod";

export const experienceSchema = z
  .object({
    company: z.string().trim().min(1).max(120),
    position: z.string().trim().min(1).max(120),

    employmentType: z
      .enum([
        "Full-time",
        "Part-time",
        "Internship",
        "Freelance",
        "Contract",
      ])
      .optional(),

    location: z.string().trim().max(150).optional(),

    startDate: z.coerce.date(),
    endDate: z.coerce.date().nullable().optional(),

    currentlyWorking: z.boolean().optional(),

    description: z.string().trim().max(3000).optional(),

    responsibilities: z.array(z.string().trim().min(1).max(500)).optional(),

    companyUrl: z.string().url().or(z.literal("")).optional(),

    order: z.number().int().min(0).optional(),
    published: z.boolean().optional(),
  })
  .refine(
    (data) =>
      data.currentlyWorking === true ||
      data.endDate === undefined ||
      data.endDate === null ||
      data.endDate >= data.startDate,
    {
      message: "End date cannot be before start date",
      path: ["endDate"],
    }
  );

export const updateExperienceSchema = experienceSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });