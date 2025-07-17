'use client';

import { useAuthContext } from '@/context/useAuthContext';
import { useAccount } from '@/hooks/useAccount';
import { Locale } from '@/i18n-config';
import { AccountResponse } from '@/interface/account.interface';
import { formatCurrency } from '@/utils';
import {
  AccountBalance,
  AccountBalanceWallet,
  Add,
  CreditCard,
  Delete,
  Edit,
  MoreVert,
  Savings,
  Visibility,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fab,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  MenuItem as SelectMenuItem,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { AccountDetailDialog } from './AccountDetailDialog';
import { AccountSummary } from './AccountSummary';

interface AccountCardProps {
  account: AccountResponse;
  onEdit: (account: AccountResponse) => void;
  onDelete: (id: string) => void;
  onView: (account: AccountResponse) => void;
}

interface AccountManagementProps {
  dict: any;
  lang: Locale;
}

const AccountCard = ({ account, onEdit, onDelete, onView }: AccountCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getAccountIcon = (type: string) => {
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

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
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

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
      <CardContent>
        <Box className="flex justify-between items-start mb-3">
          <Box className="flex items-center gap-2">
            {getAccountIcon(account.type)}
            <Typography variant="h6" className="font-semibold text-gray-800">
              {account.name}
            </Typography>
          </Box>
          <IconButton size="small" onClick={handleMenuClick}>
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem
              onClick={() => {
                onView(account);
                handleMenuClose();
              }}
            >
              <ListItemIcon>
                <Visibility fontSize="small" />
              </ListItemIcon>
              <ListItemText>View Details</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                onEdit(account);
                handleMenuClose();
              }}
            >
              <ListItemIcon>
                <Edit fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                onDelete(account.id);
                handleMenuClose();
              }}
              className="text-red-600"
            >
              <ListItemIcon>
                <Delete fontSize="small" className="text-red-600" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
        </Box>

        <Typography variant="h4" className="font-bold text-gray-900 mb-2">
          {formatCurrency(account.balance, account.currency)}
        </Typography>

        <Box className="flex justify-between items-center mb-3">
          <Chip label={account.type} color={getTypeColor(account.type) as any} size="small" variant="outlined" />
          <Typography variant="body2" className="text-gray-500">
            {account.currency}
          </Typography>
        </Box>

        <Typography variant="body2" className="text-gray-600 mb-1">
          Owner: {account.user?.fullname || 'Unknown'}
        </Typography>
        <Typography variant="caption" className="text-gray-500">
          Created: {new Date(account.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

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

interface CreateAccountDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (accountData: any) => void;
  loading: boolean;
  dict?: any;
}

const CreateAccountDialog = ({ open, onClose, onSubmit, loading, dict }: CreateAccountDialogProps) => {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    balance: '',
    currency: 'VND',
    userId: user?.id || '',
    createdBy: user?.id || '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      balance: parseFloat(formData.balance) || 0,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{dict?.account?.createNew}</DialogTitle>
        <DialogContent className="space-y-4">
          <TextField
            fullWidth
            label={dict?.account?.title?.name}
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Account Type</InputLabel>
            <Select value={formData.type} onChange={(e) => handleChange('type', e.target.value)} required>
              <SelectMenuItem value="checking">Checking</SelectMenuItem>
              <SelectMenuItem value="savings">Savings</SelectMenuItem>
              <SelectMenuItem value="credit">Credit</SelectMenuItem>
              <SelectMenuItem value="investment">Investment</SelectMenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label={dict?.account?.title?.initialBalance}
            type="number"
            value={formData.balance}
            onChange={(e) => handleChange('balance', e.target.value)}
            margin="normal"
            inputProps={{ step: '0.01' }}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Currency</InputLabel>
            <Select value={formData.currency} onChange={(e) => handleChange('currency', e.target.value)}>
              <SelectMenuItem value="USD">USD</SelectMenuItem>
              <SelectMenuItem value="EUR">EUR</SelectMenuItem>
              <SelectMenuItem value="GBP">GBP</SelectMenuItem>
              <SelectMenuItem value="JPY">JPY</SelectMenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            {dict?.common?.cancel}
          </Button>
          <Button type="submit" variant="contained" disabled={loading || !formData.name || !formData.type}>
            {loading ? dict?.common?.creating : dict?.account?.createNew}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

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
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
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
      <Grid container spacing={3}>
        {accounts.map((account) => (
          <Grid item xs={12} sm={6} md={4} key={account.id}>
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

      {/* Floating Action Button for mobile */}
      <Fab color="primary" className="fixed bottom-6 right-6 md:hidden" onClick={() => setCreateDialogOpen(true)}>
        <Add />
      </Fab>

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
