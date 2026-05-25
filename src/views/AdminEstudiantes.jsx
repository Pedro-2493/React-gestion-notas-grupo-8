import { useState, useEffect } from 'react'
import { studentService } from '../api/students'
import './AdminDashboard.css'

function AdminEstudiantes() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await studentService.listar()
        setStudents(data)
      } catch {
        console.warn('No se pudieron cargar los estudiantes')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
      <div className="admin-pagina">
      <div className="admin-header">
        <h2>Estudiantes</h2>
        <p>Lista completa de estudiantes registrados</p>
      </div>

      <div className="admin-card">
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
              {students.map(s => (
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
    </div>
  )
}

export default AdminEstudiantes
