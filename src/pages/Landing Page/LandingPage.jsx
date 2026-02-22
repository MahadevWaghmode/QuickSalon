import { Box } from '@mui/material'
import TopAppBar from '../../components/TopAppBar'
import HeroSection from './Sections/HeroSection'
import HowItWorks from './Sections/HowItWorks'
import ServicesSection from './Sections/ServicesSection'
import CTASection from './Sections/CTASection'
import FooterSection from '../../components/FooterSection'

const LandingPage = () => {
  return (
    <Box>
      {/* Top Navigation */}
      <TopAppBar />

      {/* Offset for fixed AppBar (VERY IMPORTANT) */}
      <Box sx={{ mt: 8 }}>
        <HeroSection />
        <HowItWorks />
        <ServicesSection />
        <CTASection />
        <FooterSection />
      </Box>
    </Box>
  )
}

export default LandingPage
