// backend/src/utils/cookie.js

import { env } from "../config/env.js";

/**
 * Generates secure cookie options for Express.
 *
 * @param {object} customOptions
 * @returns {object}
 */
export const getCookieOptions = (customOptions = {}) => {
  const isProduction = env.NODE_ENV === "production";

  const baseOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
    maxAge: 15 * 60 * 1000,
  };

  return {
    ...baseOptions,
    ...customOptions,
  };
};

// Supports default imports too
export default getCookieOptions;