import { Router } from "express";

import {
  getProfile,

  createOrUpdateProfile,
} from "../controllers/profile.controller.js";

import {
  requireAdmin,
} from "../middleware/auth.middleware.js";

import {
  validateBody,
} from "../middleware/validate.middleware.js";

import {
  profileSchema,
} from "../validators/profile.validator.js";

const router = Router();

// Public Profile API
router.get(
  "/",
  getProfile
);

// Admin-only Profile Update
router.put(
  "/",
  requireAdmin,
  validateBody(profileSchema),
  createOrUpdateProfile
);

export default router;