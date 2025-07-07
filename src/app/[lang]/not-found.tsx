import Link from 'next/link'
import { Box, Typography, Button } from '@mui/material'

export default function NotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={2}
      p={4}
    >
      <Typography variant="h1" component="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" textAlign="center">
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" component={Link} href="/en">
        Return Home
      </Button>
    </Box>
  )
}
