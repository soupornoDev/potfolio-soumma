import { env } from "../config/env.js";

export const getCookieOptions = () => {
  const isProduction =
    env.NODE_ENV === "production";

  return {
    httpOnly: true,

    secure: isProduction,

    sameSite: "lax",

    path: "/",

    maxAge: 15 * 60 * 1000,
  };
};