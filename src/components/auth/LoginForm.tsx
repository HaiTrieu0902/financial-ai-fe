'use client';
import { PATH_DEFAULT } from '@/constants/path';
import { useAuthContext } from '@/context/useAuthContext';
import { Locale } from '@/i18n-config';
import { Email as EmailIcon, Lock as LockIcon, LoginOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Container,
  Fade,
  Grow,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState, useTransition } from 'react';

interface LoginFormProps {
  dict: any;
  lang: Locale;
}

export default function LoginForm({ dict, lang }: LoginFormProps) {
  const { login } = useAuthContext();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    startTransition(async () => {
      try {
        await login(form);
        router.push(`/${lang}/${PATH_DEFAULT.dashboard}`);
      } catch {
        setError(dict.auth.login.invalid || 'An error occurred during login');
      }
    });
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Container maxWidth="sm">
        <Grow in timeout={800}>
          <Paper
            elevation={0}
            className="p-8 bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border border-gray-200/50 shadow-2xl rounded-3xl"
          >
            {/* Header */}
            <Box className="text-center mb-8">
              <Box className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                <LoginOutlined className="text-white text-2xl" />
              </Box>
              <Typography
                variant="h4"
                component="h1"
                className="font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2"
              >
                {dict.auth.login.title}
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                Welcome back! Please sign in to your account
              </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
              <Fade in>
                <Alert severity="error" className="mb-6 rounded-xl border-0">
                  o{error}
                </Alert>
              </Fade>
            )}

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit} className="space-y-8">
              <TextField
                fullWidth
                size="small"
                name="email"
                label={dict.auth.login.email}
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                size="small"
                name="password"
                label={dict.auth.login.password}
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                size="medium"
                type="submit"
                fullWidth
                variant="contained"
                disabled={isPending}
                className=" rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                sx={{
                  background: isPending
                    ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
                    : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  '&:hover': {
                    background: isPending
                      ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
                      : 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                  },
                  textTransform: 'none',
                }}
              >
                {isPending ? (
                  <Box className="flex items-center gap-2">
                    <Box className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {dict.common.loading}
                  </Box>
                ) : (
                  dict.auth.login.submit
                )}
              </Button>
            </Box>

            {/* Sign up link */}
            <Box className="text-center mt-8">
              <Typography variant="body2" className="text-gray-600">
                {dict.auth.login.noAccount}{' '}
                <MuiLink
                  component={Link}
                  href={`/${lang}/auth/register`}
                  className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  {dict.auth.login.signUp}
                </MuiLink>
              </Typography>
            </Box>
          </Paper>
        </Grow>
      </Container>
    </div>
  );
}
