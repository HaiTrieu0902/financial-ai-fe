import { Locale } from '@/i18n-config';
import { getDictionary } from '@/dictionaries';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Receipt } from '@mui/icons-material';

interface TransactionsPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function TransactionsPage({ params }: TransactionsPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <Box>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Receipt sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Transactions
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Transaction management features coming soon...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
