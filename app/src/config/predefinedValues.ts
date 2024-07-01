import { AppDataSource } from "./ormconfig";
import { Classificacao } from "../models/Classificacao";
import { Categoria } from "../models/Categoria";
import { Flow } from "../models/Flow";

const predefinedClassificacoes = [
  { nome: "Despesa", descricao: "Gastos gerais" },
  { nome: "Investimento", descricao: "Investimentos financeiros" },
  { nome: "Despesa Futura", descricao: "Gastos planejados para o futuro" },
  { nome: "Receita", descricao: "Rendimentos e ganhos" },
];

const predefinedCategorias = [
  {
    nome: "Necessidade Básicas",
    classificacao_nome: "Despesa",
    percentual: 50,
  },
  { nome: "Lazer", classificacao_nome: "Despesa", percentual: 20 },
  { nome: "Educação", classificacao_nome: "Despesa", percentual: 5 },
  { nome: "Longo Prazo", classificacao_nome: "Investimento", percentual: 15 },
  { nome: "Longo Prazo", classificacao_nome: "Despesa Futura", percentual: 15 },
  { nome: "Investimentos", classificacao_nome: "Investimento", percentual: 10 },
  { nome: "Receitas", classificacao_nome: "Receita", percentual: 0 },
];

const predefinedFlows = [
  { nome: "Aluguel", categoria_nome: "Necessidade Básicas" },
  { nome: "Internet + TV", categoria_nome: "Necessidade Básicas" },
  { nome: "Celular", categoria_nome: "Necessidade Básicas" },
  { nome: "Transporte", categoria_nome: "Necessidade Básicas" },
  { nome: "Cartão de Crédito", categoria_nome: "Necessidade Básicas" },
  { nome: "Saúde", categoria_nome: "Necessidade Básicas" },
  { nome: "Supermercado", categoria_nome: "Necessidade Básicas" },
  { nome: "Extras (Casa)", categoria_nome: "Necessidade Básicas" },
  {
    nome: "Outros (Necessidades básicas)",
    categoria_nome: "Necessidade Básicas",
  },
  { nome: "Educação", categoria_nome: "Educação" },
  { nome: "Alimentação (Gastos extras)", categoria_nome: "Lazer" },
  { nome: "Assinaturas Mensais", categoria_nome: "Lazer" },
  { nome: "Entretenimento mensal", categoria_nome: "Lazer" },
  { nome: "Outros (lazer)", categoria_nome: "Lazer" },
  { nome: "Cuidados Pessoais", categoria_nome: "Lazer" },
  { nome: "Bares", categoria_nome: "Lazer" },
  { nome: "Viagem", categoria_nome: "Lazer" },
  { nome: "Exterior", categoria_nome: "Longo Prazo" },
  { nome: "Longo prazo", categoria_nome: "Longo Prazo" },
  { nome: "Liberdade Financeira", categoria_nome: "Investimentos" },
  { nome: "Reserva de Emergência", categoria_nome: "Investimentos" },
  { nome: "Outros (Renda)", categoria_nome: "Receitas" },
  { nome: "Salário", categoria_nome: "Receitas" },
];

export const initializePredefinedValues = async () => {
  const classificacaoRepository = AppDataSource.getRepository(Classificacao);
  const categoriaRepository = AppDataSource.getRepository(Categoria);
  const flowRepository = AppDataSource.getRepository(Flow);

  for (const classificacao of predefinedClassificacoes) {
    const existingClassificacao = await classificacaoRepository.findOneBy({
      nome: classificacao.nome,
    });
    if (!existingClassificacao) {
      const newClassificacao = classificacaoRepository.create(classificacao);
      await classificacaoRepository.save(newClassificacao);
    }
  }

  for (const categoria of predefinedCategorias) {
    const classificacao = await classificacaoRepository.findOneBy({
      nome: categoria.classificacao_nome,
    });
    if (classificacao) {
      const existingCategoria = await categoriaRepository.findOneBy({
        nome: categoria.nome,
      });
      if (!existingCategoria) {
        const newCategoria = categoriaRepository.create({
          nome: categoria.nome,
          classificacao,
          percentual: categoria.percentual,
        });
        await categoriaRepository.save(newCategoria);
      }
    }
  }

  for (const flow of predefinedFlows) {
    const categoria = await categoriaRepository.findOneBy({
      nome: flow.categoria_nome,
    });
    const existingFlow = await flowRepository.findOneBy({ nome: flow.nome });
    if (!existingFlow && categoria) {
      const newFlow = flowRepository.create({ nome: flow.nome, categoria });
      await flowRepository.save(newFlow);
    }
  }
};
