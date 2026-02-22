import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Stack,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Avatar,
  Chip,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import HomeIcon from '@mui/icons-material/Home'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import { useAuth } from '../../context/AuthContext'

import LocationModal from '../../components/LocationModal'


export const Home = () => {

  const [nav, setNav] = useState(0)
  const { user } = useAuth()

  const [location, setLocation] = useState(
    localStorage.getItem('userCity') || 'Select location'
  )

  const [openLocationModal, setOpenLocationModal] = useState(false)

useEffect(() => {
  const savedCity = localStorage.getItem('userCity')
  if (savedCity) {
    setLocation(savedCity)
    return
  }

  if (!navigator.geolocation) {
    setLocation('Select location')
    return
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        )
        const data = await res.json()

        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          ''

        const country = data.address.country || ''

        const finalLocation = city ? `${city}, ${country}` : 'Select location'

        setLocation(finalLocation)
        localStorage.setItem('userCity', finalLocation)
      } catch {
        setLocation('Select location')
      }
    },
    () => {
      setLocation('Select location')
    }
  )
}, [])



  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f8fafc',
        px: 2,
        pb: 10,
      }}
    >
      
      {/* HEADER */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Good Morning 👋
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.name}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Chip
            icon={<LocationOnIcon color="error" />}
            label={location}
            clickable
            onClick={() => setOpenLocationModal(true)}
            sx={{
              bgcolor: '#eef2ff',
              borderRadius: 3,
              fontWeight: 500,
            }}
          />

          <IconButton sx={{ bgcolor: '#eef2ff' }}>
            <Badge variant="dot" color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Stack>
      </Stack>

      {/* SEARCH */}
      <Stack direction="row" spacing={1} mt={3}>
        <TextField
          fullWidth
          placeholder="Search Your Service"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            bgcolor: '#fff',
            borderRadius: 3,
          }}
        />
        <IconButton sx={{ bgcolor: '#eef2ff', px: 2 }}>
          <FilterAltOutlinedIcon />
        </IconButton>
      </Stack>

      {/* APPOINTMENT CARD */}
      <Card sx={{ mt: 3, borderRadius: 4 }}>
        <CardContent>
          <Typography fontSize={20} fontWeight={700}>
            Appointment
            <Typography
              component="span"
              fontSize={14}
              color="text.secondary"
              ml={1}
            >
              Today, Monday 10:00 pm
            </Typography>
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOnIcon fontSize="small" color="primary" />
              <Typography variant="body2">
                Dhaka Bangladesh Capital
              </Typography>
            </Stack>

            <IconButton sx={{ bgcolor: '#3b82f6' }}>
              <ArrowOutwardIcon sx={{ color: '#fff' }} />
            </IconButton>
          </Stack>
        </CardContent>
      </Card>

      {/* SERVICES */}
      <Stack direction="row" justifyContent="space-between" mt={4} mb={2}>
        <Typography variant="h6" fontWeight={600}>
          Service
        </Typography>
        <Typography color="primary">View all</Typography>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          overflowX: 'auto',
          pb: 1,
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {['Hair Cut', 'Makeup', 'Spa'].map((service, i) => (
          <Chip
            key={service}
            label={service}
            sx={{
              px: 2,
              py: 2.5,
              bgcolor: i === 0 ? '#3b82f6' : '#fff',
              color: i === 0 ? '#fff' : 'text.primary',
              borderRadius: 3,
              boxShadow: 1,
              flexShrink: 0,
            }}
          />
        ))}
      </Stack>

      {/* NEAREST SALON */}
      <Stack direction="row" justifyContent="space-between" mt={4} mb={2}>
        <Typography variant="h6" fontWeight={600}>
          Nearest Salon
        </Typography>
        <Typography color="primary">View all</Typography>
      </Stack>

      {[1, 2, 3].map((_, i) => (
        <Stack
          key={i}
          direction="row"
          spacing={2}
          alignItems="center"
          mb={2}
        >
          <Avatar sx={{ width: 56, height: 56 }} />
          <Box flex={1}>
            <Typography fontWeight={600}>Lotas Salon</Typography>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <LocationOnIcon fontSize="small" color="primary" />
              <Typography variant="body2" color="text.secondary">
                Dhaka Bangladesh Capital
              </Typography>
            </Stack>
          </Box>
          <Chip label="4.5" color="primary" />
        </Stack>
      ))}

      <LocationModal
        open={openLocationModal}
        onClose={() => setOpenLocationModal(false)}
        onSelect={(selectedCity) => {
          setLocation(selectedCity)
          localStorage.setItem('userCity', selectedCity)
        }}
      />
    </Box>


  )

}

