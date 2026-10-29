import argon2 from "argon2";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateAccessToken } from "../utils/token.js";
import { getCookieOptions } from "../utils/cookie.js";

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.validatedBody;

  // 1. Password text select korar somoy model validation bypass hote pare jodi email na thake
  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin || !admin.isActive) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await argon2.verify(admin.password, password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateAccessToken(admin);

  admin.lastLoginAt = new Date();
  
  // 2. Mongoose versioning ba pre-save hooks handle korar jonnyo validateBeforeSave off rakha bhalo jodi shudhu date update hoy
  await admin.save({ validateBeforeSave: false });

  res.cookie(env.COOKIE_NAME, token, getCookieOptions());

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    },
  });
});

export const logoutAdmin = asyncHandler(async (req, res) => {
  // 3. Cookie clear korar somoy strict options properly spread kora dorkar minus maxAge/expires
  const { maxAge, expires, ...clearOptions } = getCookieOptions();

  res.clearCookie(env.COOKIE_NAME, clearOptions);

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

export const getCurrentAdmin = asyncHandler(async (req, res) => {
  // 4. req.admin check kora dorkar jodi Auth Middleware thikthak id pass na kore
  if (!req.admin?.id) {
    throw new ApiError(401, "Unauthorized access");
  }

  const admin = await Admin.findById(req.admin.id);

  if (!admin || !admin.isActive) {
    throw new ApiError(401, "Admin account not found or inactive");
  }

  res.status(200).json({
    success: true,
    data: {
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        lastLoginAt: admin.lastLoginAt,
      },
    },
  });
});
