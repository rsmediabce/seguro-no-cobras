// src/services/userService.ts
// Servicio para gestionar la autenticación y datos de usuarios

import { users } from '../data/users';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
}

export const authenticateUser = (email: string, password: string): User | null => {
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
};

export const getAllUsers = (): User[] => {
  return users;
};