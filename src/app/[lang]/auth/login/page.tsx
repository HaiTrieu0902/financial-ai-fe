import { Locale } from '@/i18n-config';
import { getDictionary } from '@/dictionaries';
import LoginForm from '@/components/auth/LoginForm';

export default async function LoginPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <LoginForm dict={dict} lang={lang} />;
}
