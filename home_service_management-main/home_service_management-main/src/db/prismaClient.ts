// src/db/prismaClient.ts
import { PrismaClient } from "../../generated/prisma";
import dotenv from "dotenv";

dotenv.config();

declare global {
  var prisma: PrismaClient | undefined;
}

const prismaClientGlobal =
  global.prisma ||
  new PrismaClient({
    log: [],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prismaClientGlobal;
}

export default prismaClientGlobal;
