import { Inter } from 'next/font/google';
import ClientThemeProvider from '@/components/ClientThemeProvider';
import { AuthProvider } from '@/context/useAuthContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ClientThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
