import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AutContext'

type PrivateRouteProps = {
  children: React.ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return <div className="p-10 text-white">Carregando...</div>

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace state={{ from: location }} />
  }

  return children
}

export default PrivateRoute
