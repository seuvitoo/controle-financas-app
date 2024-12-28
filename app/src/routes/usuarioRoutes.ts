import { Router } from "express";
import { Usuario } from "../models/Usuario";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../config/ormconfig";

const router = Router();

const userRepository = AppDataSource.getRepository(Usuario);
router.post("/register", async (req, res) => {

  const { nome, email, senha } = req.body;
  const usuario = userRepository.create({ nome, email, senha, data_criacao: new Date() });
  
  await usuario.save();
  res.status(201).json(usuario);
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await userRepository.findOneBy({ email });

  if (!usuario) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  const isValid = await usuario.compararSenha(senha);

  if (!isValid) {
    return res.status(401).json({ message: "Senha inválida" });
  }

  const token = jwt.sign({ id: usuario.id }, "secret", { expiresIn: "1h" });

  res.json({ token });
});

export { router as usuarioRoutes };
