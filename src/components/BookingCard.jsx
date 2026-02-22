import React from 'react'
import { Box, Card, CardContent, Typography, Chip, IconButton, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PhoneIcon from '@mui/icons-material/Phone'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import EventIcon from '@mui/icons-material/Event'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

const statusColors = {
  confirmed: '#10b981',
  pending: '#f59e0b',
  completed: '#3b82f6',
  cancelled: '#ef4444',
}

const statusIcons = {
  confirmed: <CheckCircleIcon sx={{ fontSize: 18 }} />,
  completed: <CheckCircleIcon sx={{ fontSize: 18 }} />,
  cancelled: <CancelIcon sx={{ fontSize: 18 }} />,
  pending: <EventIcon sx={{ fontSize: 18 }} />,
}

const BookingCard = ({ booking, isMobile, onEdit, onDelete }) => {
  

  // Desktop View
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        border: '1px solid #e2e8f0',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
          borderColor: '#bfdbfe',
        },
      }}
    >
      {/* Card Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          p: 3,
          pb: 1,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="overline" sx={{ color: '#64748b', fontWeight: 600 }}>
            Customer
          </Typography>
          <Typography variant="h6" fontWeight={700} sx={{ color: '#0f172a', mt: 0.5 }}>
            {booking.customerName}
          </Typography>
        </Box>
        <Chip
          icon={statusIcons[booking.status]}
          label={booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          size="small"
          sx={{
            backgroundColor: statusColors[booking.status],
            color: 'white',
            fontWeight: 700,
            ml: 1,
          }}
        />
      </Box>

      {/* Service Info */}
      <Box sx={{ px: 3,}}>
        <Typography variant="h7" fontWeight={500} sx={{ color: '#3b82f6' }}>
          {booking.service}
        </Typography>
      </Box>

      {/* Card Content */}
      <CardContent sx={{ flex: 1, px: 3 }}>
        {/* Contact Details */}
        <Box sx={{ mb: 2, pb: 2, borderBottom: '1px solid #e2e8f0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <PhoneIcon sx={{ fontSize: 16, color: '#64748b' }} />
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              {booking.phone}
            </Typography>
          </Box>
        </Box>

        {/* Date/Time and Price Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2,
            p: 2,
            backgroundColor: '#f8fafc',
            borderRadius: 2,
          }}
        >
          <Box>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>
              Date
            </Typography>
            <Typography variant="body2" fontWeight={700} sx={{ color: '#0f172a', mt: 0.5 }}>
              {booking.date}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>
              Time
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
              <AccessTimeIcon sx={{ fontSize: 16, color: '#3b82f6' }} />
              <Typography variant="body2" fontWeight={700} sx={{ color: '#3b82f6' }}>
                {booking.time}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>
              Duration
            </Typography>
            <Typography variant="body2" fontWeight={700} sx={{ color: '#0f172a', mt: 0.5 }}>
              {booking.duration} min
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>
              Price
            </Typography>
            <Typography variant="body2" fontWeight={700} sx={{ color: '#059669', mt: 0.5 }}>
              ₹{booking.price}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      {/* Card Footer */}
      <Box
        sx={{
          display: 'flex',
          alignItems:'center',
          gap: 1,
          p: 3,
         
          borderTop: '1px solid #e2e8f0',
        }}
      >
        <Button
          variant="contained"
          fullWidth
          size="small"
          startIcon={<EditIcon />}
          onClick={() => onEdit(booking)}
          sx={{
            backgroundColor: '#3b82f6',
            '&:hover': {
              backgroundColor: '#2563eb',
            },
          }}
        >
          Edit
        </Button>
        <IconButton
          size="small"
          onClick={() => onDelete(booking.id)}
          sx={{
            color: '#ef4444',
            border: '1px solid #fecaca',
            '&:hover': {
              backgroundColor: '#fee2e2',
            },
          }}
        >
          <DeleteIcon sx={{ fontSize: 22 }} />
        </IconButton>
      </Box>
    </Card>
  )
}

export default BookingCard
