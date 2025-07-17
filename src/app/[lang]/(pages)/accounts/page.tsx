'use client';
import AccountManagement from '@/components/accounts/AccountManagement';
import { useI18n } from '@/context/I18nContext';

export default function AccountsPage() {
  const { dict, lang } = useI18n();
  return <AccountManagement dict={dict} lang={lang} />;
}
