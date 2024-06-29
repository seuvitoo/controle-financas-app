import express from 'express';
import { json } from 'body-parser';
import { AppDataSource } from './config/ormconfig';
import { lancamentosRoutes } from './routes/lancamentosRoutes';

const app = express();
app.use(json());

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Connected to the SQLite database');
  } catch (error) {
    console.error('Error connecting to the database', error);
  }

  app.use('/api', lancamentosRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();