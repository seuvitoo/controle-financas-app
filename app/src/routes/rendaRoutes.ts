import { Router } from "express";
import { Renda } from "../models/Renda";

const router = Router();

// Criar Renda
router.post("/rendas", async (req, res) => {
  const { usuarioId, valor, mes } = req.body;

  try {
    const renda = Renda.create({ usuario: { id: usuarioId }, valor, mes });
    await renda.save();
    res.status(201).json(renda);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar renda", error });
  }
});

// Listar Rendas
// router.get("/rendas", async (req, res) => {
//   const { usuarioId } = req.query;

//   try {
//     const rendas = await Renda.find({ where: { usuario: { id: usuarioId } } });
//     res.json(rendas);
//   } catch (error) {
//     res.status(500).json({ message: "Erro ao buscar rendas", error });
//   }
// });

// Atualizar Renda
router.put("/rendas/:id", async (req, res) => {
  const { id } = req.params;
  const { valor } = req.body;

  try {
    const renda = await Renda.findOneBy({ id: parseInt(id) });
    if (!renda) {
      return res.status(404).json({ message: "Renda não encontrada" });
    }

    renda.valor = valor;
    await renda.save();
    res.json(renda);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar renda", error });
  }
});

// Deletar Renda (opcional)
router.delete("/rendas/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const renda = await Renda.findOneBy({ id: parseInt(id) });
    if (!renda) {
      return res.status(404).json({ message: "Renda não encontrada" });
    }

    await renda.remove();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar renda", error });
  }
});

export { router as rendaRoutes };