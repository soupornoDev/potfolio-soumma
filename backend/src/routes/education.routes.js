import { Router } from "express";

import { educationController } from "../modules/education/education.controller.js";

import {
  educationSchema,
  updateEducationSchema,
} from "../modules/education/education.validator.js";

import { asyncHandler } from "../utils/asyncHandler.js";

import { requireAdmin } from "../middleware/auth.middleware.js";

import { validateBody } from "../middleware/validate.middleware.js";

const router = Router();

// Public: Published education records
router.get(
  "/",
  asyncHandler(educationController.getPublic)
);

// Admin: All education records
router.get(
  "/admin",
  requireAdmin,
  asyncHandler(educationController.getAdmin)
);

// Admin: Create education record
router.post(
  "/",
  requireAdmin,
  validateBody(educationSchema),
  asyncHandler(educationController.create)
);

// Admin: Update education record
router.patch(
  "/:id",
  requireAdmin,
  validateBody(updateEducationSchema),
  asyncHandler(educationController.update)
);

// Admin: Delete education record
router.delete(
  "/:id",
  requireAdmin,
  asyncHandler(educationController.remove)
);

export default router;