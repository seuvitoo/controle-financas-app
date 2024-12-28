import { Usuario } from "../models/Usuario";

declare global {
  namespace Express {
    interface Request {
      usuario?: Usuario; // Adiciona o campo ao tipo Request
    }
  }
}
