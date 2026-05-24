import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function PublicRoute({ children }) {
  const { user } = useAuth()

  if (user) {
    const destino =
      user.rol === 'docente' ? '/docentes' :
      user.rol === 'estudiante' ? '/estudiantes' :
      user.rol === 'administrador' ? '/admin' : '/'
    return <Navigate to={destino} replace />
  }

  return children
}

export default PublicRoute
