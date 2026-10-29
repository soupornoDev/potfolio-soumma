import { Router } from "express";

import {
  loginAdmin,

  logoutAdmin,

  getCurrentAdmin,
} from "../controllers/auth.controller.js";

import {
  validateBody,
} from "../middleware/validate.middleware.js";

import {
  requireAdmin,
} from "../middleware/auth.middleware.js";

import {
  loginSchema,
} from "../validators/auth.validator.js";

const router = Router();

router.post(
  "/login",

  validateBody(loginSchema),

  loginAdmin
);

router.post(
  "/logout",

  requireAdmin,

  logoutAdmin
);

router.get(
  "/me",

  requireAdmin,

  getCurrentAdmin
);

export default router;