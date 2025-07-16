import { User } from './types';

export interface Account {
  userId: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
  createdBy: string;
}

export interface AccountResponse {
  userId: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
  createdBy: string;
  updatedBy: string | null;
  id: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
}
