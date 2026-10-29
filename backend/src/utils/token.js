import jwt from "jsonwebtoken";

import { env } from "../config/env.js";

export const generateAccessToken = (admin) => {
  return jwt.sign(
    {
      sub: admin._id.toString(),

      role: admin.role,
    },

    env.JWT_SECRET,

    {
      expiresIn: env.JWT_EXPIRES_IN,

      issuer: "portfolio-cms",

      audience: "portfolio-admin",
    }
  );
};