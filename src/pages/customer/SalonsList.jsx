import { Avatar, Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
export const SalonsList = () => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3}>Nearby Salons</Typography>
      <Grid container spacing={3}>
        {[1, 2, 3].map((i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Stack spacing={2} alignItems="center">
                  <Avatar sx={{ width: 64, height: 64 }}>S</Avatar>
                  <Typography fontWeight={600}>Elegance Salon</Typography>
                  <Typography variant="body2" color="text.secondary">Hair • Spa • Grooming</Typography>
                  <Button variant="contained" fullWidth>Book Now</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}