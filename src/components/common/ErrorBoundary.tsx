'use client';

import { Error, Refresh } from '@mui/icons-material';
import { Alert, Box, Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; reset: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} reset={this.reset} />;
      }

      return <DefaultErrorFallback error={this.state.error} reset={this.reset} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error;
  reset: () => void;
}

function DefaultErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="text-center p-6">
          <Error className="text-6xl text-red-500 mb-4" />
          <Typography variant="h5" className="mb-4 font-bold text-gray-800">
            Something went wrong
          </Typography>
          <Typography variant="body1" className="mb-4 text-gray-600">
            We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the
            problem persists.
          </Typography>

          {error && (
            <Alert severity="error" className="mb-4 text-left">
              <Typography variant="body2" className="font-mono">
                {error.message}
              </Typography>
            </Alert>
          )}

          <Box className="space-y-2">
            <Button variant="contained" startIcon={<Refresh />} onClick={reset} className="w-full">
              Try Again
            </Button>
            <Button variant="outlined" onClick={() => window.location.reload()} className="w-full">
              Reload Page
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export { DefaultErrorFallback, ErrorBoundary };
export type { ErrorBoundaryProps, ErrorFallbackProps };
