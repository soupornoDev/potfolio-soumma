import Skill from "../models/Skill.js";

import { ApiError } from "../utils/ApiError.js";

import { asyncHandler } from "../utils/asyncHandler.js";

export const getSkills = asyncHandler(
  async (req, res) => {
    const skills = await Skill.find()
      .sort({
        order: 1,
        createdAt: -1,
      })
      .lean();

    res.status(200).json({
      success: true,
      data: {
        skills,
      },
    });
  }
);

export const createSkill = asyncHandler(
  async (req, res) => {
    const skill = await Skill.create(
      req.validatedBody
    );

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: {
        skill,
      },
    });
  }
);

export const updateSkill = asyncHandler(
  async (req, res) => {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.validatedBody,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!skill) {
      throw new ApiError(
        404,
        "Skill not found"
      );
    }

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: {
        skill,
      },
    });
  }
);

export const deleteSkill = asyncHandler(
  async (req, res) => {
    const skill = await Skill.findByIdAndDelete(
      req.params.id
    );

    if (!skill) {
      throw new ApiError(
        404,
        "Skill not found"
      );
    }

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  }
);