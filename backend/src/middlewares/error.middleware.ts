import { HttpStatus } from "@/utils/http-status";
import { logger } from "@/utils/logger";
import { ApiResponse } from "@/utils/api-response";
import type { Request, Response, NextFunction } from "express";

export const notFoundHandler = (_req: Request, res: Response) => {
    return ApiResponse.error(res, "Not Found", HttpStatus.NOT_FOUND);
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    logger.error({ err }, "Unhandled error");
    const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || "Internal server error";

    return ApiResponse.error(res, message, status);
};
