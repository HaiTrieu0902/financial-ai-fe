'use client';

import { Box, List, ListItem, ListItemIcon, ListItemText, Tooltip, Typography, alpha, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface NavItem {
  label: string;
  icon: ReactNode;
  path: string;
}

interface SidebarNavigationProps {
  collapsed: boolean;
  navItems: NavItem[];
  activePathChecker: (path: string) => boolean;
  onNavigate: (path: string) => void;
}

export default function SidebarNavigation({
  collapsed,
  navItems,
  activePathChecker,
  onNavigate,
}: SidebarNavigationProps) {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1, py: 2 }}>
      <List
        sx={{
          px: collapsed ? 1 : 2,
          transition: 'padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {navItems.map((item, index) => {
          const isActive = activePathChecker(item.path);
          const listItem = (
            <ListItem
              key={item.path}
              button
              onClick={() => onNavigate(item.path)}
              sx={{
                borderRadius: 3,
                mb: 1,
                bgcolor: isActive ? alpha(theme.palette.primary.main, 0.12) : 'transparent',
                color: isActive ? 'primary.main' : 'text.secondary',
                justifyContent: collapsed ? 'center' : 'flex-start',
                px: collapsed ? 1 : 2,
                minHeight: 52,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: collapsed ? 'scale(0.9)' : 'scale(1)',
                // Staggered animation delay
                transitionDelay: `${index * 50}ms`,
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: collapsed ? '50%' : '-100%',
                  width: collapsed ? '2px' : '4px',
                  height: '100%',
                  background: 'linear-gradient(to bottom, transparent, primary.main, transparent)',
                  opacity: isActive ? 1 : 0,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: collapsed ? 'translateX(-50%)' : 'translateX(0)',
                },
                '&:hover': {
                  bgcolor: isActive ? alpha(theme.palette.primary.main, 0.18) : alpha(theme.palette.action.hover, 0.08),
                  transform: collapsed ? 'scale(1)' : 'translateX(4px) scale(1.02)',
                  boxShadow: isActive
                    ? `0 4px 20px ${alpha(theme.palette.primary.main, 0.25)}`
                    : '0 2px 8px rgba(0,0,0,0.1)',
                  '&:before': {
                    opacity: 1,
                    left: collapsed ? '50%' : '0',
                  },
                },
                '&:active': {
                  transform: collapsed ? 'scale(0.95)' : 'translateX(2px) scale(0.98)',
                },
                '& .MuiListItemIcon-root': {
                  color: isActive ? 'primary.main' : 'text.secondary',
                  minWidth: collapsed ? 'auto' : 40,
                  justifyContent: 'center',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '& svg': {
                    fontSize: collapsed ? '1.4rem' : '1.25rem',
                    filter: isActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' : 'none',
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Box
                sx={{
                  overflow: 'hidden',
                  width: collapsed ? 0 : 'auto',
                  transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.95rem',
                    style: {
                      whiteSpace: 'nowrap',
                      opacity: collapsed ? 0 : 1,
                      transform: collapsed ? 'translateX(-20px)' : 'translateX(0)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    },
                  }}
                />
              </Box>
            </ListItem>
          );

          return collapsed ? (
            <Tooltip
              key={item.path}
              title={
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item.label}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Click to navigate
                  </Typography>
                </Box>
              }
              placement="right"
              arrow
              enterDelay={300}
              leaveDelay={0}
            >
              {listItem}
            </Tooltip>
          ) : (
            listItem
          );
        })}
      </List>
    </Box>
  );
}
