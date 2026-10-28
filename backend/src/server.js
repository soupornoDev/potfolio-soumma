import app from "./app.js";

import { env } from "./config/env.js";

import { connectDatabase } from "./config/database.js";

import mongoose from "mongoose";

const startServer = async () => {
  try {
    await connectDatabase();

    const server = app.listen(
      env.PORT,

      () => {
        console.log(
          `Server running on port ${env.PORT}`
        );

        console.log(
          `API URL: http://localhost:${env.PORT}${env.API_PREFIX}`
        );
      }
    );

    const shutdown = async (signal) => {
      console.log(`${signal} received`);

      server.close(async () => {
        await mongoose.connection.close();

        console.log("Server shutdown complete");

        process.exit(0);
      });
    };

    process.on(
      "SIGTERM",

      () => shutdown("SIGTERM")
    );

    process.on(
      "SIGINT",

      () => shutdown("SIGINT")
    );
  } catch (error) {
    console.error(
      "Server startup failed:",

      error.message
    );

    process.exit(1);
  }
};

startServer();
