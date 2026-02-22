import { Box, Container, Typography, Stack, Link, IconButton } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

function FooterSection() {
    return (
        <Box sx={{ backgroundColor: '#fff', color: '#222', py: 8 }}>
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={4}
                >
                    {/* Brand */}
                    <Typography variant="h6" color='secondary' sx={{ fontWeight: 700 }}>
                        QuickSalon
                    </Typography>
                    
                    {/* Copyright */}
                    <Typography
                        variant="body2"
                        align="center"
                        sx={{ mt: 6, color: '#111' }}
                    >
                        &copy; {new Date().getFullYear()} QuickSalon. All rights reserved.
                    </Typography>

                    {/* Social Icons */}
                    <Stack direction="row" spacing={1}>
                        <IconButton sx={{ color: '#222' }} href="#">
                            <FacebookIcon />
                        </IconButton>
                        <IconButton sx={{ color: '#222' }} href="#">
                            <InstagramIcon />
                        </IconButton>
                        <IconButton sx={{ color: '#222' }} href="#">
                            <TwitterIcon />
                        </IconButton>
                        <IconButton sx={{ color: '#222' }} href="#">
                            <LinkedInIcon />
                        </IconButton>
                    </Stack>
                </Stack>


            </Container>
        </Box>
    )
}

export default FooterSection
