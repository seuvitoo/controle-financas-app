import { Router } from "express";
import { Transaction } from "../models/Transaction";
import { Flow } from "../models/Flow";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);

// Obter todas as Transactions do usuário autenticado
router.get("/transactions", async (req, res) => {
  const usuario = (req as any).user;
  const transactions = await Transaction.find({
    where: { usuario },
    relations: [
      "usuario",
      "fluxo",
      "fluxo.categoria",
      "fluxo.categoria.classificacao",
    ],
  });
  res.json(transactions);
});

// Criar uma nova Transaction
router.post("/transactions", async (req, res) => {
  const { data, valor, fluxo_id, observacao } = req.body;
  const usuario = (req as any).user;
  const fluxo = await Flow.findOne({
    where: { id: fluxo_id },
    relations: ["categoria", "categoria.classificacao"],
  });

  if (!fluxo) {
    return res.status(404).json({ message: "Fluxo não encontrado" });
  }

  const classificacao = fluxo.categoria.classificacao.nome;

  const transaction = Transaction.create({
    data,
    valor,
    fluxo,
    classificacao,
    observacao,
    usuario,
  });
  await transaction.save();
  res.status(201).json(transaction);
});

export { router as transactionRoutes };
