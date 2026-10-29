import { Router } from "express";

import {
  createMessage,
  getMessages,
  updateMessageStatus,
  deleteMessage,
} from "../modules/message/message.controller.js";

import {
  createMessageSchema,
  updateMessageSchema,
} from "../modules/message/message.validator.js";

import asyncHandler from "../utils/asyncHandler.js";
import requireAdmin from "../middleware/requireAdmin.js";
import validateBody from "../middleware/validateBody.js";

const router = Router();

// Public contact form
router.post(
  "/",
  validateBody(createMessageSchema),
  asyncHandler(createMessage)
);

// Admin inbox
router.get(
  "/",
  requireAdmin,
  asyncHandler(getMessages)
);

router.patch(
  "/:id",
  requireAdmin,
  validateBody(updateMessageSchema),
  asyncHandler(updateMessageStatus)
);

router.delete(
  "/:id",
  requireAdmin,
  asyncHandler(deleteMessage)
);

export default router;