import { useState } from 'react';
import { studentService } from '../api/students';
import { teacherService } from '../api/teachers';
import { adminService } from '../api/admins';
import styles from './AgregarUsuario.module.css';

const fieldConfig = {
  estudiante: [
    { name: 'fullName', label: 'Nombre completo', placeholder: 'Nombre completo', type: 'text' },
    { name: 'email', label: 'Email', placeholder: 'correo@cesde.edu.co', type: 'email' },
    { name: 'document', label: 'Documento de identidad', placeholder: '1234567890', type: 'text' },
  ],
  docente: [
    { name: 'fullName', label: 'Nombre completo', placeholder: 'Nombre completo', type: 'text' },
    { name: 'email', label: 'Email', placeholder: 'correo@cesde.edu.co', type: 'email' },
  ],
  administrador: [
    { name: 'fullName', label: 'Nombre completo', placeholder: 'Nombre completo', type: 'text' },
    { name: 'email', label: 'Email', placeholder: 'admin@evalix.co', type: 'email' },
    { name: 'password', label: 'Contraseña', placeholder: '••••••••', type: 'password' },
  ],
}

const initialForm = {
  fullName: '',
  email: '',
  document: '',
  password: '',
  rol: 'estudiante',
}

export default function AgregarUsuario({ onUsuarioCreado }) {
  const [formulario, setFormulario] = useState(initialForm)
  const [mensaje, setMensaje] = useState('')

  function handleChange(e) {
    setFormulario({ ...formulario, [e.target.name]: e.target.value })
    setMensaje('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!formulario.fullName || !formulario.email) return

    try {
      if (formulario.rol === 'estudiante') {
        if (!formulario.document) return
        await studentService.crear({
          studentName: formulario.fullName,
          email: formulario.email,
          document: formulario.document,
        })
      } else if (formulario.rol === 'docente') {
        await teacherService.crear({
          teacherName: formulario.fullName,
          email: formulario.email,
        })
      } else if (formulario.rol === 'administrador') {
        if (!formulario.password) return
        await adminService.crear({
          adminName: formulario.fullName,
          email: formulario.email,
          password: formulario.password,
        })
      }
      setMensaje(`${formulario.rol} creado correctamente`)
      setFormulario(initialForm)
      if (onUsuarioCreado) onUsuarioCreado()
    } catch {
      setMensaje('Error al crear el usuario')
    }
  }

  const fields = fieldConfig[formulario.rol] || []

  return (
    <div className={styles.card}>
      <h3 className={styles.titulo}>Agregar Usuario</h3>
      <p className={styles.subtitulo}>Selecciona el rol y completa los campos</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.campo}>
          <label>Rol</label>
          <select name="rol" value={formulario.rol} onChange={handleChange}>
            <option value="estudiante">Estudiante</option>
            <option value="docente">Docente</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>

        {fields.map(({ name, label, placeholder, type }) => (
          <div className={styles.campo} key={name}>
            <label>{label}</label>
            <input
              type={type}
              name={name}
              value={formulario[name]}
              onChange={handleChange}
              placeholder={placeholder}
            />
          </div>
        ))}

        <button type="submit" className={styles.boton}>
          Agregar
        </button>

        {mensaje && (
          <p style={{
            color: mensaje.includes('Error') ? '#ef4444' : '#10b981',
            fontSize: '0.85rem',
            marginTop: '0.5rem',
          }}>
            {mensaje}
          </p>
        )}
      </form>
    </div>
  );
}
