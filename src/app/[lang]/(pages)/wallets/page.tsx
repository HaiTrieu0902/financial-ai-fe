import { Locale } from '@/i18n-config';
import { getDictionary } from '@/dictionaries';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Wallet } from '@mui/icons-material';

interface WalletsPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function WalletsPage({ params }: WalletsPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <Box>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Wallet sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            My Wallets
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Wallet management features coming soon...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
