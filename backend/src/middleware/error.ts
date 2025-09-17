import { logger } from "@/utils/logger";
import type { Request, Response, NextFunction } from "express";

export const notFoundHandler = (_req: Request, res: Response) => {
    res.status(404).json({ error: "Not Found" });
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    logger.error({ err }, "Unhandled error");

    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
    });
};
