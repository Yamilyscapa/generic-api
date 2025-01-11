import prisma from '../database';
import { v4 as uuid } from 'uuid';
import { hashPassword } from '../utils/passwordHash';

// Types
import { User } from '../types';

export async function getUser(userEmail: string): Promise<User | null> {
  const user = await prisma.users.findFirst({
    where: {
      user_email: userEmail,
    },
  });

  return user;
}

export async function getManyUser(): Promise<User[]> {
  const users = await prisma.users.findMany();
  return users;
}

export async function createUser(user: User): Promise<User> {
  const id = uuid();

  user.user_id = id;
  user.user_password = await hashPassword(user.user_password, 10);

  const newUser = await prisma.users.create({
    data: { ...(user as any) },
  });

  return newUser;
}
