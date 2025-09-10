'use client';

import { AccountResponse } from '@/interface/account.interface';
import { formatCurrency } from '@/utils';
import { AccountBalance, TrendingDown, TrendingUp } from '@mui/icons-material';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

interface AccountSummaryProps {
  accounts?: AccountResponse[];
  totalBalance: number;
  currency?: string;
}

export function AccountSummary({ accounts = [], totalBalance, currency = 'USD' }: AccountSummaryProps) {
  // Early return if accounts is not properly initialized
  if (!accounts || !Array.isArray(accounts)) {
    return (
      <Box className="space-y-4">
        <Typography variant="h6">No account data available</Typography>
      </Box>
    );
  }
  const getAccountsByType = () => {
    const accountTypes = accounts.reduce((acc, account) => {
      const type = account.type.toLowerCase();
      if (!acc[type]) {
        acc[type] = {
          count: 0,
          balance: 0,
          accounts: [],
        };
      }
      acc[type].count += 1;
      acc[type].balance += account.balance;
      acc[type].accounts.push(account);
      return acc;
    }, {} as Record<string, { count: number; balance: number; accounts: AccountResponse[] }>);

    return accountTypes;
  };

  const accountsByType = getAccountsByType();

  const positiveAccounts = accounts.filter((acc) => acc.balance > 0);
  const negativeAccounts = accounts.filter((acc) => acc.balance < 0);

  const getTypeColor = (type: string): 'success' | 'primary' | 'error' | 'default' => {
    switch (type) {
      case 'savings':
        return 'success';
      case 'checking':
        return 'primary';
      case 'credit':
        return 'error';
      default:
        return 'default';
    }
  };

  const getProgressColor = (
    type: string,
  ): 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit' => {
    switch (type) {
      case 'savings':
        return 'success';
      case 'checking':
        return 'primary';
      case 'credit':
        return 'error';
      default:
        return 'primary';
    }
  };

  const getTypeProgress = (balance: number) => {
    if (totalBalance === 0) return 0;
    return Math.abs((balance / totalBalance) * 100);
  };

  return (
    <Box className="space-y-4">
      {/* Overview Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-gradient-to-r from-slate-600 to-slate-700 text-white">
            <CardContent>
              <Box className="flex items-center justify-between">
                <Box>
                  <Typography variant="body2" className="opacity-90">
                    Total Accounts
                  </Typography>
                  <Typography variant="h4" className="font-bold">
                    {accounts.length}
                  </Typography>
                </Box>
                <AccountBalance className="text-3xl opacity-80" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <CardContent>
              <Box className="flex items-center justify-between">
                <Box>
                  <Typography variant="body2" className="opacity-90">
                    Positive Balance
                  </Typography>
                  <Typography variant="h4" className="font-bold">
                    {positiveAccounts.length}
                  </Typography>
                </Box>
                <TrendingUp className="text-3xl opacity-80" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent>
              <Box className="flex items-center justify-between">
                <Box>
                  <Typography variant="body2" className="opacity-90">
                    Negative Balance
                  </Typography>
                  <Typography variant="h4" className="font-bold">
                    {negativeAccounts.length}
                  </Typography>
                </Box>
                <TrendingDown className="text-3xl opacity-80" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
            <CardContent>
              <Box className="flex items-center justify-between">
                <Box>
                  <Typography variant="body2" className="opacity-90">
                    Net Worth
                  </Typography>
                  <Typography variant="h4" className="font-bold">
                    {formatCurrency(totalBalance, currency)}
                  </Typography>
                </Box>
                {totalBalance >= 0 ? (
                  <TrendingUp className="text-3xl opacity-80" />
                ) : (
                  <TrendingDown className="text-3xl opacity-80" />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Stats */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-4 font-semibold">
            Quick Statistics
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
              <Box className="text-center">
                <Typography variant="h4" className="font-bold text-green-600 mb-1">
                  {formatCurrency(
                    positiveAccounts.reduce((sum, acc) => sum + Number(acc.balance), 0),
                    currency,
                  )}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Assets
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box className="text-center">
                <Typography variant="h4" className="font-bold text-red-600 mb-1">
                  {formatCurrency(Math.abs(negativeAccounts.reduce((sum, acc) => sum + acc.balance, 0)), currency)}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Liabilities
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box className="text-center">
                <Typography variant="h4" className="font-bold text-blue-600 mb-1">
                  {accounts.length > 0
                    ? formatCurrency(totalBalance / accounts.length, currency)
                    : formatCurrency(0, currency)}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Average Balance
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box className="text-center">
                <Typography variant="h4" className="font-bold text-purple-600 mb-1">
                  {Object.keys(accountsByType).length}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Account Types
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
