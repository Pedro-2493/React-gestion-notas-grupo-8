import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/client'
import styles from './LoginPage.module.css'
import Logo from "../images/evalix.png"

const fieldConfig = {
  estudiante: [
    { name: 'nombre', label: 'Nombre completo', placeholder: 'Nombre completo', type: 'text' },
    { name: 'email', label: 'Email', placeholder: 'correo@cesde.edu.co', type: 'email' },
    { name: 'password', label: 'Contraseña', placeholder: '••••••••', type: 'password' },
  ],
  docente: [
    { name: 'nombre', label: 'Nombre completo', placeholder: 'Nombre completo', type: 'text' },
    { name: 'email', label: 'Email', placeholder: 'correo@cesde.edu.co', type: 'email' },
    { name: 'password', label: 'Contraseña', placeholder: '••••••••', type: 'password' },
  ],
  administrador: [
    { name: 'nombre', label: 'Nombre completo', placeholder: 'Nombre completo', type: 'text' },
    { name: 'email', label: 'Email', placeholder: 'admin@evalix.co', type: 'email' },
    { name: 'password', label: 'Contraseña', placeholder: '••••••••', type: 'password' },
  ],
}

function RegisterPage() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'estudiante',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login: authLogin } = useAuth()
  const navigate = useNavigate()

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!form.nombre || !form.email || !form.password || !form.rol) {
      setError('Completa todos los campos.')
      return
    }

    setLoading(true)

    try {
      const res = await api.post('/auth/register', {
        nombre: form.nombre,
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
    } catch (err) {
      const msg = err.message.includes('API error 400')
        ? 'El email ya está registrado o datos inválidos.'
        : 'Error al registrarse. Intenta de nuevo.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const fields = fieldConfig[form.rol] || []

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        <img src={Logo} alt="Evalix" className={styles.logo} />
        <h2 className={styles.titulo}>Crear cuenta</h2>

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
              <option value="estudiante">Estudiante</option>
              <option value="docente">Docente</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>

          {fields.map(({ name, label, placeholder, type }) => (
            <div className={styles.grupo} key={name}>
              <label htmlFor={name}>{label}</label>
              <input
                id={name}
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className={styles.input}
              />
            </div>
          ))}

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.boton} disabled={loading}>
            {loading ? 'Registrando...' : 'Crear cuenta'}
          </button>

          <div className={styles.ayuda}>
            <p>¿Ya tienes cuenta? <Link to="/login" className={styles.link}>Inicia sesión</Link></p>
          </div>

        </form>
      </div>
    </div>
  )
}

export default RegisterPage
