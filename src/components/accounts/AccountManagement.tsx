'use client';

import { useAuthContext } from '@/context/useAuthContext';
import { useAccount } from '@/hooks/useAccount';
import { Locale } from '@/i18n-config';
import { AccountResponse } from '@/interface/account.interface';
import { formatCurrency } from '@/utils';
import { AccountBalance, Add } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import AccountCard from './AccountCard';
import { AccountDetailDialog } from './AccountDetailDialog';
import { AccountSummary } from './AccountSummary';
import CreateAccountDialog from './CreateAccountDialog';

interface AccountManagementProps {
  dict: any;
  lang: Locale;
}

const AccountSkeleton = () => (
  <Card>
    <CardContent>
      <Box className="flex justify-between items-start mb-3">
        <Box className="flex items-center gap-2">
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={120} height={28} />
        </Box>
        <Skeleton variant="circular" width={24} height={24} />
      </Box>
      <Skeleton variant="text" width={150} height={40} className="mb-2" />
      <Box className="flex justify-between items-center mb-3">
        <Skeleton variant="rectangular" width={80} height={24} />
        <Skeleton variant="text" width={40} height={20} />
      </Box>
      <Skeleton variant="text" width="100%" height={16} className="mb-1" />
      <Skeleton variant="text" width={120} height={14} />
    </CardContent>
  </Card>
);

export default function AccountManagement({ dict, lang }: AccountManagementProps) {
  const {
    accounts,
    totalBalance,
    loading,
    error,
    createAccount,
    getMyAccounts,
    getTotalBalance,
    deleteAccount,
    refreshAccounts,
  } = useAccount();

  const { user } = useAuthContext();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountResponse | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      getMyAccounts();
      getTotalBalance('VND');
    }
  }, [user?.id, getMyAccounts, getTotalBalance]);

  const handleCreateAccount = async (accountData: any) => {
    try {
      await createAccount(accountData);
      setCreateDialogOpen(false);
      await refreshAccounts();
      await getTotalBalance('VND');
    } catch (error) {
      console.error('Failed to create account:', error);
    }
  };

  const handleDeleteAccount = (id: string) => {
    setAccountToDelete(id);
    setConfirmDeleteOpen(true);
  };

  const handleEditAccount = (account: AccountResponse) => {
    setSelectedAccount(account);
    // TODO: Open edit dialog
  };

  const handleViewAccount = (account: AccountResponse) => {
    setSelectedAccount(account);
    setDetailDialogOpen(true);
  };

  if (loading && accounts.length === 0) {
    return (
      <Box className="py-8">
        <Typography variant="h4" className="mb-6 font-bold text-gray-800">
          {dict?.account?.title?.accountManagement}
        </Typography>
        <Grid container spacing={4}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} md={6} key={item}>
              <AccountSkeleton />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box className="py-8">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="font-bold text-gray-800">
          {dict?.account?.title?.accountManagement}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setCreateDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {dict?.common?.add}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      {/* Account Summary */}
      {accounts && Array.isArray(accounts) && accounts.length > 0 && (
        <Box className="mb-6">
          <AccountSummary accounts={accounts} totalBalance={totalBalance} currency="USD" />
        </Box>
      )}

      {/* Total Balance Card - Only show if no accounts summary */}
      {accounts.length === 0 && (
        <Card className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent>
            <Typography variant="h6" className="mb-2">
              {dict?.account?.totalBalance}
            </Typography>
            <Typography variant="h3" className="font-bold">
              {formatCurrency(totalBalance, 'USD')}
            </Typography>
            <Typography variant="body2" className="opacity-90">
              {dict?.account?.across} {accounts.length} {dict?.account?.account}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Accounts Grid */}
      <Grid container spacing={4}>
        {accounts.map((account) => (
          <Grid item xs={12} md={6} key={account.id}>
            <AccountCard
              account={account}
              onEdit={handleEditAccount}
              onDelete={handleDeleteAccount}
              onView={handleViewAccount}
            />
          </Grid>
        ))}
      </Grid>

      {accounts.length === 0 && !loading && (
        <Box className="text-center py-12">
          <AccountBalance className="text-6xl text-gray-400 mb-4" />
          <Typography variant="h6" className="text-gray-600 mb-2">
            {dict?.account?.message?.notFound}
          </Typography>
          <Typography variant="body2" className="text-gray-500 mb-4">
            {dict?.account?.message?.createfirstToGetStarted}
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => setCreateDialogOpen(true)}>
            {dict?.common?.add}
          </Button>
        </Box>
      )}

      {/* Create Account Dialog */}
      <CreateAccountDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSubmit={handleCreateAccount}
        loading={loading}
        dict={dict}
      />

      {/* Account Detail Dialog */}
      <AccountDetailDialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        account={selectedAccount}
      />

      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>{dict?.common?.confirm}</DialogTitle>
        <DialogContent>
          <Typography>
            {dict?.account?.message?.confirmDelete || 'Are you sure you want to delete this account?'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>{dict?.common?.cancel}</Button>
          <Button
            onClick={async () => {
              if (accountToDelete) {
                try {
                  await deleteAccount(accountToDelete);
                  await getTotalBalance('VND');
                } catch (error) {
                  console.error('Failed to delete account:', error);
                } finally {
                  setConfirmDeleteOpen(false);
                  setAccountToDelete(null);
                }
              }
            }}
            color="error"
            variant="contained"
          >
            {dict?.common?.delete || 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
