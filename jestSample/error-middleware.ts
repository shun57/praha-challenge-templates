import { UnauthorizedError } from "express-jwt";
import type { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    next(error);
  } else if (error instanceof UnauthorizedError) {
    res.status(401);
    res.json({ code: error.code, message: error.message });
  } else {
    res.status(500);
    res.json({
      message: error.message,
      // 本番環境ではないため、stack プロパティを追加
      ...(process.env.NODE_ENV === "production"
        ? null
        : { stack: error.stack }),
    });
  }
};

export default errorMiddleware;
