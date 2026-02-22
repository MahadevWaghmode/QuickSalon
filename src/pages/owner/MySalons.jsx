import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Rating,
  IconButton,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import StorefrontIcon from '@mui/icons-material/Storefront'
import EditIcon from '@mui/icons-material/Edit'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BookOnlineIcon from '@mui/icons-material/BookOnline'
import PageHeader from '../../components/PageHeader'
import { useState } from 'react'
import SalonModal from '../../components/SalonModal'
import { tempSalonData } from '../../data/salonData'
import SalonCard from '../../components/SalonCard'


const MySalons = () => {
  const salons = tempSalonData

  const [modalOpen, setModalOpen] = useState(false)
  const [editSalon, setEditSalon] = useState(null)

  const handleAddSalon = () => {
    setEditSalon(null)     // new salon
    setModalOpen(true)
    console.log('Add salon clicked')
  }

  const handleEditSalon = (salon) => {
    setEditSalon(salon)   // pass full object
    setModalOpen(true)
    console.log('Edit salon:', salon)
  }

  const handleSaveSalon = (salonData) => {
    console.log('Salon saved:', salonData)
    setModalOpen(false)
    // TODO: Add API call to save salon
  }
  
  const handleViewSalon = (salonId) => () => {
    console.log('View salon details for ID:', salonId) 
  }

  return (
    <Box>
      <PageHeader
        title="My Salons"
        subtitle="Manage your salon locations"
        action={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ borderRadius: 2 }}
            onClick={handleAddSalon}
          >
            Add Salon
          </Button>
        }
      />

      {/* EMPTY STATE */}
      {salons.length === 0 ? (
        <Card
          sx={{
            mt: 4,
            textAlign: 'center',
            borderRadius: 3,
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
          }}
        >
          <CardContent sx={{ py: 6 }}>
            <StorefrontIcon
              sx={{
                fontSize: 60,
                color: '#94a3b8',
                mb: 2,
              }}
            />

            <Typography variant="h6" fontWeight={600}>
              No salons yet
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ maxWidth: 360, mx: 'auto', mt: 1 }}
            >
              Get started by adding your first salon location and manage bookings easily.
            </Typography>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ mt: 3, borderRadius: 2 }}
              onClick={handleAddSalon}
            >
              Add Your First Salon
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* SALONS GRID */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {salons.map((salon) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={salon.id}>
                <SalonCard
                  salon={salon}
                  onEdit={handleEditSalon}
                  onView={handleViewSalon(salon.id)}
                />
              </Grid>
            ))}
          </Grid>

          {/* STATS SUMMARY */}
          <Card sx={{ mt: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Salons
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {salons.length}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Open Now
                  </Typography>
                  <Typography variant="h5" fontWeight={700} color="success.main">
                    {salons.filter(s => s.status === 'Open').length}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Bookings
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {salons.reduce((sum, salon) => sum + salon.totalBookings, 0)}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Avg. Rating
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {(salons.reduce((sum, salon) => sum + salon.rating, 0) / salons.length).toFixed(1)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </>
      )}

      <SalonModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveSalon}
        initialData={editSalon}
      />
    </Box>
  )
}

export default MySalons