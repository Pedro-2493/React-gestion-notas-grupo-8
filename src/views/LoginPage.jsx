import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/client'
import styles from './LoginPage.module.css'
import Logo from "../images/evalix.png"

function LoginPage() {
  const [searchParams] = useSearchParams()
  const rolParam = searchParams.get('rol') || ''

  const [form, setForm] = useState({
    email: '',
    password: '',
    rol: rolParam,
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login: authLogin } = useAuth()
  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!form.rol) {
      setError('Selecciona un rol para continuar.')
      return
    }
    if (!form.email || !form.password) {
      setError('Completa todos los campos.')
      return
    }

    setLoading(true)

    try {
      const res = await api.post('/auth/login', {
        email: form.email,
        password: form.password,
        rol: form.rol,
      })

      authLogin(res.token, {
        email: res.email,
        rol: res.rol,
        id: res.id,
        nombre: res.nombre,
      })

      if (form.rol === 'docente') navigate('/docentes')
      else if (form.rol === 'estudiante') navigate('/estudiantes')
      else if (form.rol === 'administrador') navigate('/admin')
    } catch {
      setError('Credenciales incorrectas. Verifica tus datos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        <img
          src={Logo}
          alt="Evalix"
          className={styles.logo}
        />
        <h2 className={styles.titulo}>Iniciar sesión</h2>

        <form onSubmit={handleSubmit} className={styles.form}>

          <div className={styles.grupo}>
            <label htmlFor="rol">Rol</label>
            <select
              id="rol"
              name="rol"
              value={form.rol}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="">Selecciona tu rol</option>
              <option value="docente">Docente</option>
              <option value="estudiante">Estudiante</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>

          <div className={styles.grupo}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="correo@cesde.edu.co"
              className={styles.input}
              autoComplete="email"
            />
          </div>

          <div className={styles.grupo}>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={styles.input}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className={styles.error}>{error}</p>
          )}

          <button
            type="submit"
            className={styles.boton}
            disabled={loading}
          >
            {loading ? 'Verificando...' : 'Iniciar sesión'}
          </button>

          <div className={styles.ayuda}>
            <p>¿No tienes cuenta? <Link to="/register" className={styles.link}>Regístrate aquí</Link></p>
            <p>Credenciales de prueba:</p>
            <code>docente → steven@uniedu.co / 1234</code>
            <code>estudiante → luisa@uniedu.co / 1234</code>
            <code>admin → admin@evalix.co / 1234</code>
          </div>

        </form>
      </div>
    </div>
  )
}

export default LoginPage
