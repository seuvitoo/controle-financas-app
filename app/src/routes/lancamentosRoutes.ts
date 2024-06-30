import { Router } from 'express';
import { Lancamentos } from '../models/Lancamentos';
import { authMiddleware } from '../middleware/authMiddleware';


const router = Router();
router.use(authMiddleware);

// Obter todos os lançamentos
router.get('/lancamentos', async (req, res) => {
  const lancamentos = await Lancamentos.find();
  res.json(lancamentos);
});

// Obter um lançamento pelo ID
router.get('/lancamentos/:id', async (req, res) => {
  const { id } = req.params;
  const lancamento = await Lancamentos.findOneBy({ id: parseInt(id) });
  if (!lancamento) {
    return res.status(404).json({ message: 'Lançamento não encontrado' });
  }
  res.json(lancamento);
});

// Criar um novo lançamento
router.post('/lancamentos', async (req, res) => {
  const { valor, dataRealizada, fluxo, tipoFluxo, classificacao, observacao } = req.body;
  const lancamento = Lancamentos.create({ valor, dataRealizada, fluxo, tipoFluxo, classificacao, observacao });
  await lancamento.save();
  res.status(201).json(lancamento);
});

// Atualizar um lançamento pelo ID
router.put('/lancamentos/:id', async (req, res) => {
  const { id } = req.params;
  const { valor, dataRealizada, fluxo, tipoFluxo, classificacao, observacao } = req.body;
  const lancamento = await Lancamentos.findOneBy({ id: parseInt(id) });
  if (!lancamento) {
    return res.status(404).json({ message: 'Lançamento não encontrado' });
  }
  lancamento.valor = valor;
  lancamento.dataRealizada = dataRealizada;
  lancamento.fluxo = fluxo;
  lancamento.tipoFluxo = tipoFluxo;
  lancamento.classificacao = classificacao;
  lancamento.observacao = observacao;
  await lancamento.save();
  res.json(lancamento);
});

// Deletar um lançamento pelo ID
router.delete('/lancamentos/:id', async (req, res) => {
  const { id } = req.params;
  const lancamento = await Lancamentos.findOneBy({ id: parseInt(id) });
  if (!lancamento) {
    return res.status(404).json({ message: 'Lançamento não encontrado' });
  }
  await lancamento.remove();
  res.status(204).send();
});

export { router as lancamentosRoutes };