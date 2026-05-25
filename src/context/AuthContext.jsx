import { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

function decodeToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return {
      email: payload.sub,
      rol: payload.rol,
      id: payload.id,
      nombre: payload.nombre,
    }
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decoded = decodeToken(token)
      if (decoded && decoded.rol) return decoded
    }
    localStorage.removeItem('token')
    return null
  })

  function login(token, userData) {
    localStorage.setItem('token', token)
    setUser(userData)
  }

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decoded = decodeToken(token)
      if (!decoded) logout()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
