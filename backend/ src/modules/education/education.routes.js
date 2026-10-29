import { Router } from "express";
import { educationController } from "./education.controller.js";
import {
  educationSchema,
  updateEducationSchema,
} from "./education.validator.js";

import asyncHandler from "../../utils/asyncHandler.js";
import requireAdmin from "../../middleware/requireAdmin.js";
import validateBody from "../../middleware/validateBody.js";

const router = Router();

router.get("/", asyncHandler(educationController.getPublic));

router.get(
  "/admin",
  requireAdmin,
  asyncHandler(educationController.getAdmin)
);

router.post(
  "/",
  requireAdmin,
  validateBody(educationSchema),
  asyncHandler(educationController.create)
);

router.patch(
  "/:id",
  requireAdmin,
  validateBody(updateEducationSchema),
  asyncHandler(educationController.update)
);

router.delete(
  "/:id",
  requireAdmin,
  asyncHandler(educationController.remove)
);

export default router;