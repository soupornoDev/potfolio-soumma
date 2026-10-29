import Project from "../models/Project.js";

import { ApiError } from "../utils/ApiError.js";

import { asyncHandler } from "../utils/asyncHandler.js";

export const getProjects = asyncHandler(
  async (req, res) => {
    const projects = await Project.find({
      published: true,
    })
      .sort({
        featured: -1,
        order: 1,
        createdAt: -1,
      })
      .lean();

    res.status(200).json({
      success: true,
      data: {
        projects,
      },
    });
  }
);

export const getProjectBySlug =
  asyncHandler(
    async (req, res) => {
      const project = await Project.findOne({
        slug: req.params.slug,
        published: true,
      }).lean();

      if (!project) {
        throw new ApiError(
          404,
          "Project not found"
        );
      }

      res.status(200).json({
        success: true,
        data: {
          project,
        },
      });
    }
  );

export const getAdminProjects =
  asyncHandler(
    async (req, res) => {
      const projects = await Project.find()
        .sort({
          order: 1,
          createdAt: -1,
        })
        .lean();

      res.status(200).json({
        success: true,
        data: {
          projects,
        },
      });
    }
  );

export const createProject =
  asyncHandler(
    async (req, res) => {
      const project = await Project.create(
        req.validatedBody
      );

      res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: {
          project,
        },
      });
    }
  );

export const updateProject =
  asyncHandler(
    async (req, res) => {
      const project =
        await Project.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.validatedBody,
          },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!project) {
        throw new ApiError(
          404,
          "Project not found"
        );
      }

      res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: {
          project,
        },
      });
    }
  );

export const deleteProject =
  asyncHandler(
    async (req, res) => {
      const project =
        await Project.findByIdAndDelete(
          req.params.id
        );

      if (!project) {
        throw new ApiError(
          404,
          "Project not found"
        );
      }

      res.status(200).json({
        success: true,
        message: "Project deleted successfully",
      });
    }
  );