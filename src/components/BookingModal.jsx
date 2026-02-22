import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  IconButton,
  Box,
  Grid,
} from '@mui/material'
import { Close } from '@mui/icons-material'

const services = ['Hair Cut', 'Hair Coloring', 'Beard Trim', 'Facial Treatment', 'Manicure', 'Pedicure']
const statuses = ['pending', 'confirmed', 'completed', 'cancelled']

const BookingModal = ({ open, onClose, onSave, initialData }) => {
  const [booking, setBooking] = useState({
    customerName: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    duration: '',
    status: 'pending',
    price: '',
  })

  useEffect(() => {
    if (initialData) {
      setBooking(initialData)
    } else {
      setBooking({
        customerName: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        duration: '',
        status: 'pending',
        price: '',
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setBooking((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    const payload = {
      ...booking,
      duration: booking.duration === '' ? 0 : Number(booking.duration),
      price: booking.price === '' ? 0 : Number(booking.price),
    }
    onSave && onSave(payload)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 4, p: 2 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <DialogTitle>{initialData ? 'Edit Booking' : 'Add Booking'}</DialogTitle>
        <IconButton aria-label="close" onClick={onClose} sx={{ color: (t) => t.palette.grey[500] }}>
          <Close />
        </IconButton>
      </Box>

      <DialogContent sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              label="Customer Name"
              name="customerName"
              value={booking.customerName}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid size={12}>
            <TextField label="Phone" name="phone" value={booking.phone} onChange={handleChange} fullWidth size="small" />
          </Grid>
          <Grid size={12}>
            <TextField select label="Service" name="service" value={booking.service} onChange={handleChange} fullWidth size="small">
              {services.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{xs:12, sm:6 }}>
            <TextField
              label="Date"
              name="date"
              value={booking.date}
              onChange={handleChange}
              fullWidth
              size="small"
              type="date"
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: { min: '2025-01-01' },
              }}
            />
          </Grid>
          <Grid size={{xs:12, sm:6 }}>
            <TextField label="Duration (min)" name="duration" value={booking.duration} onChange={handleChange} fullWidth size="small" type="number" />
          </Grid>
          <Grid size={6}>
            <TextField label="Time" name="time" value={booking.time} onChange={handleChange} fullWidth size="small" />
          </Grid>
          <Grid size={6}>
            <TextField select label="Status" name="status" value={booking.status} onChange={handleChange} fullWidth size="small">
              {statuses.map((s) => (
                <MenuItem key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={12}>
            <TextField label="Price (₹)" name="price" value={booking.price} onChange={handleChange} fullWidth size="small" type="number" inputProps={{ step: '0.01' }} />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button variant="contained" onClick={handleSave} fullWidth>
          {initialData ? 'Update Booking' : 'Create Booking'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BookingModal
