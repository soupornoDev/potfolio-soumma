import mongoose from "mongoose";

import { env } from "./env.js";

export const connectDatabase = async () => {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(env.MONGODB_URI, {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully");

    console.log(
      `Database: ${mongoose.connection.name}`
    );
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    throw error;
  }
};
