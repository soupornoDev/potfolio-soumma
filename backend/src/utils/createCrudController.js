import ApiError from "./ApiError.js";

export function createCrudController({
  Model,
  createSchema,
  updateSchema,
  publicFilter = { published: true },
  sort = { order: 1, createdAt: -1 },
}) {
  return {
    // Public: published content only
    getPublic: async (req, res) => {
      const items = await Model.find(publicFilter).sort(sort);

      res.status(200).json({
        success: true,
        count: items.length,
        data: items,
      });
    },

    // Admin: all content
    getAdmin: async (req, res) => {
      const items = await Model.find().sort(sort);

      res.status(200).json({
        success: true,
        count: items.length,
        data: items,
      });
    },

    create: async (req, res) => {
      const item = await Model.create(req.validatedBody);

      res.status(201).json({
        success: true,
        message: "Created successfully",
        data: item,
      });
    },

    update: async (req, res) => {
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
    },

    remove: async (req, res) => {
      const item = await Model.findByIdAndDelete(req.params.id);

      if (!item) {
        throw new ApiError(404, "Item not found");
      }

      res.status(200).json({
        success: true,
        message: "Deleted successfully",
      });
    },
  };
}