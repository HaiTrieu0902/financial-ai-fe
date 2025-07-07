import GuestGuard from '@/components/guard/GuestGuard';

interface GuestLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export default function GuestContainerLayout({ children, params }: GuestLayoutProps) {
  return <GuestGuard>{children}</GuestGuard>;
}
