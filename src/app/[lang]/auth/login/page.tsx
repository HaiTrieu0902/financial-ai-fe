'use client';
import LoginForm from '@/components/auth/LoginForm';
import { useI18n } from '@/context/I18nContext';

export default function LoginPage() {
  const { dict, lang, loading } = useI18n();

  console.log('LoginPage - Current Language:', lang);
  console.log('LoginPage - Current Dictionary:', dict);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <LoginForm dict={dict} lang={lang} />;
}
