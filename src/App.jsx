import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import LandingPage from './pages/Landing Page/LandingPage'
import LoginPage from './pages/Landing Page/Auth/LoginPage'
import RegisterPage from './pages/Landing Page/Auth/RegisterPage'

import ProtectedRoute from './routes/ProtectedRoute'
import RoleRoute from './routes/RoleRoute'

import DashboardLayout from './layouts/DashboardLayout'
import Unauthorized from './pages/Unauthorized'

// Owner pages
import OwnerDashboard from './pages/owner/OwnerDashboard'
import MySalons from './pages/owner/MySalons'
import Services from './pages/owner/Services'
import Bookings from './pages/owner/Bookings'
import Payments from './pages/owner/Payments'

// Customer pages
import { MyBookings } from './pages/customer/MyBookings'
import { MyProfile } from './pages/customer/MyProfile'
import { Home } from './pages/customer/Home'

function App() {
  return (
    <Router>
      <Routes>

        {/* 🌐 Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 🏪 OWNER */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRole="owner">
                <DashboardLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<OwnerDashboard />} />
          <Route path="salons" element={<MySalons />} />
          <Route path="services" element={<Services />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="payments" element={<Payments />} />
        </Route>

        {/* 👤 CUSTOMER */}
        <Route
          path="/customer"
          element={
            <RoleRoute allowedRole="customer">
              <DashboardLayout />
            </RoleRoute>
          }
        >
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path='profile' element={<MyProfile />} />
        </Route>

        {/* 🚫 Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* ❌ Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  )
}

export default App
