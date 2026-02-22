import { Box, Container, Typography } from '@mui/material'
import SpaIcon from '@mui/icons-material/Spa'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'

const steps = [
  {
    icon: <ContentCutIcon fontSize="large" color="secondary" />,
    title: 'Choose Salon',
    desc: 'Browse premium salons near you and select your favorite.',
  },
  {
    icon: <EventAvailableIcon fontSize="large" color="secondary" />,
    title: 'Select Service',
    desc: 'Pick from a variety of services like haircut, spa, or makeup.',
  },
  {
    icon: <SpaIcon fontSize="large" color="secondary" />,
    title: 'Book Appointment',
    desc: 'Schedule your visit in real-time and relax while we take care.',
  },
]

function HowItWorks() {
  return (
    <Box sx={{ py: 10, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        {/* Section Heading */}
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 700, mb: 4 }}
        >
          How It Works
        </Typography>

        {/* Steps */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          {steps.map((step, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                p: 2,
              }}
            >
              <Box
                sx={{
                  fontSize: 64,
                  color: 'secondary.main',
                }}
              >
                {step.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {step.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ maxWidth: 250, color: 'text.secondary' }}
              >
                {step.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default HowItWorks
