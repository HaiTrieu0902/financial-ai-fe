'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent, AppBar, Toolbar, useTheme } from '@mui/material';
import { AccountBalance, TrendingUp, Flag, Chat, ArrowForward } from '@mui/icons-material';
import Link from 'next/link';
import { Locale } from '@/i18n-config';

interface LandingPageProps {
  dict: any;
  lang: Locale;
}

export default function LandingPage({ dict, lang }: LandingPageProps) {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component only renders on client after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Add safety check for dict object
  if (!dict || !dict.landing) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  // Don't render theme-dependent content until mounted
  if (!mounted) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const features = [
    {
      icon: <AccountBalance sx={{ fontSize: 48, color: theme?.palette?.primary?.main || '#1976d2' }} />,
      title: dict.landing.features.budgeting,
      description: 'Create and manage budgets with intelligent insights',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 48, color: theme?.palette?.primary?.main || '#1976d2' }} />,
      title: dict.landing.features.expenses,
      description: 'Track expenses automatically and categorize spending',
    },
    {
      icon: <Flag sx={{ fontSize: 48, color: theme?.palette?.primary?.main || '#1976d2' }} />,
      title: dict.landing.features.goals,
      description: 'Set and achieve your financial goals with personalized plans',
    },
    {
      icon: <Chat sx={{ fontSize: 48, color: theme?.palette?.primary?.main || '#1976d2' }} />,
      title: dict.landing.features.aiChat,
      description: 'Get instant financial advice from our AI assistant',
    },
  ];

  return (
    <Box>
      {/* Navigation */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'text.primary' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            FinanceAI
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button component={Link} href={`/${lang}/auth/login`}>
              {dict.navigation.login}
            </Button>
            <Button variant="contained" component={Link} href={`/${lang}/auth/register`}>
              {dict.navigation.register}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: 12,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h1" component="h1" gutterBottom>
                {dict.landing.title}
              </Typography>
              <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4, opacity: 0.9 }}>
                {dict.landing.subtitle}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
                  component={Link}
                  href={`/${lang}/auth/register`}
                  endIcon={<ArrowForward />}
                >
                  {dict.landing.cta.getStarted}
                </Button>
                <Button variant="outlined" size="large" sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: 'grey.300' } }}>
                  {dict.landing.cta.learnMore}
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 4,
                  p: 4,
                  textAlign: 'center',
                }}
              >
                <Typography variant="h4" gutterBottom>
                  $45,230
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Total Balance
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Typography variant="h2" component="h2" textAlign="center" gutterBottom sx={{ mb: 8 }}>
          Powerful Features for Your Financial Success
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Ready to Take Control of Your Finances?
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
            Join thousands of users who have improved their financial health with our AI assistant.
          </Typography>
          <Button variant="contained" size="large" component={Link} href={`/${lang}/auth/register`} endIcon={<ArrowForward />}>
            {dict.landing.cta.getStarted}
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
