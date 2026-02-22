import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  useMediaQuery,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EventIcon from '@mui/icons-material/Event'
import PageHeader from '../../components/PageHeader'
import BookingModal from '../../components/BookingModal'
import BookingCard from '../../components/BookingCard'
import { tempBookingsData } from '../../data/bookingsData'

const Bookings = () => {
  const isMobile = useMediaQuery('(max-width:768px)')
  const [bookings, setBookings] = useState(tempBookingsData)
  const [modalOpen, setModalOpen] = useState(false)
  const [editBooking, setEditBooking] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAddBooking = () => {
    setEditBooking(null)
    setModalOpen(true)
  }

  const handleEditBooking = (booking) => {
    setEditBooking(booking)
    setModalOpen(true)
  }

  const handleDeleteBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id))
  }

  const handleSaveBooking = (bookingData) => {
    setLoading(true)
    setTimeout(() => {
      setBookings((prev) => {
        if (bookingData.id) {
          return prev.map((b) => (b.id === bookingData.id ? { ...b, ...bookingData } : b))
        }
        const maxId = prev.reduce((m, b) => Math.max(m, b.id || 0), 0)
        return [...prev, { ...bookingData, id: maxId + 1 }]
      })
      setModalOpen(false)
      setLoading(false)
    }, 500)
  }

  return (
    <Box>
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <PageHeader
        title="Bookings"
        subtitle="Manage customer appointments"
        action={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ borderRadius: 2 }}
            onClick={handleAddBooking}
          >
            Add Booking
          </Button>
        }
      />

      {/* EMPTY STATE */}
      {bookings.length === 0 ? (
        <Card
          sx={{
            mt: 4,
            textAlign: 'center',
            borderRadius: 3,
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
          }}
        >
          <CardContent sx={{ py: 6 }}>
            <EventIcon
              sx={{
                fontSize: 60,
                color: '#94a3b8',
                mb: 2,
              }}
            />
            <Typography variant="h6" fontWeight={600}>
              No bookings yet
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 360, mx: 'auto', mt: 1 }}>
              Create your first booking to start managing customer appointments.
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ mt: 3, borderRadius: 2 }}
              onClick={handleAddBooking}
            >
              Add Your First Booking
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* MOBILE VIEW - CARDS */}
          {isMobile && (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {bookings.map((booking) => (
                <Grid size={{ xs: 12 }} key={booking.id}>
                  <BookingCard
                    booking={booking}
                    isMobile={true}
                    onEdit={handleEditBooking}
                    onDelete={handleDeleteBooking}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {/* DESKTOP VIEW - CARD GRID */}
          {!isMobile && (
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {bookings.map((booking) => (
                <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={booking.id}>
                  <BookingCard
                    booking={booking}
                    isMobile={false}
                    onEdit={handleEditBooking}
                    onDelete={handleDeleteBooking}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {/* STATS SUMMARY */}
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  backgroundColor: '#f0f9ff',
                  border: '1px solid #bfdbfe',
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Total Bookings
                  </Typography>
                  <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5, color: '#1e40af' }}>
                    {bookings.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Confirmed
                  </Typography>
                  <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5, color: '#15803d' }}>
                    {bookings.filter((b) => b.status === 'confirmed').length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  backgroundColor: '#fef3c7',
                  border: '1px solid #fde68a',
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Pending
                  </Typography>
                  <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5, color: '#b45309' }}>
                    {bookings.filter((b) => b.status === 'pending').length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Total Revenue
                  </Typography>
                  <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5, color: '#991b1b' }}>
                    ₹{bookings.reduce((sum, b) => sum + b.price, 0).toLocaleString('en-IN')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}

      {/* BOOKING MODAL */}
      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveBooking}
        initialData={editBooking}
      />
    </Box>
  )
}

export default Bookings
