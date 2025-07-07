'use client';

import { useAuthContext } from '@/context/useAuthContext';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { PATH_DEFAULT } from '@/constants/path';

export interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard - Protects routes that should only be accessible to authenticated users
 * (like dashboard, profile pages). Redirects unauthenticated users to login.
 */
const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang as string;

  const { isAuthenticated, loading: authLoading } = useAuthContext();

  useEffect(() => {
    // Only redirect if we're sure the user is NOT authenticated and not loading
    if (!authLoading && !isAuthenticated) {
      const loginPath = `/${lang}/${PATH_DEFAULT.auth.login}`;
      router.replace(loginPath);
    }
  }, [isAuthenticated, authLoading, lang, router]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <Box className="flex flex-col items-center gap-4">
          <CircularProgress size={40} className="text-blue-600" />
          <Typography className="text-gray-600 font-medium">Loading your dashboard...</Typography>
        </Box>
      </Box>
    );
  }

  // Don't render anything if user is not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  // Render children if user is authenticated
  return <>{children}</>;
};

export default AuthGuard;
