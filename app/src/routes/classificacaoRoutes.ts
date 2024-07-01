import { Router } from "express";
import { Classificacao } from "../models/Classificacao";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);

// Obter todas as Classificações do usuário autenticado
router.get("/classificacoes", async (req, res) => {
  const classificacoes = await Classificacao.find();
  res.json(classificacoes);
});

// Criar uma nova Classificação
router.post("/classificacoes", async (req, res) => {
  const { nome, descricao } = req.body;
  const classificacao = Classificacao.create({ nome, descricao });
  await classificacao.save();
  res.status(201).json(classificacao);
});

export { router as classificacaoRoutes };
