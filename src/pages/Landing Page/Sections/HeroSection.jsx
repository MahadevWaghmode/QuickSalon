import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        color: '#fff',
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'url(https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -2,
        }}
      />

      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.5), transparent)',
          zIndex: -1,
        }}
      />

      {/* Content */}
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 600 }}>
          <Typography
            variant="overline"
            sx={{
              letterSpacing: '0.3em',
              color: 'secondary.main',
              fontWeight: 700,
            }}
          >
            THE MODERN SALON EXPERIENCE
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              lineHeight: 1.1,
              my: 3,
            }}
          >
            Book Your Perfect <br />
            <Box component="span" sx={{ color: 'secondary.main' }}>
              Salon Visit
            </Box>
          </Typography>

          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              mb: 4,
            }}
          >
            Discover trusted salons near you. Book appointments instantly with
            real-time availability.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="secondary"
              sx={{
                borderRadius: '999px',
                px: 4,
                py: 1.5,
                fontSize: 16,
              }}
            >
              Book Now
            </Button>

            <Button
              component={Link}
              to="/login"
              variant="outlined"
              sx={{
                borderRadius: '999px',
                px: 4,
                py: 1.5,
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.4)',
                '&:hover': {
                  borderColor: '#fff',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                },
              }}
            >
              Explore Salons
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default HeroSection
