import { Router } from "express";
import { Renda } from "../models/Renda";
import { AppDataSource } from "../config/ormconfig";
import { authMiddleware } from "../middleware/authMiddleware";

const rendaRepostory = AppDataSource.getRepository(Renda);

const router = Router();
//router.use(authMiddleware);

// Criar Renda
router.post("/rendas", authMiddleware, async (req, res) => {
  const { valor, mes } = req.body;

  try {
    const usuario = (req as any).usuario; // Obtém o usuário autenticado
    if (!usuario) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const renda = rendaRepostory.create({
      usuario, // Vincula ao usuário autenticado
      valor,
      mes,
    });

    console.log("Valor: " + valor);
    console.log("Mês: " + mes);
    console.log("Usuário: " + usuario.nome);

    await rendaRepostory.save(renda);
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
