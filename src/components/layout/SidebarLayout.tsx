'use client';

import ChatDrawer from '@/components/ChatDrawer';
import { useI18n } from '@/context/I18nContext';
import { useAuthContext } from '@/context/useAuthContext';
import { useSidebarState } from '@/hooks/useSidebarState';
import { AccountBalance, Chat, Dashboard as DashboardIcon, Person, Receipt, Wallet } from '@mui/icons-material';
import { Box, Drawer, Fab, alpha, useMediaQuery, useTheme } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import SidebarContent from './SidebarContent';
import TopAppBar from './TopAppBar';

interface SidebarLayoutProps {
  children: ReactNode;
}

interface NavItem {
  label: string;
  icon: ReactNode;
  path: string;
}

const DRAWER_WIDTH = 280;
const COLLAPSED_DRAWER_WIDTH = 72;

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const { dict, lang } = useI18n();
  const { user, logout } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {
    mobileOpen,
    anchorEl,
    chatOpen,
    sidebarCollapsed,
    setChatOpen,
    handleDrawerToggle,
    handleSidebarToggle,
    handleProfileMenuOpen,
    handleProfileMenuClose,
  } = useSidebarState(isMobile);

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

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    router.push(`/${lang}`);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    if (isMobile) {
      handleDrawerToggle();
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

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: sidebarCollapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH,
            flexShrink: 0,
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '& .MuiDrawer-paper': {
              width: sidebarCollapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH,
              boxSizing: 'border-box',
              bgcolor: 'background.paper',
              borderRight: '1px solid',
              borderColor: 'divider',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden',
              boxShadow: sidebarCollapsed
                ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                : '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
              position: 'relative',
              '&:hover': {
                '& .sidebar-expand-hint': {
                  opacity: sidebarCollapsed ? 1 : 0,
                  transform: sidebarCollapsed ? 'translateX(0)' : 'translateX(-10px)',
                },
              },
            },
          }}
        >
          <SidebarContent
            collapsed={sidebarCollapsed}
            isMobile={isMobile}
            navItems={navItems}
            user={user}
            activePathChecker={isActivePath}
            getInitials={getInitials}
            onSidebarToggle={handleSidebarToggle}
            onNavigate={handleNavigation}
          />

          {/* Expand hint overlay for collapsed state */}
          {sidebarCollapsed && (
            <Box
              className="sidebar-expand-hint"
              sx={{
                position: 'absolute',
                top: '50%',
                right: -2,
                transform: 'translateY(-50%) translateX(-10px)',
                width: 4,
                height: 60,
                bgcolor: 'primary.main',
                borderRadius: '0 4px 4px 0',
                opacity: 0,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: 'none',
                background: 'linear-gradient(to bottom, transparent, primary.main, transparent)',
              }}
            />
          )}
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
          <SidebarContent
            collapsed={false}
            isMobile={isMobile}
            navItems={navItems}
            user={user}
            activePathChecker={isActivePath}
            getInitials={getInitials}
            onSidebarToggle={handleSidebarToggle}
            onNavigate={handleNavigation}
          />
        </Drawer>
      )}

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <TopAppBar
          isMobile={isMobile}
          sidebarCollapsed={sidebarCollapsed}
          navItems={navItems}
          user={user}
          anchorEl={anchorEl}
          activePathChecker={isActivePath}
          getInitials={getInitials}
          onDrawerToggle={handleDrawerToggle}
          onSidebarToggle={handleSidebarToggle}
          onProfileMenuOpen={handleProfileMenuOpen}
          onProfileMenuClose={handleProfileMenuClose}
          onNavigation={handleNavigation}
          onLogout={handleLogout}
          lang={lang}
        />

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            transition: 'margin-left 0.3s ease-in-out',
            bgcolor: '#f8f9fa',
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          {children}
        </Box>

        {/* Chat FAB with sidebar-aware positioning */}
        <Fab
          color="primary"
          onClick={() => setChatOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: chatOpen ? 'scale(0.9) rotate(45deg)' : 'scale(1) rotate(0deg)',
            bgcolor: 'primary.main',
            boxShadow: '0 8px 25px rgba(103, 126, 234, 0.4)',
            '&:hover': {
              bgcolor: 'primary.dark',
              transform: chatOpen ? 'scale(1) rotate(45deg)' : 'scale(1.1) rotate(0deg)',
              boxShadow: '0 12px 35px rgba(103, 126, 234, 0.5)',
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              top: -2,
              left: -2,
              right: -2,
              bottom: -2,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              zIndex: -1,
              opacity: 0,
              transition: 'opacity 0.3s ease',
            },
            '&:hover:before': {
              opacity: 0.7,
            },
          }}
        >
          <Chat
            sx={{
              transition: 'transform 0.3s ease',
              transform: chatOpen ? 'rotate(-45deg)' : 'rotate(0deg)',
            }}
          />
        </Fab>

        {/* Chat Drawer */}
        <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} dict={dict} />
      </Box>
    </Box>
  );
}
