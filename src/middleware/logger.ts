import { Request, Response, NextFunction } from "express";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
};

export class HttpError extends Error {
    status: number;
    details?: unknown;
    constructor(status: number, message: string, details?: unknown) {
        super(message);
        this.status = status;
        this.details = details;
    }
}

export const notFoundMiddleware = (req: Request, res: Response, _next: NextFunction) => {
    res.status(404).json({ message: "Resource not found", path: req.originalUrl });
};

export const errorMiddleware = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof HttpError) {
        return res.status(err.status).json({ message: err.message, details: err.details });
    }
    return res.status(500).json({ message: "Internal server error" });
};