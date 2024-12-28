import { Router } from "express";
import { Renda } from "../models/Renda";
import { AppDataSource } from "../config/ormconfig";
import { authMiddleware } from "../middleware/authMiddleware";

const rendaRepostory = AppDataSource.getRepository(Renda);

const router = Router();
router.use(authMiddleware);

// Criar Renda
router.post("/rendas", async (req, res) => {
  const { usuarioId, valor, mes } = req.body;

  try {
    const renda = rendaRepostory.create({
      usuario: { id: usuarioId },
      valor,
      mes,
    });
    await renda.save();
    res.status(201).json(renda);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar renda", error });
  }
});

// Listar Rendas
router.get("/rendas", async (req, res) => {
  const { usuarioId } = req.query;

  console.log("ID usuario para buscar" + usuarioId);

  try {
    const rendas = await rendaRepostory.find({
      where: { usuario: { id: Number(usuarioId) } },
    });
    res.json(rendas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar rendas", error });
  }
});

export { router as rendaRoutes };
