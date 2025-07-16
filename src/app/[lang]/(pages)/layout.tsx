'use client';
import { use } from 'react';
import AuthGuard from '@/components/guard/AuthGuard';
import SidebarLayout from '@/components/layout/SidebarLayout';
import { I18nProvider } from '@/context/I18nContext';
import { Locale } from '@/i18n-config';

interface AuthLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default function AuthContainerLayout({ children, params }: AuthLayoutProps) {
  const { lang } = use(params);

  return (
    <I18nProvider initialLang={lang}>
      <AuthGuard>
        <SidebarLayout>{children}</SidebarLayout>
      </AuthGuard>
    </I18nProvider>
  );
}
