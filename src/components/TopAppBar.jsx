import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { Link, useLocation } from 'react-router-dom'

function TopAppBar() {
  const location = useLocation()

  return (
    <AppBar
      component="nav"
      sx={{
        backgroundColor: '#ffffff',
        color: '#000',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 72 }}>
          {/* ===== BRAND ===== */}
          <Typography
            component={Link}
            to="/"
            variant="h4"
            color="secondary"
            sx={{
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: { xs: '1.5rem', md: '2rem' },
            }}
          >
            QuickSalon
          </Typography>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* ===== ACTION BUTTONS ===== */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/login"
              color="inherit"
              sx={{
                fontWeight:
                  location.pathname === '/login' ? 600 : 400,
              }}
            >
              Sign In
            </Button>

            <Button
              component={Link}
              to="/register"
              variant="contained"
              color="secondary"
              sx={{
                borderRadius: '999px',
                px: 3,
                textTransform: 'none',
              }}
            >
              Get Started
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default TopAppBar
