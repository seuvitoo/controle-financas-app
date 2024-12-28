import express from "express";
import { json } from "body-parser";
import { AppDataSource } from "./config/ormconfig";
import { usuarioRoutes } from "./routes/usuarioRoutes";
import { rendaRoutes } from "./routes/rendaRoutes";

const app = express();
app.use(json());

const startServer = async () => {
  try {
    await AppDataSource.initialize().then(() =>
      console.log("Conexão com PostgreSQL via Docker bem-sucedida!")
    );
  } catch (err) {
    console.error("Erro ao conectar ao banco:", err);
  }

  app.use("/auth", usuarioRoutes);
  app.use("/api", rendaRoutes);

  const PORT = process.env.PORT ?? 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
