import { Router } from "express";

import authRoutes from "./auth.routes.js";

import profileRoutes from "./profile.routes.js";

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

export default router;