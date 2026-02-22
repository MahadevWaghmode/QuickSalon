import React from 'react'
import {
  Box,
  Grid,
  Card,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  useTheme,
  useMediaQuery,
  TableContainer,
  Paper,
} from '@mui/material'

import PageHeader from '../../components/PageHeader'
import BookingCard from '../../components/BookingCard'
import { tempBookingsData } from '../../data/bookingsData'
import StatCard from '../../components/StatCard'
import { Event, PendingActions, Star, Storefront } from '@mui/icons-material'

const getStatusColor = (status) => {
  switch (status) {
    case 'confirmed':
      return 'success'
    case 'pending':
      return 'warning'
    case 'completed':
      return 'info'
    case 'cancelled':
      return 'error'
    default:
      return 'default'
  }
}

const OwnerDashboard = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  // ✅ Temporary dummy stats
  const stats = {
    salons: 0,
    todaysBookings: 0,
    pending: 0,
    avgRating: 0,
  }

  return (
    <Box>
      <PageHeader
        title="Welcome Back!"
        subtitle="Here’s today’s booking overview"
      />

      {/* ===== STAT CARDS ===== */}
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 6, lg: 3 }}>
          <StatCard
            title="My Salons"
            value={stats.salons}
            icon={<Storefront />}
            color="#2563eb"
          />
        </Grid>

        <Grid size={{ xs: 6, lg: 3 }}>
          <StatCard
            title="Today's Bookings"
            value={stats.todaysBookings}
            icon={<Event />}
            color="#16a34a"
          />
        </Grid>

        <Grid size={{ xs: 6, lg: 3 }}>
          <StatCard
            title="Pending Approval"
            value={stats.pending}
            icon={<PendingActions />}
            color="#f59e0b"
          />
        </Grid>

        <Grid size={{ xs: 6, lg: 3 }}>
          <StatCard
            title="Avg Rating"
            value={stats.avgRating}
            icon={<Star />}
            color="#ef4444"
          />
        </Grid>
      </Grid>

      {/* ===== RECENT BOOKINGS ===== */}
      <Card sx={{
        mt: 4, borderRadius: 3, backgroundColor: {
          xs: 'transparent',sm: '#ffffff',
        }, boxShadow: { xs: "none", sm: '0 4px 20px rgba(0,0,0,0.08)' }
      }}  >
        <Typography variant="h6" fontWeight='600' sx={{ mb: 2, p: 2 }}>
          Recent Bookings
        </Typography>

        {tempBookingsData.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No bookings found
            </Typography>
          </Box>
        ) : isDesktop ? (
          /* ===== DESKTOP TABLE VIEW ===== */
          <TableContainer
            component={Paper}
            sx={{
              mt: 3,
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              overflow: 'hidden',
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                  <TableCell><b>Customer</b></TableCell>
                  <TableCell><b>Service</b></TableCell>
                  <TableCell><b>Date</b></TableCell>
                  <TableCell><b>Time</b></TableCell>
                  <TableCell><b>Duration</b></TableCell>
                  <TableCell><b>Price</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tempBookingsData.map((booking) => (
                  <TableRow key={booking.id} sx={{
                    '&:hover': {
                      backgroundColor: '#f9fafb',
                    },
                    borderBottom: '1px solid #e2e8f0',
                  }}>
                    <TableCell >
                      <Typography fontWeight={600}>
                        {booking.customerName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {booking.phone}
                      </Typography>
                    </TableCell>

                    <TableCell>{booking.service}</TableCell>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell>{booking.time}</TableCell>
                    <TableCell>{booking.duration} min</TableCell>
                    <TableCell>₹{booking.price}</TableCell>

                    <TableCell>
                      <Chip
                        label={booking.status}
                        color={getStatusColor(booking.status)}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          /* ===== MOBILE CARD VIEW ===== */
          <Grid container spacing={2}>
            {tempBookingsData.map((booking) => (
              <Grid key={booking.id} size={{ xs: 12 }}>
                <BookingCard booking={booking} />
              </Grid>
            ))}
          </Grid>
        )}
      </Card>
    </Box>
  )
}

export default OwnerDashboard
