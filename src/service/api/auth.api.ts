import { AuthResponse, LoginRequest, RegisterRequest } from '@/interface/auth.interface';
import client from '.';
import { User } from '@/interface/types';

class AuthApiService {
  // Auth endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await client.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await client.post<AuthResponse>('/auth/register', userData);
    return response.data;
  }

  async getProfile(): Promise<any> {
    const response = await client.get('/auth/profile');
    return response.data;
  }

  // User endpoints
  async getUsers(): Promise<User[]> {
    const response = await client.get('/users');
    return response.data;
  }

  async getUserCurrentProfile(): Promise<User> {
    const response = await client.get(`/users/profile`);
    return response.data;
  }

  async getUserById(id: string): Promise<User> {
    const response = await client.get(`/users/${id}`);
    return response.data;
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const response = await client.post<User>('/users', userData);
    return response.data;
  }

  async updateUser(id: string, userData: any): Promise<any> {
    const response = await client.patch(`/users/${id}`, userData);
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    await client.delete(`/users/${id}`);
  }
}

export const authApiService = new AuthApiService();
