import { Locale } from '@/i18n-config';
import { getDictionary } from '@/dictionaries';
import DashboardStats from '@/components/dashboard/DashboardStats';

export default async function DashboardPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <DashboardStats lang={lang} />;
}
