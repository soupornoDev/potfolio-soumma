import { Router } from "express";

import {
  getPublicExperience,
  getAdminExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../modules/experience/experience.controller.js";

import {
  experienceSchema,
  updateExperienceSchema,
} from "../modules/experience/experience.validator.js";

import asyncHandler from "../utils/asyncHandler.js";
import requireAdmin from "../middleware/requireAdmin.js";
import validateBody from "../middleware/validateBody.js";

const router = Router();

// Public
router.get("/", asyncHandler(getPublicExperience));

// Admin
router.get(
  "/admin",
  requireAdmin,
  asyncHandler(getAdminExperience)
);

router.post(
  "/",
  requireAdmin,
  validateBody(experienceSchema),
  asyncHandler(createExperience)
);

router.patch(
  "/:id",
  requireAdmin,
  validateBody(updateExperienceSchema),
  asyncHandler(updateExperience)
);

router.delete(
  "/:id",
  requireAdmin,
  asyncHandler(deleteExperience)
);

export default router;