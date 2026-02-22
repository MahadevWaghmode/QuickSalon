import { Box, IconButton, Avatar, Typography, useMediaQuery, Drawer } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const DashboardLayout = () => {
  const { user } = useAuth()
  const isMobile = useMediaQuery('(max-width:768px)')
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleDrawer = () => setMobileOpen(!mobileOpen)

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar isMobile={isMobile} />}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
        >
          <Sidebar onLinkClick={toggleDrawer} isMobile={isMobile} />
        </Drawer>
      )}

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Top Navbar for Mobile */}
        {isMobile && (
          <Box
            sx={{
              height: 64,
              display: 'flex',
              alignItems: 'center',
              px: 2,
              bgcolor: '#0f172a',
              color: '#fff',
              justifyContent: 'space-between',
              position: 'sticky',
              top: 0,
              zIndex: 1100,
            }}
          >
            {/* Hamburger */}
            <IconButton onClick={toggleDrawer}>
              <MenuIcon sx={{ color: '#fff' }} />
            </IconButton>

            {/* Brand */}
            <Typography variant="h6" fontWeight={700}>
              QuickSalon
            </Typography>

            {/* User Avatar */}
            <Avatar sx={{ bgcolor: '#2563eb' }}>
              {user?.name?.[0] || 'S'}
            </Avatar>
          </Box>
        )}

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            p: 3,
            bgcolor: '#fbfaf9',
            minHeight: '100vh',
            pt: isMobile ? 2 : 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default DashboardLayout