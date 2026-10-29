import ApiError from "./ApiError.js";
import asyncHandler from "./asyncHandler.js"; // Default import use kora hoyeche

function createCrudController({
  Model,
  createSchema,
  updateSchema,
  publicFilter = { published: true },
  sort = { order: 1, createdAt: -1 },
}) {
  return {
    // Public: published content only
    getPublic: asyncHandler(async (req, res) => {
      const items = await Model.find(publicFilter).sort(sort);

      res.status(200).json({
        success: true,
        count: items.length,
        data: items,
      });
    }),

    // Admin: all content
    getAdmin: asyncHandler(async (req, res) => {
      const items = await Model.find().sort(sort);

      res.status(200).json({
        success: true,
        count: items.length,
        data: items,
      });
    }),

    create: asyncHandler(async (req, res) => {
      const item = await Model.create(req.validatedBody);

      res.status(201).json({
        success: true,
        message: "Created successfully",
        data: item,
      });
    }),

    update: asyncHandler(async (req, res) => {
      const item = await Model.findByIdAndUpdate(
        req.params.id,
        req.validatedBody,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!item) {
        throw new ApiError(404, "Item not found");
      }

      res.status(200).json({
        success: true,
        message: "Updated successfully",
        data: item,
      });
    }),

    remove: asyncHandler(async (req, res) => {
      const item = await Model.findByIdAndDelete(req.params.id);

      if (!item) {
        throw new ApiError(404, "Item not found");
      }

      res.status(200).json({
        success: true,
        message: "Deleted successfully",
      });
    }),
  };
}

export default createCrudController;
