import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  useTheme,
  Grid,
  IconButton,
  Button,
} from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LocationOn, Logout } from '@mui/icons-material'

const Sidebar = ({ onLinkClick, isMobile = false }) => {
  const { user } = useAuth()
  const theme = useTheme()

  const menuByRole = {
    owner: [
      { label: 'Dashboard', path: '/owner/dashboard' },
      { label: 'My Salons', path: '/owner/salons' },
      { label: 'Services', path: '/owner/services' },
      { label: 'Bookings', path: '/owner/bookings' },
      { label: 'Payments', path: '/owner/payments' },
    ],
    customer: [
      { label: 'Home', path: '/customer/home' },
      { label: 'My Bookings', path: '/customer/bookings' },
      { label: 'Profile', path: '/customer/profile' },
    ],
  }

  const menu = menuByRole[user?.role || 'owner']

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: 260 },
        minWidth: 260,
        height: '100vh',
        position: { sm: 'sticky' },
        top: 0,
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        display: 'flex',
        flexDirection: 'column',
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700}>
          QuickSalon
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          {user?.role === 'customer'
            ? 'Customer Menu'
            : 'Owner Menu'}
        </Typography>
      </Box>

      <Divider sx={{ opacity: 0.2 }} />

      {/* Menu */}
      <List
        sx={{
          px: 1,
          flexGrow: 1,
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: 6,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.divider,
            borderRadius: 3,
          },
        }}
      >
        {menu.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            onClick={onLinkClick}
            sx={{
              borderRadius: 2,
              my: 0.5,
              color: 'inherit',
              '&.active': {
                bgcolor: theme.palette.secondary.main,
                color: '#fff',
              },
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
                color: '#fff',
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ opacity: 0.2 }} />

      {/* User Info */}
{!isMobile && (
  <Box sx={{ p: 2 }}>
    {/* User basic info */}
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
      <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
        {user?.name?.[0] || 'S'}
      </Avatar>
      <Box>
        <Typography fontWeight={600}>
          {user?.name || 'Salon Owner'}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          {user?.email || 'owner@quicksalon.com'}
        </Typography>
      </Box>
    </Box>

    {/* Discover + Logout */}
    <Grid container spacing={2} size={12}>
      {/* Discover - 9 width */}
      <Grid size={9}>
        <Button
        size='small'
          fullWidth
          variant="outlined"
          startIcon={<LocationOn />}
          sx={{
            borderRadius: 4,
            // textTransform: 'none',
          }}
        >
          Discover
        </Button>
      </Grid>

      {/* Logout - 3 width */}
      <Grid size={3} display="flex" justifyContent="flex-end">
        <Button
          color="error"
          onClick={() => {
            // call your logout logic here
            console.log('Logout clicked')
          }}
        >
          <Logout />
        </Button>
      </Grid>
    </Grid>
  </Box>
)}

    </Box>
  )
}

export default Sidebar
