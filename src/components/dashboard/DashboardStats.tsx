'use client';

import { useAuthContext } from '@/context/useAuthContext';
import { useAccount } from '@/hooks/useAccount';
import { formatCurrency } from '@/utils';
import { AccountBalance, ArrowDownward, ArrowUpward, MoreVert, TrendingDown, TrendingUp } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface DashboardStatsProps {
  lang: string;
}

export default function DashboardStats({ lang }: DashboardStatsProps) {
  const { user } = useAuthContext();
  const { accounts, totalBalance, getMyAccounts, getTotalBalance } = useAccount();
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if (user?.id) {
      getMyAccounts();
      getTotalBalance('USD');
    }
  }, [user?.id, getMyAccounts, getTotalBalance]);

  // Calculate stats
  const positiveAccounts = accounts.filter((acc) => acc.balance > 0);
  const totalSavings = accounts
    .filter((acc) => acc.type.toLowerCase() === 'savings')
    .reduce((sum, acc) => sum + acc.balance, 0);
  const totalSpending = Math.abs(accounts.filter((acc) => acc.balance < 0).reduce((sum, acc) => sum + acc.balance, 0));

  // Mock chart data for Working Capital
  const chartData = [
    { month: 'Apr 14', income: 4000, expenses: 3500 },
    { month: 'Apr 15', income: 4200, expenses: 3800 },
    { month: 'Apr 16', income: 3800, expenses: 4000 },
    { month: 'Apr 17', income: 4500, expenses: 3200 },
    { month: 'Apr 18', income: 4100, expenses: 3600 },
    { month: 'Apr 19', income: 4300, expenses: 3400 },
    { month: 'Apr 20', income: 4600, expenses: 3100 },
  ];

  // Mock recent transactions
  const recentTransactions = [
    {
      id: 1,
      name: 'iPhone 13 Pro MAX',
      company: 'Apple Store',
      type: 'Mobile',
      amount: -1420.84,
      date: '14 Apr 2022',
      icon: '📱',
      color: '#007AFF',
    },
    {
      id: 2,
      name: 'Netflix Subscription',
      company: 'Netflix',
      type: 'Entertainment',
      amount: -100.0,
      date: '05 Apr 2022',
      icon: 'N',
      color: '#E50914',
    },
    {
      id: 3,
      name: 'Figma Subscription',
      company: 'Figma',
      type: 'Software',
      amount: -244.2,
      date: '02 Apr 2022',
      icon: 'F',
      color: '#F24E1E',
    },
  ];

  // Mock scheduled transfers
  const scheduledTransfers = [
    {
      id: 1,
      name: 'Saleh Ahmed',
      date: 'April 25, 2022 at 11:00',
      amount: -435.0,
      avatar: '/avatars/saleh.jpg',
    },
    {
      id: 2,
      name: 'Delowar Hossain',
      date: 'April 25, 2022 at 11:00',
      amount: -132.0,
      avatar: '/avatars/delowar.jpg',
    },
    {
      id: 3,
      name: 'Mainul Hasan Nayem',
      date: 'April 25, 2022 at 11:00',
      amount: -826.0,
      avatar: '/avatars/mainul.jpg',
    },
    {
      id: 4,
      name: 'Dr. Jubed Ahmed',
      date: 'April 25, 2022 at 11:00',
      amount: -435.0,
      avatar: '/avatars/jubed.jpg',
    },
    {
      id: 5,
      name: 'AR Jakir Alp',
      date: 'April 25, 2022 at 11:00',
      amount: -228.0,
      avatar: '/avatars/jakir.jpg',
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Box>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalance sx={{ fontSize: 24, mr: 1 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Total balance
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {formatCurrency(totalBalance, 'USD')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                  +2.5% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ArrowUpward sx={{ fontSize: 24, mr: 1, color: 'error.main' }} />
                <Typography variant="body2" color="text.secondary">
                  Total spending
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {formatCurrency(totalSpending, 'USD')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingDown sx={{ fontSize: 16, mr: 0.5, color: 'success.main' }} />
                <Typography variant="caption" color="text.secondary">
                  -1.2% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ArrowDownward sx={{ fontSize: 24, mr: 1, color: 'success.main' }} />
                <Typography variant="body2" color="text.secondary">
                  Total saved
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {formatCurrency(totalSavings, 'USD')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUp sx={{ fontSize: 16, mr: 0.5, color: 'success.main' }} />
                <Typography variant="caption" color="text.secondary">
                  +5.4% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Working Capital Chart */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ borderRadius: 3, height: '400px' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Working Capital
                </Typography>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'success.main' }} />
                    <Typography variant="body2" color="text.secondary">
                      Income
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'warning.main' }} />
                    <Typography variant="body2" color="text.secondary">
                      Expenses
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Simple Chart Simulation */}
              <Box sx={{ height: 300, position: 'relative', overflow: 'hidden' }}>
                <svg width="100%" height="100%" viewBox="0 0 600 250">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <line key={i} x1="0" y1={i * 50} x2="600" y2={i * 50} stroke="#f0f0f0" strokeWidth="1" />
                  ))}

                  {/* Income line (green) */}
                  <polyline
                    fill="none"
                    stroke="#4caf50"
                    strokeWidth="3"
                    points="50,150 150,120 250,180 350,80 450,140 550,100"
                  />

                  {/* Expenses line (yellow) */}
                  <polyline
                    fill="none"
                    stroke="#ff9800"
                    strokeWidth="3"
                    points="50,170 150,140 250,160 350,200 450,180 550,220"
                  />

                  {/* Data points */}
                  {[50, 150, 250, 350, 450, 550].map((x, i) => (
                    <g key={i}>
                      <circle cx={x} cy={[150, 120, 180, 80, 140, 100][i]} r="4" fill="#4caf50" />
                      <circle cx={x} cy={[170, 140, 160, 200, 180, 220][i]} r="4" fill="#ff9800" />
                    </g>
                  ))}
                </svg>
              </Box>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card sx={{ borderRadius: 3, mt: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Recent Transaction
                </Typography>
                <Button variant="text" size="small" onClick={() => router.push(`/${lang}/transactions`)}>
                  View All →
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ border: 'none', py: 1, color: 'text.secondary', fontSize: '0.8rem' }}>
                        NAME/BUSINESS
                      </TableCell>
                      <TableCell sx={{ border: 'none', py: 1, color: 'text.secondary', fontSize: '0.8rem' }}>
                        TYPE
                      </TableCell>
                      <TableCell sx={{ border: 'none', py: 1, color: 'text.secondary', fontSize: '0.8rem' }}>
                        AMOUNT
                      </TableCell>
                      <TableCell sx={{ border: 'none', py: 1, color: 'text.secondary', fontSize: '0.8rem' }}>
                        DATE
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id} sx={{ '&:last-child td': { border: 'none' } }}>
                        <TableCell sx={{ border: 'none', py: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                bgcolor: transaction.color,
                                fontSize: '1rem',
                                fontWeight: 600,
                              }}
                            >
                              {transaction.icon}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {transaction.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {transaction.company}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ border: 'none', py: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            {transaction.type}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ border: 'none', py: 2 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              color: transaction.amount < 0 ? 'error.main' : 'success.main',
                            }}
                          >
                            {formatCurrency(Math.abs(transaction.amount), 'USD')}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ border: 'none', py: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            {transaction.date}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side - Wallet & Transfers */}
        <Grid item xs={12} lg={4}>
          {/* Wallet Card */}
          <Card
            sx={{
              borderRadius: 3,
              background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
              color: 'white',
              mb: 3,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                    Wallet
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Maglo.
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Universal Bank
                  </Typography>
                </Box>
                <IconButton sx={{ color: 'white' }}>
                  <MoreVert />
                </IconButton>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 30,
                    bgcolor: 'rgba(255,255,255,0.2)',
                    borderRadius: 1,
                    mb: 2,
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: 600, letterSpacing: 2 }}>
                  5495 7381 3759 2321
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    85952548****
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    08/25
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.7rem',
                    fontWeight: 600,
                  }}
                >
                  VISA
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Scheduled Transfers */}
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Scheduled Transfers
                </Typography>
                <Button variant="text" size="small">
                  View All →
                </Button>
              </Box>

              <Box sx={{ space: 2 }}>
                {scheduledTransfers.map((transfer) => (
                  <Box
                    key={transfer.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 2,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      '&:last-child': { borderBottom: 'none' },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 36, height: 36 }}>{getInitials(transfer.name)}</Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {transfer.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {transfer.date}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: 'error.main',
                      }}
                    >
                      {formatCurrency(Math.abs(transfer.amount), 'USD')}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
