import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './LoginPage.module.css'
import Logo from "../images/evalix.png"

// Mock de usuarios para simular autenticación
const USUARIOS_MOCK = [
  { email: 'steven@uniedu.co', password: '1234', rol: 'docente' },
  { email: 'luisa@uniedu.co', password: '1234', rol: 'estudiante' },
  { email: 'admin@evalix.co', password: '1234', rol: 'administrador' },
]

function LoginPage() {
  const [searchParams] = useSearchParams()
  const rolParam = searchParams.get('rol') || ''

  // ── Estado del formulario ──────────────────────────
  const [form, setForm] = useState({
    email: '',
    password: '',
    rol: rolParam,
  })

  // ── Estado de error y carga ────────────────────────
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  // ── Handler genérico: actualiza el campo que cambió ─
  // Kevin: este es el patrón de formulario controlado.
  // Un solo onChange sirve para TODOS los inputs.
  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setError('') // limpia el error al escribir
  }

  // ── Submit ──────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault() // evita que la página se recargue

    // Validación básica
    if (!form.rol) {
      setError('Selecciona un rol para continuar.')
      return
    }
    if (!form.email || !form.password) {
      setError('Completa todos los campos.')
      return
    }

    setLoading(true)

    // Simulación de autenticación con mock data
    const usuario = USUARIOS_MOCK.find(
      u => u.email === form.email &&
        u.password === form.password &&
        u.rol === form.rol
    )

    setTimeout(() => {
      setLoading(false)
      if (usuario) {
        // Redirige según el rol
        if (form.rol === 'docente') navigate('/docentes') // ← con 's'
        if (form.rol === 'estudiante') navigate('/estudiantes')
        if (form.rol === 'administrador') navigate('/admin')
      } else {
        setError('Credenciales incorrectas. Verifica tus datos.')
      }
    }, 800) // simula el delay de una petición real
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        {/* Logo */}
        <img
          src={Logo}
          alt="Evalix"
          className={styles.logo}
        />
        <h2 className={styles.titulo}>Iniciar sesión</h2>

        <form onSubmit={handleSubmit} className={styles.form}>

          {/* ── ROL ── */}
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

          {/* ── EMAIL ── */}
          <div className={styles.grupo}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="usuario@uniedu.co"
              className={styles.input}
              autoComplete="email"
            />
          </div>

          {/* ── CONTRASEÑA ── */}
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

          {/* ── ERROR ── */}
          {error && (
            <p className={styles.error}>{error}</p>
          )}

          {/* ── SUBMIT ── */}
          <button
            type="submit"
            className={styles.boton}
            disabled={loading}
          >
            {loading ? 'Verificando...' : 'Iniciar sesión'}
          </button>

          {/* ── CREDENCIALES DE PRUEBA ── */}
          <div className={styles.ayuda}>
            <p>Credenciales de prueba:</p>
            <code>docente → steven@uniedu.co / 1234</code>
            <code>estudiante → luisa@uniedu.co / 1234</code>
          </div>

        </form>
      </div>
    </div>
  )
}

export default LoginPage
