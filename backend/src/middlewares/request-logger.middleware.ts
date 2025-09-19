import pinoHttp from "pino-http";
import { logger } from "@/utils/logger";
import { env } from "@/config/env";
import { Request, Response, NextFunction } from "express";

const pinoMiddleware = pinoHttp({
    logger,
    customLogLevel(_req, res, err) {
        const { statusCode } = res;
        if ((statusCode && statusCode >= 500) || err) return "error";
        if (statusCode && statusCode >= 400) return "warn";
        return "info";
    },
    serializers: {
        req(req) {
            return { method: req.method, url: req.url };
        },
        res(res) {
            return { statusCode: res.statusCode };
        },
    },
});

export const requestLogger = env.ENABLE_REQUEST_LOG
    ? pinoMiddleware
    : (_req: Request, _res: Response, next: NextFunction) => next();