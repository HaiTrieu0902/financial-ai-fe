'use client';

import { useAuthContext } from '@/context/useAuthContext';
import { useI18n } from '@/context/I18nContext';
import { Locale } from '@/i18n-config';
import ChatDrawer from '@/components/ChatDrawer';
import {
  Dashboard as DashboardIcon,
  AccountBalance,
  Person,
  Receipt,
  CreditCard,
  Settings,
  Help,
  Logout,
  Search,
  Notifications,
  ExpandMore,
  Chat,
  Wallet,
} from '@mui/icons-material';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Card,
  CardContent,
  alpha,
  useTheme,
  useMediaQuery,
  Fab,
} from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { useState, ReactNode } from 'react';

interface SidebarLayoutProps {
  children: ReactNode;
}

interface NavItem {
  label: string;
  icon: ReactNode;
  path: string;
  active?: boolean;
}

const DRAWER_WIDTH = 280;

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const { dict, lang } = useI18n();
  const { user, logout } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [chatOpen, setChatOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      label: 'Dashboard',
      icon: <DashboardIcon />,
      path: `/${lang}/dashboard`,
    },
    {
      label: 'Transactions',
      icon: <Receipt />,
      path: `/${lang}/transactions`,
    },
    {
      label: 'Accounts',
      icon: <AccountBalance />,
      path: `/${lang}/accounts`,
    },
    {
      label: 'My Wallets',
      icon: <Wallet />,
      path: `/${lang}/wallets`,
    },
    {
      label: 'Profile',
      icon: <Person />,
      path: `/${lang}/profile`,
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const isActivePath = (path: string) => {
    return pathname === path;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const sidebarContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo Section */}
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            FA
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Financial AI
          </Typography>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ flexGrow: 1, py: 2 }}>
        <List sx={{ px: 2 }}>
          {navItems.map((item) => {
            const isActive = isActivePath(item.path);
            return (
              <ListItem
                key={item.path}
                button
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  bgcolor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                  color: isActive ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    bgcolor: isActive
                      ? alpha(theme.palette.primary.main, 0.15)
                      : alpha(theme.palette.action.hover, 0.04),
                  },
                  '& .MuiListItemIcon-root': {
                    color: isActive ? 'primary.main' : 'text.secondary',
                    minWidth: 40,
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '0.95rem',
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <List>
          <ListItem button sx={{ borderRadius: 2, color: 'text.secondary' }}>
            <ListItemIcon sx={{ color: 'text.secondary', minWidth: 40 }}>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button sx={{ borderRadius: 2, color: 'text.secondary' }}>
            <ListItemIcon sx={{ color: 'text.secondary', minWidth: 40 }}>
              <Help />
            </ListItemIcon>
            <ListItemText primary="Help" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              bgcolor: 'background.paper',
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              bgcolor: 'background.paper',
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      )}

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top App Bar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
            color: 'text.primary',
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {isMobile && (
                <IconButton edge="start" onClick={handleDrawerToggle} sx={{ color: 'text.primary' }}>
                  <DashboardIcon />
                </IconButton>
              )}
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                {navItems.find((item) => isActivePath(item.path))?.label || 'Dashboard'}
              </Typography>
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
                  onClick={handleProfileMenuOpen}
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: 'primary.main',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                  }}
                >
                  {user ? getInitials(user.fullname || user.username || user.email) : 'U'}
                </Avatar>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                    {user?.fullname || user?.username || user?.email?.split('@')[0] || 'User'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Personal Account
                  </Typography>
                </Box>
                <IconButton size="small" onClick={handleProfileMenuOpen}>
                  <ExpandMore />
                </IconButton>
              </Box>

              {/* Profile Menu Dropdown */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={() => handleNavigation(`/${lang}/profile`)}>
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
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>

        {/* Chat FAB */}
        <Fab
          color="primary"
          onClick={() => setChatOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
        >
          <Chat />
        </Fab>

        {/* Chat Drawer */}
        <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} dict={dict} />
      </Box>
    </Box>
  );
}
