import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario";

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
    const usuario = await Usuario.findOneBy({ id: decoded.id });

    if (!usuario) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    (req as any).usuario = usuario;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
