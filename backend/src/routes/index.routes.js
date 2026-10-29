import { Router } from "express";

import authRoutes from "./auth.routes.js";

import profileRoutes from "./profile.routes.js";

import skillRoutes from "./skill.routes.js";

import projectRoutes from "./project.routes.js";

const router = Router();

router.get(
  "/health",
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Portfolio CMS API is running",
    });
  }
);

router.use(
  "/auth",
  authRoutes
);

router.use(
  "/profile",
  profileRoutes
);

router.use(
  "/skills",
  skillRoutes
);

router.use(
  "/projects",
  projectRoutes
);

export default router;