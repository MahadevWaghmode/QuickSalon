import { Box, Card, CardContent, CardMedia, Container, Grid, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

// Replace these with actual salon service images
const services = [
  {
    img: 'https://plus.unsplash.com/premium_photo-1661645788141-8196a45fb483?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGFpcmN1dHxlbnwwfHwwfHx8MA%3D%3D',
    title: 'Haircut',
    desc: 'Get a stylish haircut from expert stylists.',
  },
  {
    img: 'https://plus.unsplash.com/premium_photo-1664475130052-f58aaf58854e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGFpciUyMHNwYXxlbnwwfHwwfHx8MA%3D%3D',
    title: 'Hair Spa',
    desc: 'Relax and rejuvenate your hair with premium care.',
  },
  {
    img: 'https://media.istockphoto.com/id/1590247969/photo/beautiful-woman-enjoying-receiving-a-facial-treatment-at-the-spa.webp?a=1&b=1&s=612x612&w=0&k=20&c=YYzAfSGMKZBmUuul_brhk5YeazUOCIUbm7INheuoLFg=',
    title: 'Facial',
    desc: 'Refresh your skin with our professional facial treatments.',
  },
  {
    img: 'https://media.istockphoto.com/id/1296705483/photo/make-up-products-prsented-on-white-podiums-on-pink-pastel-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=mNnGcFuqTVVuHJ6EInCGiEuJYrpmHjXnZFaQBUXSxGY=',
    title: 'Makeup',
    desc: 'Get party-ready with professional makeup services.',
  },
  {
    img: 'https://media.istockphoto.com/id/1412486543/photo/man-applying-cream-lotion-and-moisturizer-for-a-skincare-routine-while-grooming-in-a-mirror.webp?a=1&b=1&s=612x612&w=0&k=20&c=g68f6iFfDItYYTp8KDRTgNbDZf-9gTUjLwmXKHprkS8=',
    title: 'Grooming',
    desc: 'Beard trims, styling, and full grooming services.',
  },
]

function ServicesSection() {
  return (
    <Box sx={{ py: 10, backgroundColor: '#f2f2f2' }}>
      <Container maxWidth="lg">
        {/* Section Heading */}
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 700, mb: 6 }}
        >
          Our Services
        </Typography>

        {/* Service Cards Grid */}
        <Grid container spacing={4} justifyContent="center">
          {services.map((service, index) => (
            <Grid columns={{ xs: 4, sm: 8, md: 12 }} sx={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                sx={{
                  position: 'relative',
                  height: 350,
                  overflow: 'hidden',
                  borderRadius: 3,
                  cursor: 'pointer',
                  '&:hover .overlay': {
                    opacity: 1,
                  },
                }}
                elevation={3}
              >
                {/* Image */}
                <CardMedia
                  component="img"
                  image={service.img}
                  alt={service.title}
                  sx={{ height: '100%', objectFit: 'cover' }}
                />

                {/* Overlay */}
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    opacity: { xs: 1, sm: 0 },
                    transition: 'opacity 0.3s',
                    p: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {service.desc}
                  </Typography>
                  <Button component={Link}
                    to="/login"
                    variant="contained"
                    color="secondary"
                    sx={{ borderRadius: '999px' }}
                  >
                    Book Now
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default ServicesSection
