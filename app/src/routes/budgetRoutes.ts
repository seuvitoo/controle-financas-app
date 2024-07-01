import { Router } from "express";
import { Categoria } from "../models/Categoria";
import { Transaction } from "../models/Transaction";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.get("/budget", async (req, res) => {
  const usuario = (req as any).user;

  // Obter todas as transações de receita do usuário logado
  const receitas = await Transaction.find({
    where: { usuario, classificacao: "Receita" },
    relations: ["fluxo"],
  });

  // Calcular a soma das receitas
  const totalReceitas = receitas.reduce(
    (total, receita) => total + receita.valor,
    0
  );

  // Obter todas as categorias
  const categorias = await Categoria.find({
    relations: ["classificacao", "flows"],
  });

  // Obter todas as transações de despesa do usuário logado
  const despesas = await Transaction.find({
    where: { usuario, classificacao: "Despesa" },
    relations: ["fluxo", "fluxo.categoria"],
  });

  // Calcular os gastos atuais por categoria
  const gastosPorCategoria = despesas.reduce<{ [key: string]: number }>(
    (acc, despesa) => {
      const categoriaNome = despesa.fluxo.categoria.nome;
      if (!acc[categoriaNome]) {
        acc[categoriaNome] = 0;
      }
      acc[categoriaNome] += despesa.valor;
      return acc;
    },
    {}
  );

  // Calcular o orçamento para cada categoria
  const orcamento = categorias.map((categoria) => {
    const valorPlanejado = (totalReceitas * categoria.percentual) / 100;
    const gastosAtuais = gastosPorCategoria[categoria.nome] || 0;
    const valorRestante = valorPlanejado - gastosAtuais;

    return {
      categoria: categoria.nome,
      classificacao: categoria.classificacao.nome,
      percentual: categoria.percentual,
      valorPlanejado,
      gastosAtuais,
      valorRestante,
    };
  });

  // Responder com o orçamento e o total de receitas
  res.json({
    totalReceitas,
    orcamento,
  });
});

export { router as budgetRoutes };
