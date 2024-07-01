import express from "express";
import { json } from "body-parser";
import { AppDataSource } from "./config/ormconfig";
import { initializePredefinedValues } from "./config/predefinedValues";
import { userRoutes } from "./routes/userRoutes";
import { classificacaoRoutes } from "./routes/classificacaoRoutes";
import { flowRoutes } from "./routes/flowRoutes";
import { transactionRoutes } from "./routes/transactionRoutes";
import { budgetRoutes } from "./routes/budgetRoutes";

const app = express();
app.use(json());

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Connected to the SQLite database");

    await initializePredefinedValues();
    console.log("Predefined values initialized");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }

  app.use("/auth", userRoutes);
  app.use("/api", classificacaoRoutes);
  app.use("/api", flowRoutes);
  app.use("/api", transactionRoutes);
  app.use("/api", budgetRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
