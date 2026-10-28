import { ApiError } from "../utils/ApiError.js";

export const errorMiddleware = (
  error,
  req,
  res,
  next
) => {
  let statusCode = 500;

  let message = "Internal Server Error";

  let errors = [];

  if (error instanceof ApiError) {
    statusCode = error.statusCode;

    message = error.message;

    errors = error.errors;
  }

  if (error.name === "ValidationError") {
    statusCode = 400;

    message = "Validation failed";

    errors = Object.values(error.errors).map(
      (item) => item.message
    );
  }

  if (error.name === "CastError") {
    statusCode = 400;

    message = "Invalid resource identifier";
  }

  if (error.code === 11000) {
    statusCode = 409;

    message = "Duplicate resource";
  }

  if (process.env.NODE_ENV !== "production") {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,

    message,

    errors,

    ...(process.env.NODE_ENV !== "production" && {
      stack: error.stack,
    }),
  });
};
