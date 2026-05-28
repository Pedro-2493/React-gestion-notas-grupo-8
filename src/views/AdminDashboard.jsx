import { useState, useEffect } from 'react'
import { studentService } from '../api/students'
import { teacherService } from '../api/teachers'
import { subjectService } from '../api/subjects'
import './AdminDashboard.css'

const ADMIN = {
  nombre: 'Admin',
  apellido: 'Sistema',
  email: 'admin@evalix.co',
  rol: 'Administrador',
}

function AdminDashboard() {
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [studentsData, teachersData, subjectsData] = await Promise.all([
          studentService.listar(),
          teacherService.listar(),
          subjectService.listar(),
        ])
        setStudents(studentsData)
        setTeachers(teachersData)
        setSubjects(subjectsData)
      } catch {
        console.warn('No se pudo conectar con el backend, usando datos locales')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

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
            <p className="stat-numero">{loading ? '...' : students.length + teachers.length}</p>
            <p className="stat-label">Total Usuarios</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <span className="stat-icon">👨‍🏫</span>
          <div>
            <p className="stat-numero">{loading ? '...' : teachers.length}</p>
            <p className="stat-label">Docentes</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <span className="stat-icon">👩‍🎓</span>
          <div>
            <p className="stat-numero">{loading ? '...' : students.length}</p>
            <p className="stat-label">Estudiantes</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <span className="stat-icon">📚</span>
          <div>
            <p className="stat-numero">{loading ? '...' : subjects.length}</p>
            <p className="stat-label">Materias</p>
          </div>
        </div>
      </div>

      <div className="admin-grid-2">
        <div className="admin-card">
          <h3>Estudiantes recientes</h3>
          {loading ? (
            <p className="stat-label">Cargando...</p>
          ) : students.length === 0 ? (
            <p className="stat-label">No hay estudiantes registrados</p>
          ) : (
            <table className="admin-tabla">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Documento</th>
                </tr>
              </thead>
              <tbody>
                {students.slice(0, 4).map(s => (
                  <tr key={s.id}>
                    <td>{s.studentName}</td>
                    <td>{s.email}</td>
                    <td>{s.document}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="admin-card">
          <h3>Acciones rápidas</h3>
          <div className="admin-acciones">
            <a href="/admin/materias" className="admin-btn">
              <span>📚</span>
              Gestionar Materias
            </a>
            <a href="/admin/usuarios" className="admin-btn">
              <span>👥</span>
              Gestionar Usuarios
            </a>
            <a href="/admin/docentes" className="admin-btn">
              <span>👨‍🏫</span>
              Ver Docentes
            </a>
            <a href="/admin/estudiantes" className="admin-btn">
              <span>👩‍🎓</span>
              Ver Estudiantes
            </a>
            <a href="/admin/analytics" className="admin-btn">
              <span>📊</span>
              Analiticas (Python)
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
