'use client';

import ChatDrawer from '@/components/ChatDrawer';
import { useAuthContext } from '@/context/useAuthContext';
import { useAccount } from '@/hooks/useAccount';
import { Locale } from '@/i18n-config';
import { formatCurrency } from '@/utils';
import {
  AccountBalance,
  TrendingUp,
  TrendingDown,
  Chat,
  Add,
  Visibility,
  AccountBalanceWallet,
  CreditCard,
  Savings,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Container,
  Fab,
  Grid,
  Typography,
  Button,
  LinearProgress,
  Chip,
  Skeleton,
  Alert,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Simple chart data interfaces
interface ChartData {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}

interface AccountTypeData {
  name: string;
  value: number;
  count: number;
  color: string;
  percentage: number;
}

interface DashboardOverviewProps {
  dict: any;
  lang: Locale;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const OverviewSkeleton = () => (
  <Container maxWidth="lg" className="py-8">
    <Grid container spacing={3}>
      {[1, 2, 3, 4].map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item}>
          <Card>
            <CardContent>
              <Skeleton variant="text" width="60%" height={20} />
              <Skeleton variant="text" width="80%" height={40} />
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Skeleton variant="rectangular" width="100%" height={300} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Skeleton variant="rectangular" width="100%" height={300} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Container>
);

export default function DashboardOverview({ dict, lang }: DashboardOverviewProps) {
  const { user, isAuthenticated, loading: authLoading } = useAuthContext();
  const { accounts, totalBalance, loading, error, getMyAccounts, getTotalBalance } = useAccount();

  const router = useRouter();
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push(`/${lang}/auth/login`);
    }
  }, [isAuthenticated, authLoading, lang, router]);

  useEffect(() => {
    if (user?.id) {
      getMyAccounts();
      getTotalBalance('USD');
    }
  }, [user?.id, getMyAccounts, getTotalBalance]);

  const getAccountsByType = () => {
    const total = accounts.reduce((sum, acc) => sum + Math.abs(acc.balance), 0);
    const accountTypes = accounts.reduce((acc, account) => {
      const type = account.type.toLowerCase();
      if (!acc[type]) {
        acc[type] = {
          name: type.charAt(0).toUpperCase() + type.slice(1),
          value: 0,
          count: 0,
          color: COLORS[Object.keys(acc).length % COLORS.length],
          percentage: 0,
        };
      }
      acc[type].value += Math.abs(account.balance);
      acc[type].count += 1;
      return acc;
    }, {} as Record<string, AccountTypeData>);

    // Calculate percentages
    Object.values(accountTypes).forEach((type) => {
      type.percentage = total > 0 ? (type.value / total) * 100 : 0;
    });

    return Object.values(accountTypes);
  };

  const getMonthlyTrends = () => {
    // Mock data for demo - replace with real data from API
    return [
      { month: 'Jan', income: 5000, expenses: 3500, savings: 1500 },
      { month: 'Feb', income: 5200, expenses: 3800, savings: 1400 },
      { month: 'Mar', income: 4800, expenses: 3200, savings: 1600 },
      { month: 'Apr', income: 5500, expenses: 4000, savings: 1500 },
      { month: 'May', income: 5300, expenses: 3700, savings: 1600 },
      { month: 'Jun', income: 5600, expenses: 3900, savings: 1700 },
    ];
  };

  const getAccountTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'savings':
        return <Savings className="text-green-600" />;
      case 'checking':
        return <AccountBalanceWallet className="text-blue-600" />;
      case 'credit':
        return <CreditCard className="text-red-600" />;
      default:
        return <AccountBalance className="text-gray-600" />;
    }
  };

  const positiveAccounts = accounts.filter((acc) => acc.balance > 0);
  const negativeAccounts = accounts.filter((acc) => acc.balance < 0);
  const accountsByType = getAccountsByType();
  const monthlyTrends = getMonthlyTrends();

  if (authLoading || (loading && accounts.length === 0)) {
    return <OverviewSkeleton />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Container maxWidth="lg" className="py-8">
        <Box className="flex justify-between items-center mb-6">
          <Box>
            <Typography variant="h4" className="font-bold text-gray-800 mb-2">
              Financial Overview
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              Welcome back, {user.fullname || user.username || user.email}
            </Typography>
          </Box>
          <Box className="flex gap-2">
            <Button variant="outlined" onClick={() => router.push(`/${lang}/accounts`)}>
              Manage Accounts
            </Button>
            <Button variant="contained" startIcon={<Add />} onClick={() => router.push(`/${lang}/accounts`)}>
              Add Account
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        {/* Summary Cards */}
        <Grid container spacing={3} className="mb-6">
          <Grid item xs={12} sm={6} md={3}>
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent>
                <Box className="flex items-center justify-between">
                  <Box>
                    <Typography variant="body2" className="opacity-90 mb-1">
                      Total Balance
                    </Typography>
                    <Typography variant="h4" className="font-bold">
                      {formatCurrency(totalBalance, 'USD')}
                    </Typography>
                  </Box>
                  <AccountBalance className="text-3xl opacity-80" />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent>
                <Box className="flex items-center justify-between">
                  <Box>
                    <Typography variant="body2" className="opacity-90 mb-1">
                      Total Accounts
                    </Typography>
                    <Typography variant="h4" className="font-bold">
                      {accounts.length}
                    </Typography>
                  </Box>
                  <AccountBalanceWallet className="text-3xl opacity-80" />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent>
                <Box className="flex items-center justify-between">
                  <Box>
                    <Typography variant="body2" className="opacity-90 mb-1">
                      Assets
                    </Typography>
                    <Typography variant="h4" className="font-bold">
                      {formatCurrency(
                        positiveAccounts.reduce((sum, acc) => sum + acc.balance, 0),
                        'USD',
                      )}
                    </Typography>
                  </Box>
                  <TrendingUp className="text-3xl opacity-80" />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
              <CardContent>
                <Box className="flex items-center justify-between">
                  <Box>
                    <Typography variant="body2" className="opacity-90 mb-1">
                      Liabilities
                    </Typography>
                    <Typography variant="h4" className="font-bold">
                      {formatCurrency(Math.abs(negativeAccounts.reduce((sum, acc) => sum + acc.balance, 0)), 'USD')}
                    </Typography>
                  </Box>
                  <TrendingDown className="text-3xl opacity-80" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3} className="mb-6">
          {/* Monthly Trends Chart */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" className="mb-4 font-semibold">
                  Monthly Financial Trends
                </Typography>
                <Box className="space-y-4">
                  {monthlyTrends.map((month, index) => (
                    <Box key={index}>
                      <Typography variant="body2" className="mb-2 font-medium">
                        {month.month}
                      </Typography>
                      <Box className="space-y-2">
                        <Box>
                          <Box className="flex justify-between mb-1">
                            <Typography variant="caption" className="text-green-600">
                              Income: {formatCurrency(month.income, 'USD')}
                            </Typography>
                            <Typography variant="caption">{((month.income / 6000) * 100).toFixed(0)}%</Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={(month.income / 6000) * 100}
                            className="h-2 rounded-full"
                            sx={{
                              backgroundColor: '#E5F7E5',
                              '& .MuiLinearProgress-bar': { backgroundColor: '#10B981' },
                            }}
                          />
                        </Box>
                        <Box>
                          <Box className="flex justify-between mb-1">
                            <Typography variant="caption" className="text-red-600">
                              Expenses: {formatCurrency(month.expenses, 'USD')}
                            </Typography>
                            <Typography variant="caption">{((month.expenses / 6000) * 100).toFixed(0)}%</Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={(month.expenses / 6000) * 100}
                            className="h-2 rounded-full"
                            sx={{
                              backgroundColor: '#FEE2E2',
                              '& .MuiLinearProgress-bar': { backgroundColor: '#EF4444' },
                            }}
                          />
                        </Box>
                        <Box>
                          <Box className="flex justify-between mb-1">
                            <Typography variant="caption" className="text-blue-600">
                              Savings: {formatCurrency(month.savings, 'USD')}
                            </Typography>
                            <Typography variant="caption">{((month.savings / 6000) * 100).toFixed(0)}%</Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={(month.savings / 6000) * 100}
                            className="h-2 rounded-full"
                            sx={{
                              backgroundColor: '#E0F2FE',
                              '& .MuiLinearProgress-bar': { backgroundColor: '#3B82F6' },
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Account Distribution */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" className="mb-4 font-semibold">
                  Account Distribution
                </Typography>
                {accountsByType.length > 0 ? (
                  <Box className="space-y-4">
                    {accountsByType.map((type, index) => (
                      <Box key={index}>
                        <Box className="flex justify-between items-center mb-2">
                          <Box className="flex items-center gap-2">
                            <Box className="w-4 h-4 rounded" style={{ backgroundColor: type.color }} />
                            <Typography variant="body2" className="font-medium">
                              {type.name}
                            </Typography>
                          </Box>
                          <Typography variant="body2" className="text-gray-600">
                            {type.percentage.toFixed(1)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={type.percentage}
                          className="h-3 rounded-full mb-2"
                          sx={{
                            backgroundColor: '#F3F4F6',
                            '& .MuiLinearProgress-bar': { backgroundColor: type.color },
                          }}
                        />
                        <Box className="flex justify-between">
                          <Typography variant="caption" className="text-gray-500">
                            {type.count} account{type.count !== 1 ? 's' : ''}
                          </Typography>
                          <Typography variant="caption" className="text-gray-700 font-medium">
                            {formatCurrency(type.value, 'USD')}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Box className="text-center py-8">
                    <Typography variant="body2" className="text-gray-500">
                      No accounts to display
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Accounts */}
        <Card className="mb-6">
          <CardContent>
            <Box className="flex justify-between items-center mb-4">
              <Typography variant="h6" className="font-semibold">
                Recent Accounts
              </Typography>
              <Button variant="outlined" onClick={() => router.push(`/${lang}/accounts`)}>
                View All
              </Button>
            </Box>

            {accounts.length > 0 ? (
              <Grid container spacing={2}>
                {accounts.slice(0, 3).map((account) => (
                  <Grid item xs={12} sm={6} md={4} key={account.id}>
                    <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                      <CardContent className="pb-4">
                        <Box className="flex items-center gap-2 mb-2">
                          {getAccountTypeIcon(account.type)}
                          <Typography variant="h6" className="font-medium">
                            {account.name}
                          </Typography>
                        </Box>
                        <Typography variant="h5" className="font-bold text-gray-800 mb-2">
                          {formatCurrency(account.balance, account.currency)}
                        </Typography>
                        <Chip label={account.type} size="small" variant="outlined" />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box className="text-center py-8">
                <AccountBalance className="text-6xl text-gray-400 mb-4" />
                <Typography variant="h6" className="text-gray-600 mb-2">
                  No accounts yet
                </Typography>
                <Typography variant="body2" className="text-gray-500 mb-4">
                  Create your first account to see your financial overview
                </Typography>
                <Button variant="contained" startIcon={<Add />} onClick={() => router.push(`/${lang}/accounts`)}>
                  Create Account
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>

      {/* Chat FAB */}
      <Fab
        color="primary"
        className="fixed bottom-6 right-6"
        onClick={() => setChatOpen(true)}
        aria-label="Open AI Chat Assistant"
      >
        <Chat />
      </Fab>

      {/* Chat Interface */}
      <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} dict={dict} />
    </Box>
  );
}
