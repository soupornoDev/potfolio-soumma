import { Router } from "express";

import authRoutes from "./auth.routes.js";
import profileRoutes from "../modules/profile/profile.routes.js";
import skillRoutes from "../modules/skill/skill.routes.js";
import projectRoutes from "../modules/project/project.routes.js";

import experienceRoutes from "../modules/experience/experience.routes.js";
import educationRoutes from "../modules/education/education.routes.js";
import certificateRoutes from "../modules/certificate/certificate.routes.js";
import blogRoutes from "../modules/blog/blog.routes.js";
import messageRoutes from "../modules/message/message.routes.js";

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