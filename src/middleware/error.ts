import { Request, Response, NextFunction } from "express";

export const notFound = (req:Request, res: Response, next:NextFunction) =>{
    res.status(404).json({
        error: "Not found",
        message: `${req.originalUrl}`
    })
}

export const errorMiddleware = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    const anyErr = err as any;
    if (anyErr && typeof anyErr === 'object' && typeof anyErr.status === 'number') {
        return res.status(anyErr.status).json({ message: anyErr.message ?? 'Error', details: anyErr.details });
    }
    return res.status(500).json({ message: "Internal server error" });
};


