import { Router } from "express";
import { Transacao } from "../models/Transacao";
import { authMiddleware } from "../middleware/authMiddleware";
import { AppDataSource } from "../config/ormconfig";
import { Categoria } from "../models/Categoria";

const router = Router();
router.use(authMiddleware);

const transacaoRepository = AppDataSource.getRepository(Transacao);

// Criar Transação
router.post("/transacao", async (req, res) => {
  const { valor, tipo, descricao, data, categoriaNome } = req.body;

  try {
    // Validação do tipo
    if (tipo !== "despesa" && tipo !== "receita") {
      return res
        .status(400)
        .json({ message: "Tipo inválido. Use 'despesa' ou 'receita'." });
    }

    const usuario = (req as any).usuario; // Usuário autenticado
    if (!usuario) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    // Busca a categoria pelo nome
    const categoria = await AppDataSource.getRepository(Categoria).findOneBy({
      nome: categoriaNome,
    });

    if (!categoria) {
      return res.status(404).json({ message: "Categoria não encontrada." });
    }

    // Criação da transação
    const transacao = transacaoRepository.create({
      usuario,
      valor,
      tipo,
      descricao,
      data,
      categoria, // Vincula à categoria encontrada
    });

    await transacaoRepository.save(transacao);
    res.status(201).json(transacao);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar transação", error });
  }
});

export { router as transacaoRoutes };
