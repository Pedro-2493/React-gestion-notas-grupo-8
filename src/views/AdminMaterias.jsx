import { useState, useEffect } from 'react'
import { subjectService } from '../api/subjects'
import { teacherService } from '../api/teachers'
import { studentService } from '../api/students'
import './AdminDashboard.css'

const initialForm = { subjectName: '', description: '', teacherId: '', studentIds: [] }

function AdminMaterias() {
  const [subjects, setSubjects] = useState([])
  const [teachers, setTeachers] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(initialForm)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadAll()
  }, [])

  async function loadAll() {
    setLoading(true)
    try {
      const [s, t, st] = await Promise.all([
        subjectService.listar(),
        teacherService.listar(),
        studentService.listar(),
      ])
      setSubjects(s)
      setTeachers(t)
      setStudents(st)
    } catch {
      setError('Error al cargar datos del servidor.')
    } finally {
      setLoading(false)
    }
  }

  function openCreate() {
    setForm(initialForm)
    setEditingId(null)
    setShowForm(true)
    setError('')
  }

  function openEdit(subject) {
    setForm({
      subjectName: subject.subjectName || '',
      description: subject.description || '',
      teacherId: subject.teacherId ?? '',
      studentIds: (subject.students || []).map(s => s.id),
    })
    setEditingId(subject.id)
    setShowForm(true)
    setError('')
  }

  function cancelForm() {
    setShowForm(false)
    setEditingId(null)
    setForm(initialForm)
    setError('')
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function toggleStudent(id) {
    setForm(prev => ({
      ...prev,
      studentIds: prev.studentIds.includes(id)
        ? prev.studentIds.filter(s => s !== id)
        : [...prev.studentIds, id],
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.subjectName.trim() || !form.teacherId) {
      setError('El nombre y el docente son obligatorios.')
      return
    }

    const payload = {
      subjectName: form.subjectName.trim(),
      description: form.description.trim(),
      teacherId: Number(form.teacherId),
      students: form.studentIds.map(id => ({ id })),
    }

    try {
      if (editingId) {
        await subjectService.actualizar(editingId, payload)
      } else {
        await subjectService.crear(payload)
      }
      cancelForm()
      await loadAll()
    } catch {
      setError('Error al guardar la materia. Verifica la conexión con el servidor.')
    }
  }

  async function handleDelete(id) {
    if (!confirm('¿Eliminar esta materia?')) return
    try {
      await subjectService.eliminar(id)
      await loadAll()
    } catch {
      alert('Error al eliminar la materia.')
    }
  }

  const getTeacherName = (id) => {
    const t = teachers.find(t => t.id === id)
    return t ? t.teacherName : '—'
  }

  const getStudentNames = (list) => {
    if (!list || list.length === 0) return '—'
    return list.map(s => s.studentName || `ID ${s.id}`).join(', ')
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)', background: '#0a1628',
    color: '#e2e8f0', fontSize: '14px', boxSizing: 'border-box'
  }

  return (
    <div className="admin-pagina">
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Gestión de Materias</h2>
          <p>Administra las materias del sistema</p>
        </div>
        {!showForm && (
          <button className="admin-btn" onClick={openCreate} style={{ border: '1px solid #00f5ff', color: '#00f5ff' }}>
            + Nueva Materia
          </button>
        )}
      </div>

      {showForm && (
        <div className="admin-card">
          <h3>{editingId ? 'Editar Materia' : 'Crear Materia'}</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#4a7a9b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Nombre de la materia
              </label>
              <input name="subjectName" value={form.subjectName} onChange={handleChange} placeholder="Ej: Cálculo III" style={inputStyle} required />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#4a7a9b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Descripción
              </label>
              <input name="description" value={form.description} onChange={handleChange} placeholder="Descripción opcional" style={inputStyle} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#4a7a9b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Docente
              </label>
              <select name="teacherId" value={form.teacherId} onChange={handleChange} style={inputStyle} required>
                <option value="">Seleccionar docente...</option>
                {teachers.map(t => (
                  <option key={t.id} value={t.id}>{t.teacherName}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#4a7a9b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Estudiantes
              </label>
              <div style={{
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px',
                maxHeight: '200px', overflowY: 'auto', background: '#0a1628'
              }}>
                {students.length === 0 ? (
                  <p style={{ color: '#4a7a9b', fontSize: '13px' }}>No hay estudiantes registrados</p>
                ) : (
                  students.map(s => (
                    <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0', cursor: 'pointer', fontSize: '14px', color: '#e2e8f0' }}>
                      <input type="checkbox" checked={form.studentIds.includes(s.id)} onChange={() => toggleStudent(s.id)} style={{ accentColor: '#00f5ff' }} />
                      {s.studentName}
                    </label>
                  ))
                )}
              </div>
            </div>

            {error && <p style={{ color: '#ef4444', fontSize: '13px', margin: 0 }}>{error}</p>}

            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" className="admin-btn" style={{ border: '1px solid #00b785', color: '#00b785' }}>
                {editingId ? 'Guardar Cambios' : 'Crear Materia'}
              </button>
              <button type="button" className="admin-btn" onClick={cancelForm} style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-card">
        {loading ? (
          <p className="stat-label">Cargando...</p>
        ) : subjects.length === 0 ? (
          <p className="stat-label">No hay materias registradas</p>
        ) : (
          <table className="admin-tabla">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Docente</th>
                <th>Estudiantes</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(s => (
                <tr key={s.id}>
                  <td>{s.subjectName}</td>
                  <td style={{ fontSize: '13px', color: '#94a3b8' }}>{s.description || '—'}</td>
                  <td>{getTeacherName(s.teacherId)}</td>
                  <td style={{ fontSize: '13px', color: '#94a3b8', maxWidth: '300px' }}>
                    {getStudentNames(s.students)}
                  </td>
                  <td>
                    <button
                      className="admin-btn"
                      onClick={() => openEdit(s)}
                      style={{ display: 'inline-flex', marginRight: '8px', border: '1px solid rgba(0,245,255,0.2)', color: '#00f5ff' }}
                    >
                      Editar
                    </button>
                    <button
                      className="admin-btn"
                      onClick={() => handleDelete(s.id)}
                      style={{ display: 'inline-flex', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminMaterias
