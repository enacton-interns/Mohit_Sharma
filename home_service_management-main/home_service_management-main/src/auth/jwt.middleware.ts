import { Request, Response, NextFunction } from "express";
import prisma from "../db/prismaClient";
import { verifyToken } from "./utils/token.util";

interface TokenPayload {
  userId: number;
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "No token in cookies" });
  }

  const payload = verifyToken(token) as TokenPayload | null;
  if (!payload) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });
  if (!user) {
    return res.status(401).json({ error: "Invalid token" });
  }

  (req as any).user = user;
  next();
}
