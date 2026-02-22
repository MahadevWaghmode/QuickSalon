import React, { useState } from 'react'
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
  TextField,
  Button,
  Stack,
  Slide,
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const style = {
  position: 'absolute',
  top: '12%',
  left: '40%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 420,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 3,
}

const LocationModal = ({ open, onClose, onSelect }) => {
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)

  const detectMyLocation = () => {
    if (!navigator.geolocation) {
      alert('Location not supported')
      return
    }

    setLoading(true)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
          const data = await res.json()

          const cityName =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            ''

          const country = data.address.country || ''

          const finalLocation = cityName
            ? `${cityName}, ${country}`
            : 'Select location'

          onSelect(finalLocation)
          onClose()
        } catch {
          alert('Unable to detect location')
        } finally {
          setLoading(false)
        }
      },
      () => {
        alert('Permission denied')
        setLoading(false)
      }
    )
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 400 } }}
    >
      <Slide direction='down' in={open}>
        <Box sx={style}>
          <Typography variant="h6" fontWeight={600} mb={1}>
            Select your location
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={2}>
            Search your city or use GPS
          </Typography>

          <Stack spacing={2}>
            {/* Manual city input */}
            <TextField
              fullWidth
              autoFocus
              placeholder="Search city (e.g. Pune, Mumbai)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            {/* Detect location */}
            <Button
              variant="outlined"
              startIcon={<LocationOnIcon />}
              onClick={detectMyLocation}
              disabled={loading}
            >
              {loading ? 'Detecting...' : 'Detect my location'}
            </Button>

            {/* Actions */}
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button onClick={onClose}>Cancel</Button>
              <Button
                variant="contained"
                disabled={!city.trim()}
                onClick={() => {
                  onSelect(city)
                  onClose()
                }}
              >
                Confirm
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Slide>
    </Modal>
  )
}

export default LocationModal
