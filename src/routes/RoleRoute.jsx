import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const RoleRoute = ({ allowedRole, children }) => {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace />

  if (user.role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export default RoleRoute
