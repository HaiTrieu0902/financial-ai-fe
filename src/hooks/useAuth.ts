import { KEY_LOCALSTORAGE_SYNC } from '@/constants';
import { useLocalStorageSync } from '@/hooks/useLocalStorageSync';
import { AuthResponse, LoginRequest, RegisterRequest } from '@/interface/auth.interface';
import { User } from '@/interface/types';
import { authApiService } from '@/service/api/auth.api';
import { useEffect, useState } from 'react';

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export function useAuth(): AuthContextType {
  const [token, setToken, removeToken] = useLocalStorageSync<string>(KEY_LOCALSTORAGE_SYNC.token, null);
  const [user, setUser, removeUser] = useLocalStorageSync<User>(KEY_LOCALSTORAGE_SYNC.user, null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      setLoading(true);
      const response: AuthResponse = await authApiService.login(credentials);

      setToken(response.access_token);
      setUser(response.user);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      setLoading(true);
      const response: AuthResponse = await authApiService.register(userData);
      setToken(response.access_token);
      setUser(response.user);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    removeUser();
  };

  return {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token,
  };
}
