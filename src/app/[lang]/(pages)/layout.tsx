import AuthGuard from '@/components/guard/AuthGuard';
import SidebarLayout from '@/components/layout/SidebarLayout';
import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';

interface AuthLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function AuthContainerLayout({ children, params }: AuthLayoutProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <AuthGuard>
      <SidebarLayout dict={dict} lang={lang}>
        {children}
      </SidebarLayout>
    </AuthGuard>
  );
}
