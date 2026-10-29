import { Router } from "express";
import { experienceController } from "./experience.controller.js";
import { experienceSchema, updateExperienceSchema } from "./experience.validator.js";
import asyncHandler from "../../utils/asyncHandler.js";
import requireAdmin from "../../middleware/requireAdmin.js";
import validateBody from "../../middleware/validateBody.js";

const router = Router();

router.get("/", asyncHandler(experienceController.getPublic));

router.get(
  "/admin",
  requireAdmin,
  asyncHandler(experienceController.getAdmin)
);

router.post(
  "/",
  requireAdmin,
  validateBody(experienceSchema),
  asyncHandler(experienceController.create)
);

router.patch(
  "/:id",
  requireAdmin,
  validateBody(updateExperienceSchema),
  asyncHandler(experienceController.update)
);

router.delete(
  "/:id",
  requireAdmin,
  asyncHandler(experienceController.remove)
);

export default router;