// backend/src/utils/ApiError.js

export class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", errors = null) {
    super(message);

    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;

    Error.captureStackTrace?.(this, ApiError);
  }
}

// Supports default imports too
export default ApiError;