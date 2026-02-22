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

const statusOptions = ['Open', 'Closed', 'Pending Approval']

const SalonModal = ({ open, onClose, onSave, initialData }) => {
    const [salonData, setSalonData] = useState({
        name: '',
        location: '',
        city: '',
        description: '',
        address: '',
        phone: '',
        email: '',
        rating: '',
        status: 'Open',
        latitude: '',
        longitude: '',
        imageUrl: '',
        openingHours: '',
        totalBookings: 0,
    })

    useEffect(() => {
        if (initialData) {
            setSalonData(initialData)
        } else {
            setSalonData({
                name: '',
                location: '',
                city: '',
                description: '',
                address: '',
                phone: '',
                email: '',
                rating: '',
                status: 'Open',
                latitude: '',
                longitude: '',
                imageUrl: '',
                openingHours: '',
                totalBookings: 0,
            })
        }
    }, [initialData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setSalonData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSave = () => {
        // optional: validate data here
        onSave(salonData)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{
            sx: {
                borderRadius: 4,
                p: 2
            },
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                <DialogTitle>{initialData ? 'Edit Salon' : 'Add New Salon'}</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={(theme) => ({
                        color: theme.palette.grey[500],
                    })}
                >
                    <Close />
                </IconButton></Box>

            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField
                            label="Salon Name"
                            name="name"
                            value={salonData.name}
                            onChange={handleChange}
                            fullWidth
                            size='small'
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="City"
                            name="city"
                            value={salonData.city}
                            onChange={handleChange}
                            fullWidth
                            size='small'
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            label="Description"
                            name="description"
                            value={salonData.description}
                            onChange={handleChange}
                            multiline
                            minRows={2}          // 👈 starts at 2 rows
                            maxRows={10}         // 👈 can grow upward only
                            fullWidth

                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            label="Address"
                            name="address"
                            value={salonData.address}
                            onChange={handleChange}
                            fullWidth
                            size='small'
                        />
                    </Grid>

                    <Grid size={6}>
                        <TextField
                            label="Phone"
                            name="phone"
                            value={salonData.phone}
                            onChange={handleChange}
                            fullWidth
                            size='small'
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Email"
                            name="email"
                            value={salonData.email}
                            onChange={handleChange}
                            fullWidth
                            size='small'
                        />
                    </Grid>

                    <Grid size={6}>
                        <TextField
                            label="Latitude"
                            name="latitude"
                            type="number"
                            value={salonData.latitude}
                            onChange={handleChange}
                            fullWidth
                            size='small'
                            inputProps={{ step: '0.0001' }}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Longitude"
                            name="longitude"
                            type="number"
                            value={salonData.longitude}
                            onChange={handleChange}
                            fullWidth
                            size='small'
                            inputProps={{ step: '0.0001' }}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Image URL"
                            name="imageUrl"
                            value={salonData.imageUrl}
                            onChange={handleChange}
                            fullWidth
                            size='small'
                            placeholder="https://..."
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Opening Hours"
                            name="openingHours"
                            value={salonData.openingHours}
                            onChange={handleChange}
                            fullWidth
                            size='small'
                            placeholder="09:00 - 21:00"
                        />
                    </Grid>
                </Grid>

                <TextField
                    label="Status"
                    name="status"
                    select
                    value={salonData.status}
                    onChange={handleChange}
                    fullWidth
                >
                    {statusOptions.map((status) => (
                        <MenuItem key={status} value={status}>
                            {status}
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button variant="contained" onClick={handleSave} fullWidth>
                    {initialData ? 'Update' : 'Create Salon'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SalonModal
