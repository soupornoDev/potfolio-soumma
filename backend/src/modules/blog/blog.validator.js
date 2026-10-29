import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().trim().min(1).max(180),

  slug: z
    .string()
    .trim()
    .min(1)
    .max(180)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must use lowercase letters, numbers, and hyphens",
    }),

  excerpt: z.string().trim().max(500).optional(),
  content: z.string().min(1),

  coverImage: z.string().url().or(z.literal("")).optional(),

  tags: z.array(z.string().trim().min(1).max(40)).max(20).optional(),

  seoTitle: z.string().trim().max(180).optional(),
  seoDescription: z.string().trim().max(300).optional(),

  published: z.boolean().optional(),
  publishedAt: z.coerce.date().nullable().optional(),
});

export const updateBlogSchema = blogSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });