import { AuthResponse, LoginRequest, RegisterRequest } from '@/interface/auth.interface';
import client from '.';

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
  async getUsers(): Promise<any[]> {
    const response = await client.get('/users');
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
