import { Box, Container, Typography, Button, Stack } from '@mui/material'
import { Link } from 'react-router-dom'

function CTASection() {
  return (
    <Box
      sx={{
        py: 12,
        backgroundColor: '#333', // dark background for contrast
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        {/* Heading */}
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Ready to Transform?
        </Typography>

        {/* Description */}
        <Typography variant="body1" sx={{ fontSize: '1.2rem', mb: 6 }}>
          Join thousands of customers who have discovered their perfect salon. Sign up today and book your first appointment.
        </Typography>

        {/* Buttons */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            component={Link}
            to="/register"
            variant="contained"
            color="secondary"
            sx={{ borderRadius: '999px', px: 5, py: 1.5 }}
          >
            Create Account
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="outlined"
            color="secondary"
            sx={{ borderRadius: '999px', px: 5, py: 1.5, borderWidth: 2, color: '#fff' }}
          >
            For Salon Owners
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default CTASection
