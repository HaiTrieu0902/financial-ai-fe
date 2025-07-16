import AccountManagement from '@/components/accounts/AccountManagement';
import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';

interface AccountsPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function AccountsPage({ params }: AccountsPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <AccountManagement />;
}
