'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth, AuthContextType } from '@/hooks/useAuth';

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Context provider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
}

// Export the context for advanced use cases
export { AuthContext };
