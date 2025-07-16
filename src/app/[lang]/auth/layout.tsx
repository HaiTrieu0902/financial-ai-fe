'use client';
import { use } from 'react';
import GuestGuard from '@/components/guard/GuestGuard';
import { I18nProvider } from '@/context/I18nContext';
import { Locale } from '@/i18n-config';

interface GuestLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default function GuestContainerLayout({ children, params }: GuestLayoutProps) {
  const { lang } = use(params);

  return (
    <I18nProvider initialLang={lang as Locale}>
      <GuestGuard>{children}</GuestGuard>
    </I18nProvider>
  );
}
