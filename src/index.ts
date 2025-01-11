// Imports
import express from 'express';
import { config as dotenv } from 'dotenv';
import type { Application, Request, Response } from 'express';

// Controllers
import {
  getUser,
  getManyUser,
  createUser,
} from './controllers/user.controller';

// TS
import { User } from './types';

// Initializations
dotenv();
const app: Application = express();
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Users
app.get('/users', async (req: Request, res: Response) => {
  const users = getManyUser();
  res.json(users);
});

app.get('/users/:email', async (req: Request, res: Response) => {
  const user = await getUser(req.params.email);
  res.json(user);
});

app.post('/user/new', async (req: Request, res: Response): Promise<any> => {
  const { name, lastName, email, password } = req.body;

  const userAlreadyExists = await getUser(email);

  if (userAlreadyExists !== null) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user: User = {
    user_id: '',
    user_name: name,
    user_last_name: lastName,
    user_email: email,
    user_password: password,
  };

  const newUser = await createUser(user);

  res.json(newUser);
});

// Server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
