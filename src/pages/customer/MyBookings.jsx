import {
  Box,
  Typography,
  Stack,
  Avatar,
  Chip,
  Button,
  Switch,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import StarIcon from '@mui/icons-material/Star'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'

const bookings = [
  {
    id: 1,
    date: '14 October 2022 07:30 AM',
    salon: 'Lotas Saloon',
    location: 'Dhaka Bangladesh Capital',
    service: 'Regular Haircut',
    rating: 4.5,
    remind: true,
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f',
  },
  {
    id: 2,
    date: '19 October 2022 10:30 PM',
    salon: 'Lotas Saloon',
    location: 'Dhaka Bangladesh Capital',
    service: 'Regular Haircut',
    rating: 4.5,
    remind: false,
    image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250',
  },
]

const BookingCard = ({ booking }) => (
  <>
    <Stack direction="row" spacing={2}>
      <Box position="relative">
        <Avatar src={booking.image} sx={{ width: 72, height: 72 }} />

        <Chip
          icon={<StarIcon sx={{ fontSize: 16 }} />}
          label={booking.rating}
          size="small"
          sx={{
            position: 'absolute',
            bottom: -6,
            right: -6,
            bgcolor: 'warning.main',
            color: '#fff',
            fontWeight: 600,
          }}
        />
      </Box>

      <Box flex={1}>
        <Typography fontWeight={600}>{booking.date}</Typography>
        <Typography color="text.secondary">{booking.salon}</Typography>

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {booking.location}
          </Typography>
        </Stack>

        <Typography mt={0.5}>
          Service : {booking.service}
        </Typography>
      </Box>
    </Stack>

    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mt={2}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Switch size="small" checked={booking.remind} />
        <Typography variant="body2" color="text.secondary">
          {booking.remind ? '30 min before' : 'Remind me'}
        </Typography>
      </Stack>

      <Button
        variant="outlined"
        color="error"
        sx={{ borderRadius: 5, px: 3 }}
      >
        Cancel
      </Button>
    </Stack>
  </>
)

export const MyBookings = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        px: 2,
        pt: 3,
        pb: 10,
      }}
    >
      <Typography variant="h5" fontWeight={700} mb={3}>
        Your Appointments
      </Typography>

      {/* Tabs */}
      <ToggleButtonGroup
        exclusive
        value="upcoming"
        fullWidth
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 5,
          mb: 3,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        <ToggleButton
          value="upcoming"
          sx={{
            borderRadius: 5,
            '&.Mui-selected': {
              bgcolor: '#3b82f6',
              color: '#fff',
            },
          }}
        >
          Upcoming
        </ToggleButton>

        <ToggleButton
          value="past"
          sx={{ color: 'text.secondary' }}
        >
          Past
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Bookings */}
      <Stack spacing={3}>
        {bookings.map((b) => (
          <Box
            key={b.id}
            sx={{
              bgcolor: 'background.paper',
              p: 2,
              borderRadius: 3,
            }}
          >
            <BookingCard booking={b} />
            <Divider sx={{ mt: 3 }} />
          </Box>
        ))}
      </Stack>

      
    </Box>
  )
}


