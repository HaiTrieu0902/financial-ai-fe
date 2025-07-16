import UserProfile from '@/components/auth/UserProfile';
import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';

interface ProfilePageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <UserProfile
      onLogout={() => {
        // This will be handled by the component itself
      }}
    />
  );
}
