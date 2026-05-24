import { useState, useEffect } from 'react'
import { studentService } from '../api/students'
import { teacherService } from '../api/teachers'
import { adminService } from '../api/admins'
import UsuarioCard from '../components/UsuarioCard'
import styles from './UsuariosList.module.css'
import AgregarUsuario from '../components/AgregarUsuario';

function UsuariosList() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    async function load() {
      try {
        const [students, teachers, admins] = await Promise.all([
          studentService.listar(),
          teacherService.listar(),
          adminService.listar(),
        ])
        const combined = [
          ...students.map(s => ({ id: `s-${s.id}`, nombre: s.studentName, email: s.email, rol: 'estudiante' })),
          ...teachers.map(t => ({ id: `t-${t.id}`, nombre: t.teacherName, email: t.email, rol: 'docente' })),
          ...admins.map(a => ({ id: `a-${a.id}`, nombre: a.adminName, email: a.email, rol: 'administrador' })),
        ]
        setUsuarios(combined)
      } catch {
        console.warn('No se pudo conectar con el backend')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [refresh])

  return (
    <main>
      <section className={styles.header}>
        <h1 className={styles.titulo}>Usuarios del sistema</h1>
        <p className={styles.subtitulo}>
          {loading ? 'Cargando...' : `${usuarios.length} usuarios registrados`}
        </p>
      </section>

      <AgregarUsuario onUsuarioCreado={() => setRefresh(r => r + 1)} />

      <section className={styles.usuariosGrid}>
        {usuarios.map((usuario) => (
          <UsuarioCard
            key={usuario.id}
            avatar={usuario.rol === 'estudiante' ? '🎓' : usuario.rol === 'docente' ? '👨‍🏫' : '🛡️'}
            nombre={usuario.nombre}
            rol={usuario.rol}
            materia={usuario.email}
            estado="activo"
          />
        ))}
      </section>
    </main>
  )
}

export default UsuariosList
