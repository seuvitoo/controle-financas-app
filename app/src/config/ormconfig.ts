import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "qaninja",
  database: process.env.DB_NAME || "controle_financas",
  entities: ["src/models/**/*.ts"],
  synchronize: true, // Para desenvolvimento; remova em produção
  logging: false,
});
