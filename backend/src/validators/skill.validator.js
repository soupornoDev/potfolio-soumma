import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().trim().min(1).max(100),

  category: z.string().trim().min(1).max(100),

  level: z.number().min(0).max(100),

  icon: z.string().max(100),

  featured: z.boolean(),

  order: z.number().int().min(0),
});