import { Router } from "express";

import { certificateController } from "../modules/certificate/certificate.controller.js";

import {
  certificateSchema,
  updateCertificateSchema,
} from "../modules/certificate/certificate.validator.js";

import asyncHandler from "../utils/asyncHandler.js";
import requireAdmin from "../middleware/requireAdmin.js";
import validateBody from "../middleware/validateBody.js";

const router = Router();

// Public
router.get(
  "/",
  asyncHandler(certificateController.getPublic)
);

// Admin
router.get(
  "/admin",
  requireAdmin,
  asyncHandler(certificateController.getAdmin)
);

router.post(
  "/",
  requireAdmin,
  validateBody(certificateSchema),
  asyncHandler(certificateController.create)
);

router.patch(
  "/:id",
  requireAdmin,
  validateBody(updateCertificateSchema),
  asyncHandler(certificateController.update)
);

router.delete(
  "/:id",
  requireAdmin,
  asyncHandler(certificateController.remove)
);

export default router;