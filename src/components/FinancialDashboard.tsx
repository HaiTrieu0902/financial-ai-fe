'use client';

import { useAuthContext } from '@/context/useAuthContext';
import { Locale } from '@/i18n-config';
import AccountManagement from '@/components/accounts/AccountManagement';
import UserProfile from '@/components/auth/UserProfile';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import {
  Dashboard as DashboardIcon,
  AccountBalance,
  Person,
  Settings,
  Menu as MenuIcon,
  Close,
} from '@mui/icons-material';
import {
  Box,
  Container,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Paper,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface FinancialDashboardProps {
  dict: any;
  lang: Locale;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `dashboard-tab-${index}`,
    'aria-controls': `dashboard-tabpanel-${index}`,
  };
}

export default function FinancialDashboard({ dict, lang }: FinancialDashboardProps) {
  const { user, isAuthenticated, loading: authLoading } = useAuthContext();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [tabValue, setTabValue] = useState(0);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push(`/${lang}/auth/login`);
    }
  }, [isAuthenticated, authLoading, lang, router]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
  };

  const handleLogout = () => {
    router.push(`/${lang}`);
  };

  const tabs = [
    {
      label: 'Overview',
      icon: <DashboardIcon />,
      component: <AccountManagement />,
    },
    {
      label: 'Accounts',
      icon: <AccountBalance />,
      component: <AccountManagement />,
    },
    {
      label: 'Profile',
      icon: <Person />,
      component: <UserProfile onLogout={handleLogout} />,
    },
  ];

  const drawerContent = (
    <Box className="w-64">
      <Box className="p-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <Box className="flex items-center justify-between">
          <Typography variant="h6" className="text-white font-bold">
            Financial AI
          </Typography>
          {isMobile && (
            <IconButton onClick={() => setMobileDrawerOpen(false)} className="text-white">
              <Close />
            </IconButton>
          )}
        </Box>
        {user && (
          <Typography variant="body2" className="text-blue-100 mt-2">
            Welcome, {user.fullname || user.username || user.email}
          </Typography>
        )}
      </Box>

      <List>
        {tabs.map((tab, index) => (
          <ListItem
            button
            key={index}
            selected={tabValue === index}
            onClick={() => handleTabChange({} as any, index)}
            className={`${tabValue === index ? 'bg-blue-50 border-r-4 border-blue-600' : 'hover:bg-gray-50'}`}
          >
            <ListItemIcon className={tabValue === index ? 'text-blue-600' : 'text-gray-600'}>{tab.icon}</ListItemIcon>
            <ListItemText primary={tab.label} className={tabValue === index ? 'text-blue-600' : 'text-gray-700'} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  if (authLoading) {
    return (
      <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Mobile App Bar */}
      {isMobile && (
        <AppBar position="sticky" className="bg-white shadow-sm">
          <Toolbar>
            <IconButton edge="start" onClick={() => setMobileDrawerOpen(true)} className="text-gray-700">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="flex-1 text-gray-800 font-bold">
              {tabs[tabValue].label}
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Box className="flex">
        {/* Desktop Sidebar */}
        {!isMobile && <Paper className="w-64 min-h-screen shadow-lg">{drawerContent}</Paper>}

        {/* Mobile Drawer */}
        {isMobile && (
          <Drawer
            anchor="left"
            open={mobileDrawerOpen}
            onClose={() => setMobileDrawerOpen(false)}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
          >
            {drawerContent}
          </Drawer>
        )}

        {/* Main Content */}
        <Box className="flex-1">
          {/* Desktop Tabs */}
          {!isMobile && (
            <Box className="bg-white shadow-sm border-b">
              <Container maxWidth="lg">
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  className="min-h-16"
                  TabIndicatorProps={{
                    className: 'bg-blue-600',
                  }}
                >
                  {tabs.map((tab, index) => (
                    <Tab
                      key={index}
                      label={tab.label}
                      icon={tab.icon}
                      iconPosition="start"
                      className="normal-case font-medium"
                      {...a11yProps(index)}
                    />
                  ))}
                </Tabs>
              </Container>
            </Box>
          )}

          {/* Tab Panels */}
          {tabs.map((tab, index) => (
            <TabPanel key={index} value={tabValue} index={index}>
              <ErrorBoundary>
                <Box className="min-h-screen">{tab.component}</Box>
              </ErrorBoundary>
            </TabPanel>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
