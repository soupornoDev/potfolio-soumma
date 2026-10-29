import Profile from "../models/Profile.js";

import { ApiError } from "../utils/ApiError.js";

import { asyncHandler } from "../utils/asyncHandler.js";

export const getProfile = asyncHandler(
  async (req, res) => {
    const profile = await Profile.findOne()
      .lean();

    if (!profile) {
      throw new ApiError(
        404,
        "Profile not found"
      );
    }

    res.status(200).json({
      success: true,

      data: {
        profile,
      },
    });
  }
);

export const createOrUpdateProfile =
  asyncHandler(
    async (req, res) => {
      const profileData =
        req.validatedBody;

      const profile =
        await Profile.findOneAndUpdate(
          {},
          {
            $set: profileData,
          },
          {
            new: true,

            upsert: true,

            runValidators: true,

            setDefaultsOnInsert: true,
          }
        );

      res.status(200).json({
        success: true,

        message: "Profile saved successfully",

        data: {
          profile,
        },
      });
    }
  );