import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().default(5000),

  API_PREFIX: z.string().default("/api/v1"),

  MONGODB_URI: z.string().min(1),

  JWT_SECRET: z.string().min(32),

  JWT_EXPIRES_IN: z.string().default("15m"),

  FRONTEND_URL: z.string().url(),

  COOKIE_NAME: z.string().default("portfolio_admin_token"),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error(
    "Invalid environment configuration:",
    result.error.flatten().fieldErrors
  );

  process.exit(1);
}

export const env = result.data;
