import { Router } from "express";

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

export default router;
