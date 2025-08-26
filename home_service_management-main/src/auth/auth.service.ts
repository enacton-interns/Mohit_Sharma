import bcrypt from "bcryptjs";
import prisma from "../db/prismaClient";
import { generateToken } from "./utils/token.util";

export class AuthService {
  async register(name: string, email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    const token = generateToken({ userId: user.id });

    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const token = generateToken({ userId: user.id });

    return { user, token };
  }
}
