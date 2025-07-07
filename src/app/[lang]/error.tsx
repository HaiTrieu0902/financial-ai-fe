'use client'

import { Box, Typography, Button } from '@mui/material'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

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
      <Typography variant="h4" component="h2" gutterBottom>
        Something went wrong!
      </Typography>
      <Typography variant="body1" color="text.secondary" textAlign="center">
        We apologize for the inconvenience. Please try again.
      </Typography>
      <Button variant="contained" onClick={reset}>
        Try again
      </Button>
    </Box>
  )
}
