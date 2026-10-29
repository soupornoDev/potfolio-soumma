import { Router } from "express";

import {
  getProjects,
  getProjectBySlug,
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

import {
  requireAdmin,
} from "../middleware/auth.middleware.js";

import {
  validateBody,
} from "../middleware/validate.middleware.js";

import {
  projectSchema,
} from "../validators/project.validator.js";

const router = Router();

// Public Routes

router.get("/", getProjects);

router.get(
  "/slug/:slug",
  getProjectBySlug
);

// Admin Routes

router.get(
  "/admin",
  requireAdmin,
  getAdminProjects
);

router.post(
  "/",
  requireAdmin,
  validateBody(projectSchema),
  createProject
);

router.patch(
  "/:id",
  requireAdmin,
  validateBody(projectSchema),
  updateProject
);

router.delete(
  "/:id",
  requireAdmin,
  deleteProject
);

export default router;