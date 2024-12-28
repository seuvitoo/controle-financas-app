import { Router } from "express";
import { Transacao } from "../models/Transacao";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);

// Obter todas as transacao do usuário autenticado
router.get("/transacao", async (req, res) => {
  const usuario = (req as any).usuario;
  const transacao = await Transacao.find({
    where: { usuario },
    relations: [
      "usuario",
      "fluxo",
      "fluxo.categoria",
      "fluxo.categoria.classificacao",
    ],
  });
  res.json(transacao);
});

// Criar uma nova Transaction
router.post("/transacao", async (req, res) => {
  
});

export { router as transactionRoutes };
