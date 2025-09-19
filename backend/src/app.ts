import express from "express";
import compression from "compression";
import { requestLogger } from "@/middlewares/request-logger.middleware";
import { securityMiddleware } from "@/middlewares/security";
import { errorHandler, notFoundHandler } from "@/middlewares/error.middleware";
import routes from "@/routes/index";

const app = express();

// Core parsers
app.use(express.json());

// Security & performance
app.use(...securityMiddleware);
app.use(requestLogger);
app.use(compression());

// Mount routes
app.use("/", routes);

// Error handling (last)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
