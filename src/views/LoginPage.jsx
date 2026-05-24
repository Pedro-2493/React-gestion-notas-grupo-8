import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { studentService } from '../api/students'
import { teacherService } from '../api/teachers'
import { adminService } from '../api/admins'
import styles from './LoginPage.module.css'
import Logo from "../images/evalix.png"

const USUARIOS_MOCK = [
  { email: 'c.mendoza@cesde.edu.co', password: '1234', rol: 'docente' },
  { email: 'v.torres@cesde.edu.co', password: '1234', rol: 'estudiante' },
  { email: 'admin@evalix.co', password: '1234', rol: 'administrador' },
]

async function verificarUsuario(email, password, rol) {
  try {
    if (rol === 'administrador') {
      const admin = await adminService.buscarPorEmail(email)
      if (admin && admin.password === password) return admin
    }
    if (rol === 'estudiante') {
      const students = await studentService.listar()
      const found = students.find(s => s.email === email)
      if (found) return found
    }
    if (rol === 'docente') {
      const teachers = await teacherService.listar()
      const found = teachers.find(t => t.email === email)
      if (found) return found
    }
  } catch {
    console.warn('Backend no disponible, usando mock')
  }

  const mock = USUARIOS_MOCK.find(
    u => u.email === email && u.password === password && u.rol === rol
  )
  return mock || null
}

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

    const usuario = await verificarUsuario(form.email, form.password, form.rol)

    setLoading(false)
    if (usuario) {
      authLogin({ email: usuario.email, rol: form.rol })
      if (form.rol === 'docente') navigate('/docentes')
      if (form.rol === 'estudiante') navigate('/estudiantes')
      if (form.rol === 'administrador') navigate('/admin')
    } else {
      setError('Credenciales incorrectas. Verifica tus datos.')
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
            <p>Credenciales de prueba:</p>
            <code>docente → c.mendoza@cesde.edu.co / 1234</code>
            <code>estudiante → v.torres@cesde.edu.co / 1234</code>
            <code>admin → admin@evalix.co / 1234</code>
          </div>

        </form>
      </div>
    </div>
  )
}

export default LoginPage
