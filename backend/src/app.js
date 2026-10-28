import express from "express";

import cors from "cors";

import helmet from "helmet";

import compression from "compression";

import cookieParser from "cookie-parser";

import rateLimit from "express-rate-limit";

import pinoHttp from "pino-http";

import pino from "pino";

import { env } from "./config/env.js";

import apiRoutes from "./routes/index.routes.js";

import { errorMiddleware } from "./middleware/error.middleware.js";

import { notFoundMiddleware } from "./middleware/notFound.middleware.js";

const app = express();

const logger = pino({
  level:
    env.NODE_ENV === "production"
      ? "info"
      : "debug",
});

app.set("trust proxy", 1);

app.use(
  pinoHttp({
    logger,
  })
);

app.use(
  helmet()
);

app.use(
  cors({
    origin: env.FRONTEND_URL,

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
    ],
  })
);

app.use(
  compression()
);

app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,

    limit: "1mb",
  })
);

app.use(
  cookieParser()
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,

    limit: 200,

    standardHeaders: "draft-7",

    legacyHeaders: false,

    message: {
      success: false,

      message: "Too many requests. Please try again later.",
    },
  })
);

app.use(
  env.API_PREFIX,

  apiRoutes
);

app.use(
  notFoundMiddleware
);

app.use(
  errorMiddleware
);

export default app;
