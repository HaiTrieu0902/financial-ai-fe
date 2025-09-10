import { useAuthContext } from '@/context/useAuthContext';
import { AccountBalance, AttachMoney, Close, CreditCard, Person } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

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

  const accountTypes = [
    { value: 'CASH', label: 'Cash Account', icon: <AttachMoney />, color: '#2e7d32' },
    { value: 'BANK', label: 'Bank Account', icon: <AccountBalance />, color: '#1976d2' },
    { value: 'E-WALLET', label: 'E-Wallet', icon: <CreditCard />, color: '#9c27b0' },
  ];

  const currencies = [
    { value: 'USD', label: 'US Dollar', symbol: '$' },
    { value: 'EUR', label: 'Euro', symbol: '€' },
    { value: 'GBP', label: 'British Pound', symbol: '£' },
    { value: 'JPY', label: 'Japanese Yen', symbol: '¥' },
    { value: 'VND', label: 'Vietnamese Dong', symbol: '₫' },
  ];

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

  const selectedAccountType = accountTypes.find((type) => type.value === formData.type);
  const selectedCurrency = currencies.find((curr) => curr.value === formData.currency);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <DialogTitle
          sx={{
            pb: 1,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '12px 12px 0 0',
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AccountBalance sx={{ fontSize: 28 }} />
              <Typography variant="h5" component="div" fontWeight="600">
                {dict?.account?.createNew || 'Create New Account'}
              </Typography>
            </Box>
            <Button
              onClick={onClose}
              sx={{
                color: 'white',
                minWidth: 'auto',
                p: 1,
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              <Close />
            </Button>
          </Stack>
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ p: 4, backgroundColor: '#fafafa' }}>
            <Stack spacing={3}>
              {/* Account Name */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  backgroundColor: 'white',
                  borderRadius: 2,
                  border: '1px solid #e0e0e0',
                }}
              >
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Account Details
                </Typography>
                <TextField
                  fullWidth
                  label={dict?.account?.title?.name || 'Account Name'}
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Paper>

              {/* Account Type */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  backgroundColor: 'white',
                  borderRadius: 2,
                  border: '1px solid #e0e0e0',
                }}
              >
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Account Type
                </Typography>
                <FormControl fullWidth>
                  <InputLabel>Account Type</InputLabel>
                  <Select
                    value={formData.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                    required
                    label="Account Type"
                    sx={{
                      borderRadius: 2,
                    }}
                  >
                    {accountTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Box sx={{ color: type.color }}>{type.icon}</Box>
                          <Typography>{type.label}</Typography>
                        </Stack>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {selectedAccountType && (
                  <Box sx={{ mt: 2 }}>
                    <Chip
                      icon={selectedAccountType.icon}
                      label={selectedAccountType.label}
                      sx={{
                        backgroundColor: selectedAccountType.color,
                        color: 'white',
                        '& .MuiChip-icon': { color: 'white' },
                      }}
                    />
                  </Box>
                )}
              </Paper>

              {/* Balance and Currency */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  backgroundColor: 'white',
                  borderRadius: 2,
                  border: '1px solid #e0e0e0',
                }}
              >
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Financial Information
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label={dict?.account?.title?.initialBalance || 'Initial Balance'}
                    type="number"
                    value={formData.balance}
                    onChange={(e) => handleChange('balance', e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoney color="action" />
                        </InputAdornment>
                      ),
                      inputProps: { step: '0.01', min: '0' },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <FormControl fullWidth>
                    <InputLabel>Currency</InputLabel>
                    <Select
                      value={formData.currency}
                      onChange={(e) => handleChange('currency', e.target.value)}
                      label="Currency"
                      sx={{
                        borderRadius: 2,
                      }}
                    >
                      {currencies.map((currency) => (
                        <MenuItem key={currency.value} value={currency.value}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography fontWeight="bold">{currency.symbol}</Typography>
                            <Typography>{currency.label}</Typography>
                            <Typography color="text.secondary">({currency.value})</Typography>
                          </Stack>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                {selectedCurrency && formData.balance && (
                  <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Initial Balance Preview:
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      {selectedCurrency.symbol}
                      {parseFloat(formData.balance || '0').toLocaleString()}
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Stack>
          </DialogContent>

          <Divider />

          <DialogActions sx={{ p: 3, backgroundColor: 'white' }}>
            <Button
              onClick={onClose}
              disabled={loading}
              variant="outlined"
              sx={{
                borderRadius: 2,
                minWidth: 100,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              {dict?.common?.cancel || 'Cancel'}
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading || !formData.name || !formData.type}
              sx={{
                borderRadius: 2,
                minWidth: 120,
                textTransform: 'none',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                },
              }}
            >
              {loading ? dict?.common?.creating || 'Creating...' : dict?.account?.createNew || 'Create Account'}
            </Button>
          </DialogActions>
        </form>
      </Box>
    </Dialog>
  );
};

export default CreateAccountDialog;
