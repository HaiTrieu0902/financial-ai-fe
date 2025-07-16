'use client';

import { useAuthContext } from '@/context/useAuthContext';
import { Locale } from '@/i18n-config';
import { Dashboard, AccountBalance, Person, Logout, Menu as MenuIcon } from '@mui/icons-material';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

interface NavigationProps {
  lang: Locale;
}

export default function Navigation({ lang }: NavigationProps) {
  const { user, logout, isAuthenticated } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Overview', path: `/${lang}/dashboard`, icon: <Dashboard /> },
    { label: 'Accounts', path: `/${lang}/accounts`, icon: <AccountBalance /> },
    { label: 'Profile', path: `/${lang}/profile`, icon: <Person /> },
  ];

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    router.push(`/${lang}`);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!isAuthenticated) {
    return null;
  }

  const isActivePath = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <AppBar position="sticky" className="bg-white shadow-sm">
        <Toolbar>
          {/* Mobile menu button */}
          {isMobile && (
            <IconButton edge="start" onClick={() => setMobileMenuOpen(true)} className="text-gray-700 mr-2">
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo/Title */}
          <Typography
            variant="h6"
            className="text-gray-800 font-bold cursor-pointer"
            onClick={() => router.push(`/${lang}/dashboard`)}
          >
            Financial AI
          </Typography>

          <Box className="flex-1" />

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box className="flex items-center gap-1 mr-4">
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  startIcon={item.icon}
                  onClick={() => handleNavigation(item.path)}
                  className={`normal-case px-4 py-2 rounded-lg transition-colors ${
                    isActivePath(item.path) ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* User Menu */}
          <Box className="flex items-center gap-2">
            <IconButton onClick={handleProfileMenuOpen}>
              <Avatar className="w-8 h-8 bg-blue-600 text-white text-sm">
                {user
                  ? getInitials(user.fullname || user.username || user.email)
                  : 'U'}
              </Avatar>
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem
              onClick={() => {
                handleNavigation(`/${lang}/profile`);
                handleProfileMenuClose();
              }}
            >
              <Person className="mr-2" />
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout className="mr-2" />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <Box className="w-64 pt-4">
          <Typography variant="h6" className="px-4 mb-4 font-bold text-gray-800">
            Financial AI
          </Typography>
          <List>
            {navigationItems.map((item) => (
              <ListItem
                button
                key={item.path}
                selected={isActivePath(item.path)}
                onClick={() => handleNavigation(item.path)}
                className={isActivePath(item.path) ? 'bg-blue-50 border-r-4 border-blue-600' : ''}
              >
                <ListItemIcon className={isActivePath(item.path) ? 'text-blue-600' : 'text-gray-600'}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  className={isActivePath(item.path) ? 'text-blue-600' : 'text-gray-700'}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
