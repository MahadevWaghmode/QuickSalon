import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import BuildIcon from '@mui/icons-material/Build'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import PageHeader from '../../components/PageHeader'
import { useState } from 'react'
import ServiceModal from '../../components/ServiceModal'
import { tempServicesData } from '../../data/servicesData'
import { useMediaQuery } from '@mui/material'

const Services = () => {
  const isMobile = useMediaQuery('(max-width:768px)')
  const [services, setServices] = useState(tempServicesData)

  const [modalOpen, setModalOpen] = useState(false)
  const [editService, setEditService] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAddService = () => {
    setEditService(null)
    setModalOpen(true)
    console.log('Add service clicked')
  }

  const handleEditService = (service) => {
    setEditService(service)
    setModalOpen(true)
    console.log('Edit service:', service)
  }

  const handleDeleteService = (id) => {
    console.log('Delete service:', id)
    // TODO: Add API call to delete service
  }

  const handleSaveService = (serviceData) => {
    setLoading(true)
    console.log('Service saved:', serviceData)

    setTimeout(() => {
      setServices((prev) => {
        // if id exists, update existing
        if (serviceData.id) {
          return prev.map((s) => (s.id === serviceData.id ? { ...s, ...serviceData } : s))
        }
        // otherwise assign new id and append
        const maxId = prev.reduce((m, s) => Math.max(m, s.id || 0), 0)
        return [...prev, { ...serviceData, id: maxId + 1 }]
      })

      setModalOpen(false)
      setLoading(false)
    }, 500)
  }

  const categoryColors = {
    Hair: 'primary',
    Skin: 'success',
    Nails: 'warning',
    Wellness: 'info',
    'Hair Removal': 'secondary',
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
        title="Services"
        subtitle="Manage your salon services and pricing"
        action={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ borderRadius: 2 }}
            onClick={handleAddService}
          >
            Add Service
          </Button>
        }
      />

      {/* EMPTY STATE */}
      {services.length === 0 ? (
        <Card
          sx={{
            mt: 4,
            textAlign: 'center',
            borderRadius: 3,
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
          }}
        >
          <CardContent sx={{ py: 6 }}>
            <BuildIcon
              sx={{
                fontSize: 60,
                color: '#94a3b8',
                mb: 2,
              }}
            />

            <Typography variant="h6" fontWeight={600}>
              No services yet
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ maxWidth: 360, mx: 'auto', mt: 1 }}
            >
              Create your first service to start accepting bookings from customers.
            </Typography>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ mt: 3, borderRadius: 2 }}
              onClick={handleAddService}
            >
              Add Your First Service
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* MOBILE VIEW - CARDS */}
          {isMobile && (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {services.map((service) => (
                <Grid size={{ xs: 12 }} key={service.id}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      border: '1px solid #e2e8f0',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      {/* Header with name and category */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" fontWeight={700} sx={{ color: '#0f172a' }}>
                            {service.name}
                          </Typography>
                          <Chip
                            label={service.category}
                            size="small"
                            color={categoryColors[service.category] || 'default'}
                            variant="outlined"
                            sx={{ fontWeight: 600, mt: 0.5 }}
                          />
                        </Box>
                      </Box>

                      {/* Description */}
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {service.description}
                      </Typography>

                      {/* Price and Duration */}
                      <Box sx={{ display: 'flex', gap: 2, mb: 3, pb: 2, borderBottom: '1px solid #e2e8f0' }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                            Price
                          </Typography>
                          <Typography variant="h6" fontWeight={700} sx={{ color: '#059669', mt: 0.5 }}>
                            ₹{service.price.toFixed(2)}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                            Duration
                          </Typography>
                          <Typography variant="h6" fontWeight={700} sx={{ color: '#64748b', mt: 0.5 }}>
                            {service.duration} min
                          </Typography>
                        </Box>
                      </Box>

                      {/* Action Buttons */}
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          fullWidth
                          startIcon={<EditIcon />}
                          size="small"
                          onClick={() => handleEditService(service)}
                          sx={{ backgroundColor: '#3b82f6' }}
                        >
                          Edit
                        </Button>
                        <IconButton
                          sx={{ color: '#ef4444' }}
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* DESKTOP VIEW - TABLE */}
          {!isMobile && (
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
                    <TableCell sx={{ fontWeight: 700, color: '#0f172a' }}>Service Name</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#0f172a' }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#0f172a' }}>Description</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700, color: '#0f172a' }}>Price</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700, color: '#0f172a' }}>Duration</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700, color: '#0f172a' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {services.map((service) => (
                    <TableRow
                      key={service.id}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#f9fafb',
                        },
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      <TableCell sx={{ fontWeight: 600, color: '#0f172a' }}>
                        {service.name}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={service.category}
                          size="small"
                          color={categoryColors[service.category] || 'default'}
                          variant="outlined"
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: '#64748b', maxWidth: 200 }}>
                        <Typography variant="body2" noWrap title={service.description}>
                          {service.description}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600, color: '#059669' }}>
                        ₹{service.price.toFixed(2)}
                      </TableCell>
                      <TableCell align="center" sx={{ color: '#64748b' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                          <AccessTimeIcon sx={{ fontSize: 16 }} />
                          {service.duration} min
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={() => handleEditService(service)}
                          sx={{ color: '#3b82f6', mr: 1 }}
                        >
                          <EditIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteService(service.id)}
                          sx={{ color: '#ef4444' }}
                        >
                          <DeleteIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
                    Total Services
                  </Typography>
                  <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5, color: '#1e40af' }}>
                    {services.length}
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
                    Avg. Price
                  </Typography>
                  <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5, color: '#15803d' }}>
                    ₹{(services.reduce((sum, s) => sum + s.price, 0) / services.length).toFixed(2)}
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
                    Total Duration
                  </Typography>
                  <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5, color: '#b45309' }}>
                    {services.reduce((sum, s) => sum + s.duration, 0)} min
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  backgroundColor: '#f3e8ff',
                  border: '1px solid #e9d5ff',
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Categories
                  </Typography>
                  <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5, color: '#7e22ce' }}>
                    {new Set(services.map(s => s.category)).size}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}

      <ServiceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveService}
        initialData={editService}
      />
    </Box>
  )
}

export default Services
