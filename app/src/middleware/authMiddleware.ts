import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../models/User";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secret") as { id: number };
    const user = await User.findOneBy({ id: decoded.id });

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    (req as any).user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
