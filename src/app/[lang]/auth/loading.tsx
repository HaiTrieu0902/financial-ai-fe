import { Box, Container, Paper, Skeleton } from '@mui/material';

export default function Loading() {
  return (
    <Container maxWidth="sm" className="mt-8 mb-8">
      <Paper elevation={0} className="p-8 bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl">
        <Box className="text-center mb-6">
          <Skeleton variant="text" width="60%" height={48} className="mx-auto mb-4" />
          <Skeleton variant="text" width="80%" height={24} className="mx-auto" />
        </Box>
        <Box className="space-y-4">
          <Skeleton variant="rectangular" height={56} className="rounded-lg" />
          <Skeleton variant="rectangular" height={56} className="rounded-lg" />
          <Skeleton variant="rectangular" height={48} className="rounded-lg mt-6" />
        </Box>
        <Box className="text-center mt-6">
          <Skeleton variant="text" width="70%" height={20} className="mx-auto" />
        </Box>
      </Paper>
    </Container>
  );
}
