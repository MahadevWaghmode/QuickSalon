import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import theme from './theme/theme.js'

// Old theme for reference

// const theme = createTheme({
//   typography: {
//     fontFamily:
//       'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: 'none',
//         },
//       },
//     },
//   },
//   palette: {
//     primary: {
//       main: '#bae830', // salon purple
//     },
//     secondary: {
//       main: '#8a4248',
//     },
//   },
// })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
       
          <App />
       
      </AuthProvider>

    </ThemeProvider>
  </React.StrictMode>
)
