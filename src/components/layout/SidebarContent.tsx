'use client';

import { Box } from '@mui/material';
import { ReactNode } from 'react';
import SidebarBottom from './SidebarBottom';
import SidebarLogo from './SidebarLogo';
import SidebarNavigation from './SidebarNavigation';
import SidebarQuickActions from './SidebarQuickActions';

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

interface SidebarContentProps {
  collapsed: boolean;
  isMobile: boolean;
  navItems: NavItem[];
  user?: User | null;
  activePathChecker: (path: string) => boolean;
  getInitials: (name: string) => string;
  onSidebarToggle: () => void;
  onNavigate: (path: string) => void;
}

export default function SidebarContent({
  collapsed,
  isMobile,
  navItems,
  user,
  activePathChecker,
  getInitials,
  onSidebarToggle,
  onNavigate,
}: SidebarContentProps) {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <SidebarLogo collapsed={collapsed} isMobile={isMobile} onToggle={onSidebarToggle} />

      <SidebarNavigation
        collapsed={collapsed}
        navItems={navItems}
        activePathChecker={activePathChecker}
        onNavigate={onNavigate}
      />

      <SidebarQuickActions collapsed={collapsed} />

      <SidebarBottom collapsed={collapsed} user={user} getInitials={getInitials} />
    </Box>
  );
}
