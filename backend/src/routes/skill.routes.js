import { Router } from "express";

import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skill.controller.js";

import {
  requireAdmin,
} from "../middleware/auth.middleware.js";

import {
  validateBody,
} from "../middleware/validate.middleware.js";

import {
  skillSchema,
} from "../validators/skill.validator.js";

const router = Router();

router.get("/", getSkills);

router.post(
  "/",
  requireAdmin,
  validateBody(skillSchema),
  createSkill
);

router.patch(
  "/:id",
  requireAdmin,
  validateBody(skillSchema),
  updateSkill
);

router.delete(
  "/:id",
  requireAdmin,
  deleteSkill
);

export default router;