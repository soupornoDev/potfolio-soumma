import { Router } from "express";

import authRoutes from "./auth.routes.js";
import profileRoutes from "./profile.routes.js";
import skillRoutes from "./skill.routes.js";
import projectRoutes from "./project.routes.js";

import experienceRoutes from "./experience.routes.js";
import educationRoutes from "./education.routes.js";
import certificateRoutes from "./certificate.routes.js";
import blogRoutes from "./blog.routes.js";
import messageRoutes from "./message.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/skills", skillRoutes);
router.use("/projects", projectRoutes);

router.use("/experience", experienceRoutes);
router.use("/education", educationRoutes);
router.use("/certificates", certificateRoutes);
router.use("/blog", blogRoutes);
router.use("/messages", messageRoutes);

export default router;