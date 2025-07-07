import { Box, CircularProgress, Typography } from '@mui/material'

export default function Loading() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={2}
    >
      <CircularProgress size={48} />
      <Typography variant="h6" color="text.secondary">
        Loading...
      </Typography>
    </Box>
  )
}
