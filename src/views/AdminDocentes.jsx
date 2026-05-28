import { useState, useEffect } from 'react'
import { teacherService } from '../api/teachers'
import './AdminDashboard.css'

function AdminDocentes() {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editandoId, setEditandoId] = useState(null)
  const [editForm, setEditForm] = useState({ teacherName: '', email: '' })
  const [mensaje, setMensaje] = useState(null)

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

  const cargar = async () => {
    try {
      const data = await teacherService.listar()
      setTeachers(data)
    } catch {
      setMensaje({ tipo: 'error', texto: 'No se pudieron cargar los docentes' })
    }
  }

  const iniciarEdicion = (t) => {
    setEditandoId(t.id)
    setEditForm({ teacherName: t.teacherName, email: t.email })
  }

  const cancelarEdicion = () => {
    setEditandoId(null)
    setEditForm({ teacherName: '', email: '' })
  }

  const guardarEdicion = async (id) => {
    try {
      await teacherService.actualizar(id, editForm)
      setMensaje({ tipo: 'exito', texto: 'Docente actualizado correctamente' })
      cancelarEdicion()
      await cargar()
    } catch (e) {
      console.error('Error al actualizar docente:', e)
      setMensaje({ tipo: 'error', texto: `Error al actualizar: ${e.message}` })
    }
  }

  const eliminar = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este docente?')) return
    try {
      await teacherService.eliminar(id)
      setMensaje({ tipo: 'exito', texto: 'Docente eliminado correctamente' })
      await cargar()
    } catch (e) {
      console.error('Error al eliminar docente:', e)
      setMensaje({ tipo: 'error', texto: `Error al eliminar: ${e.message}` })
    }
  }

  return (
      <div className="admin-pagina">
      <div className="admin-header">
        <h2>Docentes</h2>
        <p>Lista completa de docentes registrados</p>
      </div>

      {mensaje && (
        <div className={mensaje.tipo === 'exito' ? 'admin-msg-exito' : 'admin-msg-error'}>
          {mensaje.texto}
        </div>
      )}

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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(t => (
                <tr key={t.id}>
                  {editandoId === t.id ? (
                    <>
                      <td><input className="admin-input-edit" value={editForm.teacherName} onChange={e => setEditForm({ ...editForm, teacherName: e.target.value })} /></td>
                      <td><input className="admin-input-edit" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} /></td>
                      <td><div className="admin-acciones-btns"><button className="admin-btn-guardar" onClick={() => guardarEdicion(t.id)}>Guardar</button><button className="admin-btn-cancelar" onClick={cancelarEdicion}>Cancelar</button></div></td>
                    </>
                  ) : (
                    <>
                      <td>{t.teacherName}</td>
                      <td>{t.email}</td>
                      <td><div className="admin-acciones-btns"><button className="admin-btn-editar" onClick={() => iniciarEdicion(t)}>Editar</button><button className="admin-btn-eliminar" onClick={() => eliminar(t.id)}>Eliminar</button></div></td>
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

export default AdminDocentes
