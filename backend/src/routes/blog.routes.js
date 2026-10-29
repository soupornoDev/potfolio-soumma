import { Router } from "express";

import {
  getPublicBlogs,
  getPublicBlogBySlug,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../modules/blog/blog.controller.js";

import {
  blogSchema,
  updateBlogSchema,
} from "../modules/blog/blog.validator.js";

import { asyncHandler } from "../utils/asyncHandler.js";

import { requireAdmin } from "../middleware/auth.middleware.js";

import { validateBody } from "../middleware/validate.middleware.js";

const router = Router();

// Public: Published blog posts
router.get(
  "/",
  asyncHandler(getPublicBlogs)
);

// Public: Single blog post by slug
router.get(
  "/slug/:slug",
  asyncHandler(getPublicBlogBySlug)
);

// Admin: All blog posts
router.get(
  "/admin",
  requireAdmin,
  asyncHandler(getAdminBlogs)
);

// Admin: Create blog post
router.post(
  "/",
  requireAdmin,
  validateBody(blogSchema),
  asyncHandler(createBlog)
);

// Admin: Update blog post
router.patch(
  "/:id",
  requireAdmin,
  validateBody(updateBlogSchema),
  asyncHandler(updateBlog)
);

// Admin: Delete blog post
router.delete(
  "/:id",
  requireAdmin,
  asyncHandler(deleteBlog)
);

export default router;