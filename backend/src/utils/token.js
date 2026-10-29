// backend/src/utils/token.js

import jwt from "jsonwebtoken";

export function generateAccessToken(admin) {
  if (!admin?._id) {
    throw new Error("Admin ID is required to generate access token");
  }

  return jwt.sign(
    {
      adminId: admin._id.toString(),
      role: admin.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    }
  );
}

export default generateAccessToken;