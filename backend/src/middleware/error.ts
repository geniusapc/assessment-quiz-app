import type { Request, Response, NextFunction } from "express";

// 404 handler
export const notFoundHandler = (_req: Request, res: Response) => {
    res.status(404).json({ error: "Not Found" });
};

// General error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Error:", err);

    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
    });
};
