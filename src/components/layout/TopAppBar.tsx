'use client';

import {
  ExpandMore,
  Logout,
  Menu as MenuIcon,
  MenuOpen,
  Notifications,
  Person,
  Search,
  Settings,
} from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { ReactNode } from 'react';

interface NavItem {
  label: string;
  icon: ReactNode;
  path: string;
}

interface User {
  fullname?: string;
  username?: string;
  email?: string;
}

interface TopAppBarProps {
  isMobile: boolean;
  sidebarCollapsed: boolean;
  navItems: NavItem[];
  user?: User | null;
  anchorEl: HTMLElement | null;
  activePathChecker: (path: string) => boolean;
  getInitials: (name: string) => string;
  onDrawerToggle: () => void;
  onSidebarToggle: () => void;
  onProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onProfileMenuClose: () => void;
  onNavigation: (path: string) => void;
  onLogout: () => void;
  lang: string;
}

export default function TopAppBar({
  isMobile,
  sidebarCollapsed,
  navItems,
  user,
  anchorEl,
  activePathChecker,
  getInitials,
  onDrawerToggle,
  onSidebarToggle,
  onProfileMenuOpen,
  onProfileMenuClose,
  onNavigation,
  onLogout,
  lang,
}: TopAppBarProps) {
  const theme = useTheme();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:before': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(103, 126, 234, 0.3), transparent)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover:before': {
          opacity: 1,
        },
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isMobile && (
            <IconButton
              edge="start"
              onClick={onDrawerToggle}
              sx={{
                color: 'text.primary',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.main',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {!isMobile && (
            <Tooltip title={`${sidebarCollapsed ? 'Expand' : 'Collapse'} sidebar (Ctrl+B)`} placement="bottom" arrow>
              <IconButton
                edge="start"
                onClick={onSidebarToggle}
                sx={{
                  color: 'text.primary',
                  transition: 'all 0.2s ease',
                  transform: sidebarCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main',
                    transform: sidebarCollapsed ? 'rotate(180deg) scale(1.1)' : 'rotate(0deg) scale(1.1)',
                  },
                }}
              >
                {sidebarCollapsed ? <MenuIcon /> : <MenuOpen />}
              </IconButton>
            </Tooltip>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {navItems.find((item) => activePathChecker(item.path))?.label || 'Dashboard'}
            </Typography>
            {/* Breadcrumb indicator */}
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                opacity: 0.6,
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
                  '50%': { opacity: 1, transform: 'scale(1.2)' },
                },
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Search */}
          <Box
            sx={{
              position: 'relative',
              borderRadius: 3,
              bgcolor: alpha(theme.palette.common.black, 0.04),
              '&:hover': {
                bgcolor: alpha(theme.palette.common.black, 0.06),
              },
              width: { xs: 'auto', sm: 300 },
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <Box
              sx={{
                padding: theme.spacing(0, 2),
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Search sx={{ color: 'text.secondary' }} />
            </Box>
            <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              sx={{
                color: 'inherit',
                width: '100%',
                '& .MuiInputBase-input': {
                  padding: theme.spacing(1, 1, 1, 0),
                  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                  transition: theme.transitions.create('width'),
                },
              }}
            />
          </Box>

          {/* Notifications */}
          <IconButton sx={{ color: 'text.secondary' }}>
            <Badge badgeContent={3} color="primary">
              <Notifications />
            </Badge>
          </IconButton>

          {/* Profile Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar
              onClick={onProfileMenuOpen}
              sx={{
                width: 36,
                height: 36,
                bgcolor: 'primary.main',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              {user ? getInitials(user.fullname || user.username || user.email || '') : 'U'}
            </Avatar>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                {user?.fullname || user?.username || user?.email?.split('@')[0] || 'User'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Personal Account
              </Typography>
            </Box>
            <IconButton size="small" onClick={onProfileMenuOpen}>
              <ExpandMore />
            </IconButton>
          </Box>

          {/* Profile Menu Dropdown */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onProfileMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => onNavigation(`/${lang}/profile`)}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={onLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
