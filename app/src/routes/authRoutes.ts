import { Router } from 'express';
import { User } from '../models/User';
import * as jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = User.create({ username, password });
  await user.save();
  res.status(201).json(user);
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOneBy({ username });

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return res.status(401).json({ message: 'Senha inválida' });
  }

  const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });

  res.json({ token });
});

export { router as authRoutes };