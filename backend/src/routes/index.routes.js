import { Router } from "express";

import authRoutes from "./auth.routes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,

    message: "Portfolio CMS API is running",

    data: {
      status: "healthy",

      service: "portfolio-backend",
    },
  });
});

router.use(
  "/auth",

  authRoutes
);

export default router;