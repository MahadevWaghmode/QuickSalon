import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography variant="h2" fontWeight={700} color="error">
        403
      </Typography>

      <Typography variant="h5" mt={1} mb={2}>
        Unauthorized Access
      </Typography>

      <Typography color="text.secondary" mb={4}>
        You don’t have permission to view this page.
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate('/')}
      >
        Go to Home
      </Button>
    </Box>
  )
}

export default Unauthorized
