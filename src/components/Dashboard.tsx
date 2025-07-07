'use client';

import ChatInterface from '@/components/ChatInterface';
import { useAuthContext } from '@/context/useAuthContext';
import { useFinancialData } from '@/hooks/useFinancialData';
import { Locale } from '@/i18n-config';
import { formatCurrency } from '@/utils';
import { AccountBalance, AccountCircle, Add, Chat, Receipt, Savings, TrendingUp } from '@mui/icons-material';
import { AppBar, Box, Button, Card, CardContent, Container, Drawer, Fab, Grid, IconButton, Menu, MenuItem, Skeleton, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface DashboardProps {
  dict: any;
  lang: Locale;
}

export default function Dashboard({ dict, lang }: DashboardProps) {
  // All hooks must be called at the top level, before any early returns
  const [anchorEl, setAnchorEl] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const { user, logout, isAuthenticated, loading: authLoading } = useAuthContext();
  const { summary, transactions, loading } = useFinancialData(user?.id);
  const router = useRouter();

  useEffect(() => {
    // Only redirect if auth is loaded and user is not authenticated
    if (!authLoading && !isAuthenticated) {
      router.push(`/${lang}/auth/login`);
    }
  }, [isAuthenticated, authLoading, lang, router]);

  // Event handlers
  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    router.push(`/${lang}`);
  };

  // Beautiful skeleton loading component
  const DashboardSkeleton = () => (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation Skeleton */}
      <AppBar position="static" className="bg-gradient-to-r from-blue-600 to-purple-600">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FinanceAI
          </Typography>
          <Skeleton variant="circular" width={40} height={40} className="bg-white/20" />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Welcome Section Skeleton */}
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="text" width="40%" height={48} className="mb-2" />
          <Skeleton variant="text" width="60%" height={32} />
        </Box>

        {/* Financial Summary Cards Skeleton */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Card className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl">
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box className="flex-1">
                      <Skeleton variant="text" width="80%" height={20} className="mb-2" />
                      <Skeleton variant="text" width="60%" height={32} />
                    </Box>
                    <Skeleton variant="circular" width={40} height={40} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Content Section Skeleton */}
        <Grid container spacing={3}>
          {/* Recent Transactions Skeleton */}
          <Grid item xs={12} md={8}>
            <Card className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl">
              <CardContent>
                <Skeleton variant="text" width="30%" height={32} className="mb-4" />
                {[1, 2, 3, 4, 5].map((item) => (
                  <Box key={item} display="flex" justifyContent="space-between" alignItems="center" py={1} borderBottom="1px solid" borderColor="divider">
                    <Box className="flex-1">
                      <Skeleton variant="text" width="60%" height={20} className="mb-1" />
                      <Skeleton variant="text" width="40%" height={16} />
                    </Box>
                    <Skeleton variant="text" width="20%" height={20} />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions Skeleton */}
          <Grid item xs={12} md={4}>
            <Card className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl">
              <CardContent>
                <Skeleton variant="text" width="50%" height={32} className="mb-4" />
                <Box display="flex" flexDirection="column" gap={2}>
                  {[1, 2, 3].map((item) => (
                    <Skeleton key={item} variant="rectangular" height={40} className="rounded-lg" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Floating Chat Button Skeleton */}
      <Skeleton variant="circular" width={56} height={56} sx={{ position: 'fixed', bottom: 16, right: 16 }} className="bg-blue-200/50" />
    </Box>
  );
  // // Conditional rendering logic - moved after all hooks
  // Show loading while authentication is being checked
  if (authLoading) {
    return <DashboardSkeleton />;
  }
  // Don't render dashboard if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }
  // Show loading if user data or financial data is loading
  if (!user || loading) {
    return <DashboardSkeleton />;
  }

  const recentTransactions = transactions.slice(0, 5);

  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <AppBar position="static" elevation={0} className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="font-bold">
            FinanceAI
          </Typography>
          <IconButton size="large" edge="end" onClick={handleMenuOpen} className="text-white hover:bg-white/10 transition-all duration-300">
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              className: 'rounded-xl shadow-xl border border-gray-200/50 backdrop-blur-sm',
              sx: {
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                backdropFilter: 'blur(10px)',
              },
            }}
          >
            <MenuItem onClick={handleLogout} className="hover:bg-red-50 transition-colors duration-200 text-red-600 font-medium">
              {dict.navigation.logout}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom className="font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {dict.dashboard.welcome}, {user.firstName}! 👋
          </Typography>
          <Typography variant="h6" className="text-gray-600">
            {dict.dashboard.overview}
          </Typography>
        </Box>

        {/* Financial Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              sx={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardContent className="p-6">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="text.secondary" gutterBottom className="font-medium">
                      {dict.dashboard.totalBalance}
                    </Typography>
                    <Typography variant="h5" className="font-bold text-gray-800">
                      {formatCurrency(summary?.totalBalance || 0)}
                    </Typography>
                  </Box>
                  <Box className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                    <AccountBalance className="text-white text-2xl" />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              sx={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardContent className="p-6">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="text.secondary" gutterBottom className="font-medium">
                      {dict.dashboard.monthlyIncome}
                    </Typography>
                    <Typography variant="h5" color="success.main" className="font-bold">
                      {formatCurrency(summary?.monthlyIncome || 0)}
                    </Typography>
                  </Box>
                  <Box className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
                    <TrendingUp className="text-white text-2xl" />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              sx={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardContent className="p-6">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="text.secondary" gutterBottom className="font-medium">
                      {dict.dashboard.monthlyExpenses}
                    </Typography>
                    <Typography variant="h5" color="error.main" className="font-bold">
                      {formatCurrency(summary?.monthlyExpenses || 0)}
                    </Typography>
                  </Box>
                  <Box className="p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl shadow-lg">
                    <Receipt className="text-white text-2xl" />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              sx={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardContent className="p-6">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="text.secondary" gutterBottom className="font-medium">
                      {dict.dashboard.savings}
                    </Typography>
                    <Typography variant="h5" className="font-bold text-gray-800">
                      {formatCurrency(summary?.savings || 0)}
                    </Typography>
                  </Box>
                  <Box className="p-3 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl shadow-lg">
                    <Savings className="text-white text-2xl" />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Transactions */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card
              className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl"
              sx={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardContent className="p-6">
                <Typography variant="h6" gutterBottom className="font-bold text-gray-800 mb-4">
                  {dict.dashboard.recentTransactions}
                </Typography>
                {recentTransactions.length > 0 ? (
                  recentTransactions.map((transaction) => (
                    <Box
                      key={transaction.id}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      className="py-3 border-b border-gray-200/60 hover:bg-gray-50/50 rounded-lg px-2 transition-colors duration-200"
                    >
                      <Box>
                        <Typography variant="subtitle2" className="font-semibold text-gray-800">
                          {transaction.description}
                        </Typography>
                        <Typography variant="caption" className="text-gray-500 font-medium">
                          {transaction.category}
                        </Typography>
                      </Box>
                      <Typography variant="subtitle1" className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography className="text-gray-500 text-center py-8">No transactions yet</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={4}>
            <Card
              className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl"
              sx={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardContent className="p-6">
                <Typography variant="h6" gutterBottom className="font-bold text-gray-800 mb-4">
                  {dict.dashboard.quickActions}
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    className="rounded-xl border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 font-semibold"
                  >
                    {dict.dashboard.addTransaction}
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<TrendingUp />}
                    className="rounded-xl border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 font-semibold"
                  >
                    {dict.dashboard.setGoal}
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Receipt />}
                    className="rounded-xl border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 font-semibold"
                  >
                    {dict.dashboard.viewReports}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Floating Chat Button */}
      <Fab
        color="primary"
        aria-label="chat"
        onClick={() => setChatOpen(true)}
        className="fixed bottom-4 right-4 shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300"
        sx={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
          },
        }}
      >
        <Chat />
      </Fab>
      {/* Chat Drawer */}
      <Drawer
        anchor="right"
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', md: 400 },
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        <ChatInterface dict={dict} onClose={() => setChatOpen(false)} />
      </Drawer>
    </Box>
  );
}
