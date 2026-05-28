import { useState, useEffect } from 'react'
import { studentService } from '../api/students'
import './AdminDashboard.css'

function AdminEstudiantes() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [editandoId, setEditandoId] = useState(null)
  const [editForm, setEditForm] = useState({ studentName: '', email: '', document: '' })
  const [mensaje, setMensaje] = useState(null)

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

  const cargar = async () => {
    try {
      const data = await studentService.listar()
      setStudents(data)
    } catch {
      setMensaje({ tipo: 'error', texto: 'No se pudieron cargar los estudiantes' })
    }
  }

  const iniciarEdicion = (s) => {
    setEditandoId(s.id)
    setEditForm({ studentName: s.studentName, email: s.email, document: s.document })
  }

  const cancelarEdicion = () => {
    setEditandoId(null)
    setEditForm({ studentName: '', email: '', document: '' })
  }

  const guardarEdicion = async (id) => {
    try {
      await studentService.actualizar(id, editForm)
      setMensaje({ tipo: 'exito', texto: 'Estudiante actualizado correctamente' })
      cancelarEdicion()
      await cargar()
    } catch (e) {
      console.error('Error al actualizar:', e)
      setMensaje({ tipo: 'error', texto: `Error al actualizar: ${e.message}` })
    }
  }

  const eliminar = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este estudiante?')) return
    try {
      await studentService.eliminar(id)
      setMensaje({ tipo: 'exito', texto: 'Estudiante eliminado correctamente' })
      await cargar()
    } catch (e) {
      console.error('Error al eliminar:', e)
      setMensaje({ tipo: 'error', texto: `Error al eliminar: ${e.message}` })
    }
  }

  return (
      <div className="admin-pagina">
      <div className="admin-header">
        <h2>Estudiantes</h2>
        <p>Lista completa de estudiantes registrados</p>
      </div>

      {mensaje && (
        <div className={mensaje.tipo === 'exito' ? 'admin-msg-exito' : 'admin-msg-error'}>
          {mensaje.texto}
        </div>
      )}

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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id}>
                  {editandoId === s.id ? (
                    <>
                      <td><input className="admin-input-edit" value={editForm.studentName} onChange={e => setEditForm({ ...editForm, studentName: e.target.value })} /></td>
                      <td><input className="admin-input-edit" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} /></td>
                      <td><input className="admin-input-edit" value={editForm.document} onChange={e => setEditForm({ ...editForm, document: e.target.value })} /></td>
                      <td><div className="admin-acciones-btns"><button className="admin-btn-guardar" onClick={() => guardarEdicion(s.id)}>Guardar</button><button className="admin-btn-cancelar" onClick={cancelarEdicion}>Cancelar</button></div></td>
                    </>
                  ) : (
                    <>
                      <td>{s.studentName}</td>
                      <td>{s.email}</td>
                      <td>{s.document}</td>
                      <td><div className="admin-acciones-btns"><button className="admin-btn-editar" onClick={() => iniciarEdicion(s)}>Editar</button><button className="admin-btn-eliminar" onClick={() => eliminar(s.id)}>Eliminar</button></div></td>
                    </>
                  )}
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
