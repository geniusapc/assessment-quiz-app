import { errorHandler, notFoundHandler } from "@/middleware/error";
import { Router } from "express";

import healthRoutes from "./health.routes";

const router = Router();
const apiV1 = Router();


apiV1.use("/auth", (req, res) => { res.send("Auth route v1") });
router.use("/api/v1", apiV1);
router.use("/health", healthRoutes);

// Error handling (order matters)
router.use(notFoundHandler);
router.use(errorHandler);

export default router;
