import { z } from "zod";

const mediaSchema = z.object({
  url: z.string().url().or(z.literal("")),
  publicId: z.string().max(255),
});

export const projectSchema = z.object({
  title: z.string().trim().min(1).max(150),

  slug: z
    .string()
    .trim()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Invalid project slug"
    )
    .max(180),

  description: z.string().min(1).max(5000),

  category: z.string().min(1).max(100),

  thumbnail: mediaSchema,

  gallery: z.array(mediaSchema).max(20),

  technologies: z.array(
    z.string().trim().min(1).max(100)
  ).max(30),

  githubUrl: z.string().url().or(z.literal("")),

  liveUrl: z.string().url().or(z.literal("")),

  featured: z.boolean(),

  published: z.boolean(),

  order: z.number().int().min(0),
});