'use client';

import { Email as EmailIcon, Lock as LockIcon, LoginOutlined } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Container,
  Fade,
  Grow,
  InputAdornment,
  Link as MuiLink,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { PATH_DEFAULT } from '@/constants/path';
import { useAuthContext } from '@/context/useAuthContext';
import { Locale } from '@/i18n-config';

interface RegisterFormProps {
  dict: any;
  lang: Locale;
}

export default function RegisterForm({ dict, lang }: RegisterFormProps) {
  const { register } = useAuthContext();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });
      router.push(`/${lang}/${PATH_DEFAULT.dashboard}`);
    } catch (err) {
      setError('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

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
              <Box className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
                <LoginOutlined className="text-white text-2xl" />
              </Box>
              <Typography
                variant="h4"
                component="h1"
                className="font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2"
              >
                {dict.auth.register.title}
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                {dict.auth.register.description || 'Create your account to get started'}
              </Typography>
            </Box>

            {error && (
              <Fade in>
                <Alert severity="error" className="mb-6 rounded-xl border-0">
                  {error}
                </Alert>
              </Fade>
            )}

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit} className="space-y-6">
              <TextField
                size="small"
                fullWidth
                name="firstName"
                label={dict.auth.register.firstName}
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <TextField
                size="small"
                fullWidth
                name="lastName"
                label={dict.auth.register.lastName}
                value={form.lastName}
                onChange={handleChange}
                required
              />
              <TextField
                size="small"
                fullWidth
                name="email"
                label={dict.auth.register.email}
                value={form.email}
                onChange={handleChange}
                required
                type="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                size="small"
                fullWidth
                name="password"
                label={dict.auth.register.password}
                value={form.password}
                onChange={handleChange}
                type="password"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                size="small"
                fullWidth
                name="confirmPassword"
                label={dict.auth.register.confirmPassword}
                value={form.confirmPassword}
                onChange={handleChange}
                type="password"
                required
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                className="rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                sx={{
                  background: loading
                    ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
                    : 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                  '&:hover': {
                    background: loading
                      ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
                      : 'linear-gradient(135deg, #059669 0%, #0891b2 100%)',
                  },
                  textTransform: 'none',
                }}
              >
                {loading ? dict.common.loading : dict.auth.register.submit}
              </Button>
            </Box>

            {/* Link to login */}
            <Box className="text-center mt-8">
              <Typography variant="body2" className="text-gray-600">
                {dict.auth.register.hasAccount}{' '}
                <MuiLink
                  component={Link}
                  href={`/${lang}/auth/login`}
                  className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  {dict.auth.register.signIn}
                </MuiLink>
              </Typography>
            </Box>
          </Paper>
        </Grow>
      </Container>
    </div>
  );
}
