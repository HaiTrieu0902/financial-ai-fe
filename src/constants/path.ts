export const PATH_DEFAULT = {
  home: '/',
  dashboard: '/dashboard',
  auth: { login: '/auth/login', register: '/auth/register' },
  error: { forbidden: '/error/403', internalServer: '/error/500' },
} as const;
