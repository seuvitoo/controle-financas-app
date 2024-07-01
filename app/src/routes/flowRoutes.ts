import { Router } from "express";
import { Flow } from "../models/Flow";
import { Categoria } from "../models/Categoria";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);

// Obter todos os Flows
router.get("/flows", async (req, res) => {
  const flows = await Flow.find({
    relations: ["categoria", "categoria.classificacao"],
  });
  res.json(flows);
});

// Criar um novo Flow
router.post("/flows", async (req, res) => {
  const { nome, categoria_id } = req.body;
  const categoria = await Categoria.findOneBy({ id: categoria_id });
  if (!categoria) {
    return res.status(404).json({ message: "Categoria não encontrada" });
  }
  const flow = Flow.create({ nome, categoria });
  await flow.save();
  res.status(201).json(flow);
});

export { router as flowRoutes };
