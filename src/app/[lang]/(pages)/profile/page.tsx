'use client';
import UserProfile from '@/components/auth/UserProfile';
import { useI18n } from '@/context/I18nContext';

export default function ProfilePage() {
  const { dict, lang } = useI18n();
  return <UserProfile onLogout={() => {}} dict={dict} lang={lang} />;
}
