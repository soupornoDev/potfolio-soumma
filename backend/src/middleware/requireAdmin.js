import jwt from "jsonwebtoken";

import Admin from "../modules/auth/admin.model.js";
import ApiError from "../utils/ApiError.js";

export default async function requireAdmin(req, res, next) {
  try {
    const token = req.cookies?.[process.env.COOKIE_NAME];

    if (!token) {
      throw new ApiError(401, "Authentication required");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Support the common JWT admin ID claim names
    const adminId = decoded.adminId ?? decoded.id ?? decoded.sub;

    if (!adminId) {
      throw new ApiError(401, "Invalid authentication token");
    }

    const admin = await Admin.findById(adminId).select(
      "_id name email role isActive"
    );

    if (!admin || !admin.isActive) {
      throw new ApiError(401, "Admin account is inactive or unavailable");
    }

    if (admin.role !== "admin") {
      throw new ApiError(403, "Admin access required");
    }

    req.admin = admin;

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }

    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return next(new ApiError(401, "Invalid or expired token"));
    }

    next(error);
  }
}