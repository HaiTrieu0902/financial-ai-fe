'use client';

import { AccountResponse } from '@/interface/account.interface';
import { formatCurrency } from '@/utils';
import { AccountBalance, TrendingUp, TrendingDown, Add, Remove } from '@mui/icons-material';
import { Card, CardContent, Typography, Box, LinearProgress, Chip, Grid } from '@mui/material';

interface AccountSummaryProps {
  accounts: AccountResponse[];
  totalBalance: number;
  currency?: string;
}

export function AccountSummary({ accounts, totalBalance, currency = 'USD' }: AccountSummaryProps) {
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

  const getTypeColor = (type: string) => {
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

  const getTypeProgress = (balance: number) => {
    if (totalBalance === 0) return 0;
    return Math.abs((balance / totalBalance) * 100);
  };

  return (
    <Box className="space-y-4">
      {/* Overview Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
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
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
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
          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
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
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
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

      {/* Account Type Breakdown */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-4 font-semibold">
            Account Breakdown by Type
          </Typography>
          <Box className="space-y-4">
            {Object.entries(accountsByType).map(([type, data]) => (
              <Box key={type}>
                <Box className="flex justify-between items-center mb-2">
                  <Box className="flex items-center gap-2">
                    <Chip
                      label={type.charAt(0).toUpperCase() + type.slice(1)}
                      color={getTypeColor(type) as any}
                      size="small"
                      variant="outlined"
                    />
                    <Typography variant="body2" className="text-gray-600">
                      {data.count} account{data.count !== 1 ? 's' : ''}
                    </Typography>
                  </Box>
                  <Typography variant="body1" className="font-semibold">
                    {formatCurrency(data.balance, currency)}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={getTypeProgress(data.balance)}
                  className="h-2 rounded-full"
                  color={getTypeColor(type) as any}
                />
                <Typography variant="caption" className="text-gray-500">
                  {getTypeProgress(data.balance).toFixed(1)}% of total
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

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
                    positiveAccounts.reduce((sum, acc) => sum + acc.balance, 0),
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
