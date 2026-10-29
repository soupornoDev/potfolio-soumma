import { z } from "zod";

export const certificateSchema = z.object({
  title: z.string().trim().min(1).max(180),
  issuer: z.string().trim().min(1).max(180),

  issueDate: z.coerce.date().nullable().optional(),
  expiryDate: z.coerce.date().nullable().optional(),

  credentialId: z.string().trim().max(180).optional(),
  credentialUrl: z.string().url().or(z.literal("")).optional(),
  imageUrl: z.string().url().or(z.literal("")).optional(),

  order: z.number().int().min(0).optional(),
  published: z.boolean().optional(),
});

export const updateCertificateSchema = certificateSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });