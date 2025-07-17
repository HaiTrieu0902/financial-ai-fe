'use client';

import { ChevronLeft } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography, alpha, useTheme } from '@mui/material';

interface SidebarLogoProps {
  collapsed: boolean;
  isMobile: boolean;
  onToggle: () => void;
}

export default function SidebarLogo({ collapsed, isMobile, onToggle }: SidebarLogoProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: collapsed ? 1.5 : 3,
        borderBottom: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        background: collapsed
          ? 'transparent'
          : 'linear-gradient(135deg, rgba(103, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: collapsed ? 0 : 2,
          justifyContent: collapsed ? 'center' : 'flex-start',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Tooltip title={collapsed ? 'Financial AI - Click to expand' : ''} placement="right" arrow>
          <Box
            sx={{
              width: collapsed ? 36 : 40,
              height: collapsed ? 36 : 40,
              borderRadius: collapsed ? 3 : 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: collapsed ? '1rem' : '1.2rem',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transition: 'left 0.5s',
              },
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 25px rgba(103, 126, 234, 0.3)',
                '&:before': {
                  left: '100%',
                },
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
            }}
            onClick={onToggle}
          >
            FA
          </Box>
        </Tooltip>
        <Box
          sx={{
            overflow: 'hidden',
            width: collapsed ? 0 : 'auto',
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              whiteSpace: 'nowrap',
              opacity: collapsed ? 0 : 1,
              transform: collapsed ? 'translateX(-20px)' : 'translateX(0)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            Financial AI
          </Typography>
        </Box>
      </Box>

      {/* Collapse Toggle Button - Only show when expanded */}
      {!isMobile && !collapsed && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 2,
            opacity: collapsed ? 0 : 1,
            transform: collapsed ? 'translateY(-10px)' : 'translateY(0)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Tooltip title="Collapse sidebar (Ctrl+B)" placement="right" arrow>
            <IconButton
              onClick={onToggle}
              size="small"
              sx={{
                color: 'text.secondary',
                bgcolor: alpha(theme.palette.action.hover, 0.04),
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.main',
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <ChevronLeft />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
}
