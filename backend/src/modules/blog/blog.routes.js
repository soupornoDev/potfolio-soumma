import { Router } from "express";

import {
  getPublicBlogs,
  getPublicBlogBySlug,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "./blog.controller.js";

import { blogSchema, updateBlogSchema } from "./blog.validator.js";

import asyncHandler from "../../utils/asyncHandler.js";
import requireAdmin from "../../middleware/requireAdmin.js";
import validateBody from "../../middleware/validateBody.js";

const router = Router();

// Public routes
router.get("/", asyncHandler(getPublicBlogs));
router.get("/slug/:slug", asyncHandler(getPublicBlogBySlug));

// Admin routes
router.get("/admin", requireAdmin, asyncHandler(getAdminBlogs));

router.post(
  "/",
  requireAdmin,
  validateBody(blogSchema),
  asyncHandler(createBlog)
);

router.patch(
  "/:id",
  requireAdmin,
  validateBody(updateBlogSchema),
  asyncHandler(updateBlog)
);

router.delete("/:id", requireAdmin, asyncHandler(deleteBlog));

export default router;