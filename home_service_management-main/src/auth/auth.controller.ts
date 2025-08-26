import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const { user, token } = await authService.register(name, email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    });

    res.status(201).json({ user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const { user, token } = await authService.login(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    });

    res.status(200).json({ user });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
}
