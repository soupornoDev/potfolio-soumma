import { z } from "zod";

export const createMessageSchema = z.object({
  name: z.string().trim().min(2).max(100),

  email: z.string().trim().email().max(180),

  subject: z.string().trim().max(180).optional(),

  message: z.string().trim().min(10).max(5000),
});

export const updateMessageSchema = z
  .object({
    status: z.enum(["new", "read", "replied", "archived"]),
  })
  .strict();