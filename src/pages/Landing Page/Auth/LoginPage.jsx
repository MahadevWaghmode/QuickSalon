import {
    Box,
    Button,
    Container,
    Divider,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import GoogleIconImg from '../../../assets/google.png'
import { useAuth } from '../../../context/AuthContext'

function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleLogin = () => {
        const userData = {
            name: 'Mahadev',
            role: 'customer', // or 'owner'
        }

        login(userData)

        if (userData.role === 'owner') {
            navigate('/owner/dashboard')
        } else {
            navigate('/customer/home')
        }
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Container maxWidth="lg">
                <Grid container>
                    {/* LEFT IMAGE SECTION */}
                    <Grid
                        size={{ xs: 0, md: 6 }}
                        sx={{ display: { xs: 'none', md: 'block' }, position: 'relative' }}
                    >
                        <Box
                            sx={{
                                height: '100%',
                                backgroundImage:
                                    'url(https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />

                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                color: '#fff',
                                px: 4,
                            }}
                        >
                            <Typography variant="h4" fontWeight={700} gutterBottom>
                                Book Your Style
                            </Typography>
                            <Typography>
                                Discover top salons and book your beauty experience
                            </Typography>
                        </Box>
                    </Grid>

                    {/* RIGHT LOGIN FORM */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ p: 4 }}>
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
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                        color: '#fff',
                                    },
                                }}
                            >
                                ← Back to home
                            </Typography>

                            <Typography variant="h4" fontWeight={700} gutterBottom>
                                Welcome Back
                            </Typography>
                            <Typography color="text.secondary" mb={3}>
                                Sign in to continue your beauty journey
                            </Typography>

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

                            <Divider sx={{ mb: 3 }}>Or continue with email</Divider>

                            <Stack spacing={2}>
                                <TextField label="Email" fullWidth />
                                <TextField label="Password" type="password" fullWidth />

                                <Button
                                    onClick={handleLogin}
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    sx={{ py: 1.4, borderRadius: '999px' }}
                                >
                                    Sign In
                                </Button>
                            </Stack>

                            <Typography align="center" mt={3}>
                                Don&apos;t have an account?{' '}
                                <Typography
                                    component={RouterLink}
                                    to="/register"
                                    sx={{ fontWeight: 600, textDecoration: 'none' }}
                                >
                                    Create one
                                </Typography>
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default LoginPage
