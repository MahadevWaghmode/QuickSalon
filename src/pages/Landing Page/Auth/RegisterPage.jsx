import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import GoogleIconImg from '../../../assets/google.png'

function RegisterPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 460,
          p: 4,
          borderRadius: 3,
        }}
      >
        {/* Back to home */}
        <Typography
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'text.secondary',
            fontSize: 14,
            mb: 2,
            display: 'inline-flex',
            alignItems: 'center',
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            transition: 'all 0.3s',
            '&:hover': {
              backgroundColor: 'primary.dark',
              color: '#fff',
            },
          }}
        >
          ← Back to home
        </Typography>

        {/* Header */}
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Create Account
        </Typography>
        <Typography color="text.secondary" mb={3}>
          Join LuxeLocation and discover premium salons
        </Typography>

        {/* Google */}
        <Button
          fullWidth
          variant="outlined"
          sx={{
            py: 1.3,
            mb: 3,
            borderRadius: '999px',
            textTransform: 'none',
            display: 'flex',
            gap: 1.5,
            color: '#222',
          }}
        >
          <Box
            component="img"
            src={GoogleIconImg}
            alt="Google"
            sx={{ width: 20, height: 20 }}
          />
          Continue with Google
        </Button>

        <Divider sx={{ mb: 3 }}>Or register with email</Divider>

        {/* Form */}
        <Stack spacing={2}>
          <TextField label="Full Name" placeholder="John Doe" fullWidth />
          <TextField label="Email" placeholder="you@example.com" fullWidth />
          <TextField
            label="Phone (Optional)"
            placeholder="+1 (555) 000-0000"
            fullWidth
          />
          <TextField label="Password" type="password" fullWidth />

          <Box>
            <Typography fontWeight={600} mb={1}>
              I want to
            </Typography>
            <RadioGroup defaultValue="customer">
              <FormControlLabel
                value="customer"
                control={<Radio />}
                label="Book salon appointments"
              />
              <FormControlLabel
                value="owner"
                control={<Radio />}
                label="Register my salon"
              />
            </RadioGroup>
          </Box>

          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{
              py: 1.4,
              borderRadius: '999px',
              fontSize: 16,
            }}
          >
            Create Account
          </Button>
        </Stack>

        {/* Login link */}
        <Typography align="center" mt={3}>
          Already have an account?{' '}
          <Typography
            component={RouterLink}
            to="/login"
            sx={{ fontWeight: 600, textDecoration: 'none' }}
          >
            Sign in
          </Typography>
        </Typography>
      </Box>
    </Box>
  )
}

export default RegisterPage
