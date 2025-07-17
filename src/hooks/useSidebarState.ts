'use client';

import { useEffect, useState } from 'react';

export function useSidebarState(isMobile: boolean) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarCollapsed');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  // Persist sidebar state
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+B to toggle sidebar
      if (event.ctrlKey && event.key === 'b' && !isMobile) {
        event.preventDefault();
        setSidebarCollapsed((prev: boolean) => !prev);
      }
      // Ctrl+/ to open chat
      if (event.ctrlKey && event.key === '/') {
        event.preventDefault();
        setChatOpen((prev: boolean) => !prev);
      }
      // Escape to close mobile drawer
      if (event.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobile, mobileOpen]);

  // Auto-collapse on mobile orientation change
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(false); // Always expand on mobile for better UX
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return {
    mobileOpen,
    anchorEl,
    chatOpen,
    sidebarCollapsed,
    setChatOpen,
    handleDrawerToggle,
    handleSidebarToggle,
    handleProfileMenuOpen,
    handleProfileMenuClose,
  };
}
