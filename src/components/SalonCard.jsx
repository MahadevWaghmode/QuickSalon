import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Rating,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BookOnlineIcon from '@mui/icons-material/BookOnline'

const SalonCard = ({ salon, onEdit, onView }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        transition: '0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        },
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          position: 'relative',
          height: 160,
          backgroundImage: `url(${salon.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))',
          }}
        />

        {/* Status Chip */}
        <Chip
          label={salon.status}
          color={salon.statusColor}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            fontWeight: 600,
          }}
        />

        {/* Salon Name on Image */}
        <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            color: '#fff',
            fontWeight: 700,
          }}
        >
          {salon.name}
        </Typography>
      </Box>

      {/* Content Section */}
      <CardContent sx={{ p: 3 }}>
        {/* Location */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <LocationOnIcon sx={{ fontSize: 18, color: '#64748b', mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {salon.location}
          </Typography>
        </Box>

        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating value={salon.rating} readOnly size="small" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {salon.rating} • {salon.totalBookings} bookings
          </Typography>
        </Box>

        {/* Booking Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <BookOnlineIcon sx={{ fontSize: 18, color: '#64748b', mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {salon.totalBookings} total bookings
          </Typography>
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            startIcon={<EditIcon />}
            onClick={() => onEdit(salon)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={() => onView(salon)}
          >
            View
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default SalonCard
