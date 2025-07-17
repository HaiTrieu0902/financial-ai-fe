'use client';

import { Receipt } from '@mui/icons-material';
import { Box, Tooltip, Typography, alpha, useTheme } from '@mui/material';

interface SidebarQuickActionsProps {
  collapsed: boolean;
}

export default function SidebarQuickActions({ collapsed }: SidebarQuickActionsProps) {
  const theme = useTheme();

  if (collapsed) return null;

  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        opacity: collapsed ? 0 : 1,
        transform: collapsed ? 'translateY(-10px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: '100ms',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: 1,
          px: 1,
        }}
      >
        Quick Actions
      </Typography>
      <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Tooltip title="Add new transaction (Coming soon)" placement="right">
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.success.main, 0.1),
              border: `1px dashed ${alpha(theme.palette.success.main, 0.3)}`,
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                bgcolor: alpha(theme.palette.success.main, 0.15),
                borderColor: theme.palette.success.main,
                transform: 'translateY(-1px)',
              },
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: 'success.main',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Receipt sx={{ fontSize: 16 }} />
              Add Transaction
            </Typography>
          </Box>
        </Tooltip>
      </Box>

      {/* Keyboard shortcuts hint */}
      <Box
        sx={{
          mt: 2,
          p: 1.5,
          borderRadius: 2,
          bgcolor: alpha(theme.palette.info.main, 0.05),
          border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 600,
            display: 'block',
            mb: 1,
          }}
        >
          Keyboard Shortcuts
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            <Box
              component="kbd"
              sx={{
                bgcolor: alpha(theme.palette.text.primary, 0.1),
                px: 0.5,
                borderRadius: 0.5,
                fontSize: '0.75rem',
                fontFamily: 'monospace',
              }}
            >
              Ctrl+B
            </Box>{' '}
            Toggle sidebar
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            <Box
              component="kbd"
              sx={{
                bgcolor: alpha(theme.palette.text.primary, 0.1),
                px: 0.5,
                borderRadius: 0.5,
                fontSize: '0.75rem',
                fontFamily: 'monospace',
              }}
            >
              Ctrl+/
            </Box>{' '}
            Open chat
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
