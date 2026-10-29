import { env } from "../config/env.js";

/**
 * Generates standard secure cookie options for Express response.
 * @param {object} customOptions - Additional or overridden cookie settings
 * @returns {object} Cookie configuration object
 */
const getCookieOptions = (customOptions = {}) => {
  const isProduction = env.NODE_ENV === "production";

  const baseOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax", // Cross-site request handle korar jonnyo production-e 'none' crucial
    path: "/",
    maxAge: 15 * 60 * 1000, // 15 Minutes default fallback
  };

  return { ...baseOptions, ...customOptions };
};

export default getCookieOptions;
