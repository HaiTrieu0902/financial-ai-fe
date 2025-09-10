'use client';

import { AccountResponse } from '@/interface/account.interface';
import { formatCurrency } from '@/utils';
import { AccountBalance, TrendingDown, TrendingUp, Visibility, VisibilityOff } from '@mui/icons-material';
import {
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
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { useState } from 'react';

interface AccountDetailDialogProps {
  open: boolean;
  onClose: () => void;
  account: AccountResponse | null;
}

export function AccountDetailDialog({ open, onClose, account }: AccountDetailDialogProps) {
  const [balanceVisible, setBalanceVisible] = useState(true);

  if (!account) return null;

  const getAccountTypeColor = (type: string) => {
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

  const isPositiveBalance = account.balance >= 0;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="flex items-center gap-2">
        <AccountBalance />
        Account Details
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          {/* Account Overview Card */}
          <Grid item xs={12}>
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent>
                <Box className="flex justify-between items-start mb-4">
                  <Box>
                    <Typography variant="h4" className="font-bold text-gray-800 mb-2">
                      {account.name}
                    </Typography>
                    <Chip label={account.type} color={getAccountTypeColor(account.type) as any} variant="outlined" />
                  </Box>
                  <Box className="text-right">
                    <Box className="flex items-center gap-2 mb-2">
                      <Typography
                        variant="h3"
                        className={`font-bold ${isPositiveBalance ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {balanceVisible ? formatCurrency(account.balance, account.currency) : '••••••'}
                      </Typography>
                      <IconButton onClick={() => setBalanceVisible(!balanceVisible)} size="small">
                        {balanceVisible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </Box>
                    <Box className="flex items-center gap-1">
                      {isPositiveBalance ? (
                        <TrendingUp className="text-green-600" />
                      ) : (
                        <TrendingDown className="text-red-600" />
                      )}
                      <Typography variant="body2" className="text-gray-600">
                        {account.currency}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Account Information */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className="mb-3 font-semibold">
              Account Information
            </Typography>
            <Box className="space-y-3">
              <Box>
                <Typography variant="body2" className="text-gray-500 mb-1">
                  Account ID
                </Typography>
                <Typography variant="body1" className="font-mono text-sm bg-gray-100 p-2 rounded">
                  {account.id}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" className="text-gray-500 mb-1">
                  Account Type
                </Typography>
                <Typography variant="body1" className="capitalize">
                  {account.type}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" className="text-gray-500 mb-1">
                  Currency
                </Typography>
                <Typography variant="body1">{account.currency}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" className="text-gray-500 mb-1">
                  Status
                </Typography>
                <Chip
                  label={account.isDeleted ? 'Deleted' : 'Active'}
                  color={account.isDeleted ? 'error' : 'success'}
                  size="small"
                />
              </Box>
            </Box>
          </Grid>

          {/* Owner Information */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className="mb-3 font-semibold">
              Owner Information
            </Typography>
            <Box className="space-y-3">
              <Box>
                <Typography variant="body2" className="text-gray-500 mb-1">
                  Owner Name
                </Typography>
                <Typography variant="body1">{account.user?.fullname || 'Unknown'}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" className="text-gray-500 mb-1">
                  Email
                </Typography>
                <Typography variant="body1">{account.user?.email || 'N/A'}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" className="text-gray-500 mb-1">
                  Username
                </Typography>
                <Typography variant="body1">{account.user?.username || 'N/A'}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider className="my-4" />
          </Grid>

          {/* Timestamps */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className="mb-3 font-semibold">
              Timeline
            </Typography>
            <Box className="space-y-3">
              <Box>
                <Typography variant="body2" className="text-gray-500 mb-1">
                  Created Date
                </Typography>
                <Typography variant="body1">{new Date(account.createdAt).toLocaleString()}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" className="text-gray-500 mb-1">
                  Last Updated
                </Typography>
                <Typography variant="body1">{new Date(account.updatedAt).toLocaleString()}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" className="text-gray-500 mb-1">
                  Created By
                </Typography>
                <Typography variant="body1">{account.createdBy || 'System'}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" className="text-gray-500 mb-1">
                  Updated By
                </Typography>
                <Typography variant="body1">{account.updatedBy || 'N/A'}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
