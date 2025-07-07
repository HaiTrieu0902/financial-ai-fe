import AuthGuard from '@/components/guard/AuthGuard';

interface AuthLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export default function AuthContainerLayout({ children, params }: AuthLayoutProps) {
  return <AuthGuard>{children}</AuthGuard>;
}
