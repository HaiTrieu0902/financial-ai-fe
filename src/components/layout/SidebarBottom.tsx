'use client';

import { Help, Settings } from '@mui/icons-material';
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';

interface User {
  fullname?: string;
  username?: string;
  email?: string;
}

interface SidebarBottomProps {
  collapsed: boolean;
  user?: User | null;
  getInitials: (name: string) => string;
}

export default function SidebarBottom({ collapsed, user, getInitials }: SidebarBottomProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: collapsed ? 1 : 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        background: collapsed ? 'transparent' : alpha(theme.palette.background.default, 0.5),
      }}
    >
      <List>
        <Tooltip title={collapsed ? 'Settings' : ''} placement="right" arrow enterDelay={300}>
          <ListItem
            button
            sx={{
              borderRadius: 3,
              color: 'text.secondary',
              justifyContent: collapsed ? 'center' : 'flex-start',
              px: collapsed ? 1 : 2,
              minHeight: 48,
              mb: 0.5,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                bgcolor: alpha(theme.palette.action.hover, 0.08),
                color: 'text.primary',
                transform: collapsed ? 'scale(1.1)' : 'translateX(2px)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: 'inherit',
                minWidth: collapsed ? 'auto' : 40,
                justifyContent: 'center',
                transition: 'min-width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <Settings />
            </ListItemIcon>
            <Box
              sx={{
                overflow: 'hidden',
                width: collapsed ? 0 : 'auto',
                transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <ListItemText
                primary="Settings"
                sx={{
                  '& .MuiTypography-root': {
                    whiteSpace: 'nowrap',
                    opacity: collapsed ? 0 : 1,
                    transform: collapsed ? 'translateX(-20px)' : 'translateX(0)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  },
                }}
              />
            </Box>
          </ListItem>
        </Tooltip>
        <Tooltip title={collapsed ? 'Help & Support' : ''} placement="right" arrow enterDelay={300}>
          <ListItem
            button
            sx={{
              borderRadius: 3,
              color: 'text.secondary',
              justifyContent: collapsed ? 'center' : 'flex-start',
              px: collapsed ? 1 : 2,
              minHeight: 48,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                bgcolor: alpha(theme.palette.action.hover, 0.08),
                color: 'text.primary',
                transform: collapsed ? 'scale(1.1)' : 'translateX(2px)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: 'inherit',
                minWidth: collapsed ? 'auto' : 40,
                justifyContent: 'center',
                transition: 'min-width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <Help />
            </ListItemIcon>
            <Box
              sx={{
                overflow: 'hidden',
                width: collapsed ? 0 : 'auto',
                transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <ListItemText
                primary="Help"
                sx={{
                  '& .MuiTypography-root': {
                    whiteSpace: 'nowrap',
                    opacity: collapsed ? 0 : 1,
                    transform: collapsed ? 'translateX(-20px)' : 'translateX(0)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  },
                }}
              />
            </Box>
          </ListItem>
        </Tooltip>
      </List>

      {/* User info - Only show when expanded */}
      {!collapsed && user && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 3,
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            opacity: collapsed ? 0 : 1,
            transform: collapsed ? 'translateY(10px)' : 'translateY(0)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: '150ms',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'primary.main',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}
            >
              {getInitials(user.fullname || user.username || user.email || '')}
            </Avatar>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  lineHeight: 1.2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {user.fullname || user.username || user.email?.split('@')[0] || 'User'}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'block',
                }}
              >
                Personal Account
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
