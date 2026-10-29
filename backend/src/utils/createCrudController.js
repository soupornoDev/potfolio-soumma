// backend/src/utils/createCrudController.js

import { ApiError } from "./ApiError.js";

/**
 * Creates standard CRUD controller handlers.
 *
 * @param {object} Model - Mongoose model
 * @param {object} options - Controller configuration
 */
export const createCrudController = (
  Model,
  {
    resourceName = "Resource",
    sort = { createdAt: -1 },
    populate = [],
  } = {}
) => {
  const getAll = async (req, res) => {
    const items = await Model.find()
      .sort(sort)
      .populate(populate);

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  };

  const getById = async (req, res) => {
    const item = await Model.findById(req.params.id).populate(populate);

    if (!item) {
      throw new ApiError(404, `${resourceName} not found`);
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  };

  const create = async (req, res) => {
    const item = await Model.create(req.validatedBody);

    res.status(201).json({
      success: true,
      message: `${resourceName} created successfully`,
      data: item,
    });
  };

  const update = async (req, res) => {
    const item = await Model.findByIdAndUpdate(
      req.params.id,
      req.validatedBody,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!item) {
      throw new ApiError(404, `${resourceName} not found`);
    }

    res.status(200).json({
      success: true,
      message: `${resourceName} updated successfully`,
      data: item,
    });
  };

  const remove = async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);

    if (!item) {
      throw new ApiError(404, `${resourceName} not found`);
    }

    res.status(200).json({
      success: true,
      message: `${resourceName} deleted successfully`,
    });
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove,
  };
};

export default createCrudController;