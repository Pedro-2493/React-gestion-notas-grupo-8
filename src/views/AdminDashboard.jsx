import { useUsuarios } from '../context/UsuariosContext'
import './AdminDashboard.css'

const ADMIN = {
  nombre: 'Admin',
  apellido: 'Sistema',
  email: 'admin@evalix.co',
  rol: 'Administrador',
}

function AdminDashboard() {
  const { usuarios } = useUsuarios()

  const docentes = usuarios.filter(u => u.rol === 'docente')
  const estudiantes = usuarios.filter(u => u.rol === 'estudiante')

  return (
    <div className="admin-pagina">

      <div className="admin-header">
        <div className="admin-perfil">
          <div className="admin-avatar">AS</div>
          <div>
            <h2>{ADMIN.nombre} {ADMIN.apellido}</h2>
            <p>{ADMIN.email}</p>
            <span className="admin-badge-rol">{ADMIN.rol}</span>
          </div>
        </div>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <span className="stat-icon">👥</span>
          <div>
            <p className="stat-numero">{usuarios.length}</p>
            <p className="stat-label">Total Usuarios</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <span className="stat-icon">👨‍🏫</span>
          <div>
            <p className="stat-numero">{docentes.length}</p>
            <p className="stat-label">Docentes</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <span className="stat-icon">👩‍🎓</span>
          <div>
            <p className="stat-numero">{estudiantes.length}</p>
            <p className="stat-label">Estudiantes</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <span className="stat-icon">📚</span>
          <div>
            <p className="stat-numero">3</p>
            <p className="stat-label">Materias</p>
          </div>
        </div>
      </div>

      <div className="admin-grid-2">
        <div className="admin-card">
          <h3>Usuarios recientes</h3>
          <table className="admin-tabla">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.slice(0, 4).map(u => (
                <tr key={u.id}>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`admin-badge ${u.rol === 'docente' ? 'badge-docente' : 'badge-estudiante'}`}>
                      {u.rol}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-card">
          <h3>Acciones rápidas</h3>
          <div className="admin-acciones">
            <a href="/usuarios" className="admin-btn">
              <span>👥</span>
              Gestionar Usuarios
            </a>
            <a href="/docentes" className="admin-btn">
              <span>👨‍🏫</span>
              Ver Docentes
            </a>
            <a href="/estudiantes" className="admin-btn">
              <span>👩‍🎓</span>
              Ver Estudiantes
            </a>
            <a href="/contacto" className="admin-btn">
              <span>📬</span>
              Soporte / Contacto
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdminDashboard
