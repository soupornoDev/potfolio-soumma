import Blog from "./blog.model.js";
import ApiError from "../../utils/ApiError.js";

export async function getPublicBlogs(req, res) {
  const blogs = await Blog.find({ published: true })
    .select("-content")
    .sort({ publishedAt: -1, createdAt: -1 });

  res.status(200).json({
    success: true,
    count: blogs.length,
    data: blogs,
  });
}

export async function getPublicBlogBySlug(req, res) {
  const blog = await Blog.findOne({
    slug: req.params.slug,
    published: true,
  });

  if (!blog) {
    throw new ApiError(404, "Blog post not found");
  }

  res.status(200).json({
    success: true,
    data: blog,
  });
}

export async function getAdminBlogs(req, res) {
  const blogs = await Blog.find().sort({ updatedAt: -1 });

  res.status(200).json({
    success: true,
    count: blogs.length,
    data: blogs,
  });
}

export async function createBlog(req, res) {
  const payload = { ...req.validatedBody };

  if (payload.published && !payload.publishedAt) {
    payload.publishedAt = new Date();
  }

  const blog = await Blog.create(payload);

  res.status(201).json({
    success: true,
    data: blog,
  });
}

export async function updateBlog(req, res) {
  const payload = { ...req.validatedBody };

  if (payload.published === true && !payload.publishedAt) {
    payload.publishedAt = new Date();
  }

  if (payload.published === false) {
    payload.publishedAt = null;
  }

  const blog = await Blog.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });

  if (!blog) {
    throw new ApiError(404, "Blog post not found");
  }

  res.status(200).json({
    success: true,
    data: blog,
  });
}

export async function deleteBlog(req, res) {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) {
    throw new ApiError(404, "Blog post not found");
  }

  res.status(200).json({
    success: true,
    message: "Blog post deleted",
  });
}