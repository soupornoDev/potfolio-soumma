import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";

import { env } from "../config/env.js";

import { ApiError } from "../utils/ApiError.js";

import { asyncHandler } from "../utils/asyncHandler.js";

export const requireAdmin = asyncHandler(
  async (req, res, next) => {
    const token = req.cookies[
      env.COOKIE_NAME
    ];

    if (!token) {
      throw new ApiError(
        401,

        "Authentication required"
      );
    }

    let decoded;

    try {
      decoded = jwt.verify(
        token,

        env.JWT_SECRET,

        {
          issuer: "portfolio-cms",

          audience: "portfolio-admin",

          algorithms: ["HS256"],
        }
      );
    } catch {
      throw new ApiError(
        401,

        "Invalid or expired authentication token"
      );
    }

    if (
      !decoded.sub ||
      decoded.role !== "admin"
    ) {
      throw new ApiError(
        401,

        "Invalid authentication token"
      );
    }

    const admin = await Admin.findById(
      decoded.sub
    );

    if (!admin || !admin.isActive) {
      throw new ApiError(
        401,

        "Admin access denied"
      );
    }

    req.admin = {
      id: admin._id.toString(),

      role: admin.role,
    };

    next();
  }
);