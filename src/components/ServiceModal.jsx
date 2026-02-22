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

const categoryOptions = ['Hair', 'Skin', 'Nails', 'Wellness', 'Hair Removal']

const ServiceModal = ({ open, onClose, onSave, initialData }) => {
    const [service, setService] = useState({
        name: '',
        category: '',
        description: '',
        price: '',
        duration: '',
        image: '',
    })

    useEffect(() => {
        if (initialData) {
            setService(initialData)
        } else {
            setService({
                name: '',
                category: '',
                description: '',
                price: '',
                duration: '',
                image: '',
            })
        }
    }, [initialData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setService((prev) => ({ ...prev, [name]: value }))
    }

    const handleSave = () => {
        // convert numeric fields
        const payload = {
            ...service,
            price: service.price === '' ? 0 : Number(service.price),
            duration: service.duration === '' ? 0 : Number(service.duration),
        }
        onSave && onSave(payload)
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 4, p: 2 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <DialogTitle>{initialData ? 'Edit Service' : 'Add Service'}</DialogTitle>
                <IconButton aria-label="close" onClick={onClose} sx={{ color: (t) => t.palette.grey[500] }}>
                    <Close />
                </IconButton>
            </Box>

            <DialogContent sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                    <Grid size={12} sm={6}>
                        <TextField label="Service Name" name="name" value={service.name} onChange={handleChange} fullWidth size="small" />
                    </Grid>
                    <Grid size={12}>
                        <TextField label="Description" name="description" value={service.description} onChange={handleChange} fullWidth size="small" multiline minRows={2} />
                    </Grid>
                    <Grid size={6}>
                        <TextField select label="Category" name="category" value={service.category} onChange={handleChange} fullWidth size="small">
                            {categoryOptions.map((c) => (
                                <MenuItem key={c} value={c}>
                                    {c}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>


                    <Grid size={6}>
                        <TextField label="Price (₹)" name="price" value={service.price} onChange={handleChange} fullWidth size="small" type="number" inputProps={{ step: '0.01' }} />
                    </Grid>
                    <Grid size={12}>
                        <TextField label="Duration (min)" name="duration" value={service.duration} onChange={handleChange} fullWidth size="small" type="number" />
                    </Grid>

                    <Grid size={6}>
                        <TextField label="Image URL" name="image" value={service.image} onChange={handleChange} fullWidth size="small" placeholder="https://..." />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button variant="contained" onClick={handleSave} fullWidth>
                    {initialData ? 'Update Service' : 'Create Service'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ServiceModal
