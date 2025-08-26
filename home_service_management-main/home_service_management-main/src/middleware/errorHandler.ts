import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/errors";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  res.status(500).json({ message: "Internal Server Error" });
}
