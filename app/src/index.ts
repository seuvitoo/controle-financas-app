import express from 'express';
import { json } from 'body-parser';
import { createConnection } from 'typeorm';
import { getConnectionOptions } from 'typeorm';

const app = express();
app.use(json());

const startServer = async () => {
  try {
    const connectionOptions = await getConnectionOptions();
    await createConnection({ ...connectionOptions });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database', error);
  }

  app.get('/', (req, res) => {
    res.send('Controle de Finanças API');
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();