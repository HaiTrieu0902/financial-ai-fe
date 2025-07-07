import { Locale } from '@/i18n-config';
import { getDictionary } from '@/dictionaries';
import Dashboard from '@/components/Dashboard';

export default async function DashboardPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <Dashboard dict={dict} lang={lang} />;
}
