import cors from "cors";
import helmet from "helmet";
import { env } from "@/config/env";

export const securityMiddleware = [
    cors({
        origin: env.CORS_ORIGIN === "*" ? true : env.CORS_ORIGIN.split(","),
        credentials: true,
    }),

    // Helmet (adds security headers)
    helmet({
        contentSecurityPolicy: env.isProd,
        crossOriginEmbedderPolicy: false,
    }),
];
