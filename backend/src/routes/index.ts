import { Router } from "express";
import healthRoutes from "./health.routes";
import apiV1Routes from "./api-v1.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/api/v1", apiV1Routes);

export default router;
