import { Router } from "express";
import { Transacao } from "../models/Transacao";
import { authMiddleware } from "../middleware/authMiddleware";
import { AppDataSource } from "../config/ormconfig";

const router = Router();
router.use(authMiddleware);

const transacaoRepository = AppDataSource.getRepository(Transacao);

// Criar Transação
router.post("/transacao", async (req, res) => {
  const usuarioId = "1";
  const { categoriaId, valor, tipo, descricao, data } = req.body;

  try {
    const transacao = transacaoRepository.create({
      usuario: { id: Number(usuarioId) },
      categoria: { id: categoriaId },
      valor,
      tipo,
      descricao,
      data,
    });
    await transacao.save();
    res.status(201).json(transacao);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar transação", error });
  }
});

export { router as transacaoRoutes };
