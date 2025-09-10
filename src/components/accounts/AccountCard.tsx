import { AccountResponse } from '@/interface/account.interface';
import { formatCurrency } from '@/utils';
import {
  AccountBalance,
  AccountBalanceWallet,
  CreditCard,
  Delete,
  Edit,
  MoreVert,
  Savings,
  Visibility,
  AttachMoney,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  Avatar,
} from '@mui/material';
import React, { useState } from 'react';

interface AccountCardProps {
  account: AccountResponse;
  onEdit: (account: AccountResponse) => void;
  onDelete: (id: string) => void;
  onView: (account: AccountResponse) => void;
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
    switch (type.toUpperCase()) {
      case 'CASH':
        return <AttachMoney className="text-green-600" />;
      case 'BANK':
        return <AccountBalance className="text-blue-600" />;
      case 'E-WALLET':
        return <CreditCard className="text-purple-600" />;
      default:
        return <AccountBalance className="text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toUpperCase()) {
      case 'CASH':
        return 'success';
      case 'BANK':
        return 'primary';
      case 'E-WALLET':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getCardGradient = (type: string) => {
    switch (type.toUpperCase()) {
      case 'CASH':
        return 'from-green-50 to-emerald-100';
      case 'BANK':
        return 'from-blue-50 to-indigo-100';
      case 'E-WALLET':
        return 'from-purple-50 to-violet-100';
      default:
        return 'from-gray-50 to-slate-100';
    }
  };

  const getIconBackground = (type: string) => {
    switch (type.toUpperCase()) {
      case 'CASH':
        return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      case 'BANK':
        return 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
      case 'E-WALLET':
        return 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)';
      default:
        return 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
    }
  };

  return (
    <Card
      className={`hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br ${getCardGradient(
        account.type,
      )} border-0 overflow-hidden relative`}
      sx={{
        borderRadius: 3,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: getIconBackground(account.type),
        },
      }}
    >
      {/* Decorative background pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: -15,
          right: -15,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: getIconBackground(account.type),
          opacity: 0.1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -20,
          left: -20,
          width: 70,
          height: 70,
          borderRadius: '50%',
          background: getIconBackground(account.type),
          opacity: 0.05,
        }}
      />

      <CardContent sx={{ position: 'relative', zIndex: 1, p: 2 }}>
        {/* Header with Icon and Menu */}
        <Box className="flex justify-between items-start mb-3">
          <Box className="flex items-center gap-2">
            <Avatar
              sx={{
                background: getIconBackground(account.type),
                width: 36,
                height: 36,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              {React.cloneElement(getAccountIcon(account.type), {
                className: 'text-white',
                sx: { fontSize: 18 },
              })}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" className="font-bold text-gray-800 mb-0 leading-tight">
                {account.name}
              </Typography>
              <Typography variant="caption" className="text-gray-500 uppercase tracking-wider text-xs">
                {account.type.replace('-', ' ')}
              </Typography>
            </Box>
          </Box>

          <IconButton
            size="small"
            onClick={handleMenuClick}
            sx={{
              backgroundColor: 'white',
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              width: 28,
              height: 28,
              '&:hover': {
                backgroundColor: 'white',
                transform: 'scale(1.05)',
              },
            }}
          >
            <MoreVert sx={{ fontSize: 16 }} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: {
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                border: '1px solid #f0f0f0',
              },
            }}
          >
            <MenuItem
              onClick={() => {
                onView(account);
                handleMenuClose();
              }}
              sx={{ py: 1.5 }}
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
              sx={{ py: 1.5 }}
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
              sx={{ py: 1.5 }}
            >
              <ListItemIcon>
                <Delete fontSize="small" className="text-red-600" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
        </Box>

        {/* Balance */}
        <Box className="mb-3">
          <Typography variant="caption" className="text-gray-500 mb-1 font-medium text-xs">
            Current Balance
          </Typography>
          <Typography
            variant="h5"
            className="font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              lineHeight: 1.2,
            }}
          >
            {formatCurrency(account.balance, account.currency)}
          </Typography>
        </Box>

        {/* Type and Currency */}
        <Box className="flex justify-between items-center mb-3">
          <Chip
            label={account.type.replace('-', ' ')}
            color={getTypeColor(account.type) as any}
            size="small"
            variant="filled"
            sx={{
              fontWeight: 600,
              textTransform: 'capitalize',
              borderRadius: 1.5,
              fontSize: '0.7rem',
              height: 24,
            }}
          />
          <Box className="px-2 py-0.5 rounded-full bg-white shadow-sm border text-xs" sx={{ borderColor: 'divider' }}>
            <Typography variant="caption" className="font-semibold text-gray-700 text-xs">
              {account.currency}
            </Typography>
          </Box>
        </Box>

        {/* Footer Info */}
        <Box className="space-y-1">
          <Box className="flex justify-between items-center">
            <Typography variant="caption" className="text-gray-600 font-medium text-xs">
              Account Holder
            </Typography>
            <Typography variant="caption" className="text-gray-800 font-semibold text-xs">
              {account.user?.fullname || 'Unknown'}
            </Typography>
          </Box>
          <Box className="flex justify-between items-center">
            <Typography variant="caption" className="text-gray-600 font-medium text-xs">
              Created
            </Typography>
            <Typography variant="caption" className="text-gray-800 font-semibold text-xs">
              {new Date(account.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
export default AccountCard;
