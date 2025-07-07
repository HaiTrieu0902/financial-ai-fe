'use client';

import { useAuthContext } from '@/context/useAuthContext';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { PATH_DEFAULT } from '@/constants/path';

export interface GuestGuardProps {
  children: React.ReactNode;
}

/**
 * GuestGuard - Protects routes that should only be accessible to non-authenticated users
 * (like login, register pages). Redirects authenticated users to dashboard.
 */
const GuestGuard = ({ children }: GuestGuardProps) => {
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang as string;
  const { isAuthenticated, loading: authLoading } = useAuthContext();

  useEffect(() => {
    // Only redirect if we're sure the user is authenticated and not loading
    if (!authLoading && isAuthenticated) {
      const dashboardPath = `/${lang}/${PATH_DEFAULT.dashboard}`;
      router.replace(dashboardPath);
    }
  }, [isAuthenticated, authLoading, lang, router]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <Box className="flex flex-col items-center gap-4">
          <CircularProgress size={40} className="text-blue-600" />
          <Typography className="text-gray-600 font-medium">Checking authentication...</Typography>
        </Box>
      </Box>
    );
  }

  // Don't render anything if user is authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  // Render children if user is not authenticated (guest)
  return <>{children}</>;
};

export default GuestGuard;
