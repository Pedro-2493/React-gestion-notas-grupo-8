import { useState, useEffect } from 'react'
import { teacherService } from '../api/teachers'
import './AdminDashboard.css'

function AdminDocentes() {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await teacherService.listar()
        setTeachers(data)
      } catch {
        console.warn('No se pudieron cargar los docentes')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
      <div className="admin-pagina">
      <div className="admin-header">
        <h2>Docentes</h2>
        <p>Lista completa de docentes registrados</p>
      </div>

      <div className="admin-card">
        {loading ? (
          <p className="stat-label">Cargando...</p>
        ) : teachers.length === 0 ? (
          <p className="stat-label">No hay docentes registrados</p>
        ) : (
          <table className="admin-tabla">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(t => (
                <tr key={t.id}>
                  <td>{t.teacherName}</td>
                  <td>{t.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminDocentes
