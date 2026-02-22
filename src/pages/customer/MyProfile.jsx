import { Person } from '@mui/icons-material'
import { Avatar, Box, Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
export const MyProfile = () => {
  return (
    <Box maxWidth={500}>
      <Typography variant="h5" fontWeight={600} mb={3}>My Profile</Typography>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <Avatar sx={{ width: 80, height: 80 }}>
              <Person fontSize="large" />
            </Avatar>
            <Typography fontWeight={600}>John Doe</Typography>
            <Typography variant="body2" color="text.secondary">johndoe@email.com</Typography>
            <Divider flexItem />
            <Button variant="outlined" fullWidth>Edit Profile</Button>
            <Button variant="contained" color="error" fullWidth>Logout</Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}