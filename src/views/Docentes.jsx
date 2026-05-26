import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { teacherService } from "../api/teachers"
import { studentService } from "../api/students"
import { gradeService } from "../api/grades"
import { attendanceService } from "../api/attendance"
import { subjectService } from "../api/subjects"
import styles from "./Docentes.module.css"

const TABS = [
  { id: 'notas', label: 'Notas' },
  { id: 'alumnos', label: 'Alumnos' },
  { id: 'asistencia', label: 'Asistencias' },
]

const STATUS_OPTIONS = ['PRESENTE', 'AUSENTE', 'TARDANZA']

const INIT_NOTA = { alumnoId: '', materiaId: '', periodo: '', valor: '' }
const INIT_ASISTENCIA = { alumnoId: '', materiaId: '', estado: 'PRESENTE' }

function Docentes() {
  const { user } = useAuth()
  const [teacher, setTeacher] = useState(null)
  const [students, setStudents] = useState([])
  const [subjects, setSubjects] = useState([])
  const [grades, setGrades] = useState([])
  const [attendance, setAttendance] = useState([])
  const [activeTab, setActiveTab] = useState('notas')
  const [loading, setLoading] = useState(true)

  const [editingGradeId, setEditingGradeId] = useState(null)
  const [editGradeValue, setEditGradeValue] = useState('')
  const [editGradePeriod, setEditGradePeriod] = useState('')

  const [editingAttendanceId, setEditingAttendanceId] = useState(null)
  const [editAttendanceStatus, setEditAttendanceStatus] = useState('')

  const [nuevaNota, setNuevaNota] = useState(INIT_NOTA)
  const [nuevaAsistencia, setNuevaAsistencia] = useState(INIT_ASISTENCIA)

  const mySubjects = subjects.filter(s => s.teacherId === teacher?.id)
  const selectedSubjectForGrade = mySubjects.find(s => s.id === Number(nuevaNota.materiaId))
  const selectedSubjectForAttendance = mySubjects.find(s => s.id === Number(nuevaAsistencia.materiaId))

  useEffect(() => {
    async function load() {
      try {
        const [teachersData, studentsData, subjectsData, gradesData, attendanceData] = await Promise.all([
          teacherService.listar(),
          studentService.listar(),
          subjectService.listar(),
          gradeService.listar(),
          attendanceService.listar(),
        ])
        const me = teachersData.find(t => t.email === user?.email)
        setTeacher(me || teachersData[0] || null)
        setStudents(studentsData)
        setSubjects(subjectsData)
        setGrades(gradesData)
        setAttendance(attendanceData)
      } catch {
        console.warn("No se pudo conectar con el backend")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [user])

  function startEditGrade(grade) {
    setEditingGradeId(grade.id)
    setEditGradeValue(String(grade.value ?? ''))
    setEditGradePeriod(grade.period || '')
  }

  function cancelEditGrade() {
    setEditingGradeId(null)
    setEditGradeValue('')
    setEditGradePeriod('')
  }

  async function saveEditGrade(id) {
    try {
      const updated = await gradeService.actualizar(id, {
        value: parseFloat(editGradeValue),
        period: editGradePeriod,
      })
      setGrades(prev => prev.map(g => (g.id === id ? updated : g)))
      cancelEditGrade()
    } catch {
      console.warn("Error al actualizar la nota")
    }
  }

  function startEditAttendance(record) {
    setEditingAttendanceId(record.id)
    setEditAttendanceStatus(record.status || '')
  }

  function cancelEditAttendance() {
    setEditingAttendanceId(null)
    setEditAttendanceStatus('')
  }

  async function saveEditAttendance(id) {
    try {
      const updated = await attendanceService.actualizar(id, {
        status: editAttendanceStatus,
      })
      setAttendance(prev => prev.map(a => (a.id === id ? updated : a)))
      cancelEditAttendance()
    } catch {
      console.warn("Error al actualizar la asistencia")
    }
  }

  function getGradeValue(g) {
    if (g.value !== undefined && g.value !== null) return g.value
    if (g.valor !== undefined && g.valor !== null) return g.valor
    return 0
  }

  async function handleCrearNota(e) {
    e.preventDefault()
    if (!nuevaNota.alumnoId || !nuevaNota.materiaId || !nuevaNota.periodo || !nuevaNota.valor) return
    try {
      const data = await gradeService.crear({
        value: parseFloat(nuevaNota.valor),
        period: nuevaNota.periodo,
        student: { id: Number(nuevaNota.alumnoId) },
        subject: { id: Number(nuevaNota.materiaId) },
        teacher: { id: teacher.id },
      })
      setGrades(prev => [...prev, data])
      setNuevaNota(INIT_NOTA)
    } catch {
      console.warn("Error al crear la nota")
    }
  }

  async function handleCrearAsistencia(e) {
    e.preventDefault()
    if (!nuevaAsistencia.alumnoId || !nuevaAsistencia.materiaId) return
    try {
      const data = await attendanceService.crear({
        status: nuevaAsistencia.estado,
        student: { id: Number(nuevaAsistencia.alumnoId) },
        subject: { id: Number(nuevaAsistencia.materiaId) },
      })
      setAttendance(prev => [...prev, data])
      setNuevaAsistencia(INIT_ASISTENCIA)
    } catch {
      console.warn("Error al crear la asistencia")
    }
  }

  if (loading) {
    return (
      <main>
        <div className={styles.container}>
          <p style={{ color: '#4a7a9b', textAlign: 'center', padding: '2rem' }}>Cargando...</p>
        </div>
      </main>
    )
  }

  return (
    <main>
      <div className={styles.container}>
        <aside className={styles.navbar}>
          <ul className={styles.navbar__list}>
            {TABS.map(tab => (
              <li key={tab.id}>
                <button
                  className={`${styles.navBtn} ${activeTab === tab.id ? styles.navBtnActive : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className={styles.main}>
          {teacher && (
            <div className={styles.informationBlock}>
              <h2>Panel Docente</h2>
              <p style={{ color: '#4a7a9b' }}>{teacher.teacherName} — {teacher.email}</p>
              {mySubjects.length > 0 && (
                <p style={{ color: '#4a7a9b', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  Materias asignadas: {mySubjects.map(s => s.subjectName).join(', ')}
                </p>
              )}
            </div>
          )}

          {activeTab === 'notas' && (
            <>
              <div className={styles.informationBlock}>
                <h3>Registrar Nueva Nota</h3>
                <form className={styles.formInline} onSubmit={handleCrearNota}>
                  <select
                    className={styles.editSelect}
                    value={nuevaNota.materiaId}
                    onChange={e => setNuevaNota({ ...INIT_NOTA, materiaId: e.target.value })}
                    required
                  >
                    <option value="">Seleccionar materia</option>
                    {mySubjects.map(s => (
                      <option key={s.id} value={s.id}>{s.subjectName}</option>
                    ))}
                  </select>
                  <select
                    className={styles.editSelect}
                    value={nuevaNota.alumnoId}
                    onChange={e => setNuevaNota(p => ({ ...p, alumnoId: e.target.value }))}
                    required
                    disabled={!nuevaNota.materiaId}
                  >
                    <option value="">Seleccionar alumno</option>
                    {selectedSubjectForGrade?.students?.map(st => (
                      <option key={st.id} value={st.id}>{st.studentName}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    className={styles.editInput}
                    placeholder="Periodo (ej: 2025-1)"
                    value={nuevaNota.periodo}
                    onChange={e => setNuevaNota(p => ({ ...p, periodo: e.target.value }))}
                    required
                  />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    className={styles.editInput}
                    placeholder="Nota"
                    value={nuevaNota.valor}
                    onChange={e => setNuevaNota(p => ({ ...p, valor: e.target.value }))}
                    required
                  />
                  <button type="submit" className={styles.btnSave}>Agregar Nota</button>
                </form>
              </div>

              <div className={styles.informationBlock}>
                <h3>Notas Registradas</h3>
                {grades.length === 0 ? (
                  <p style={{ color: '#4a7a9b' }}>No hay notas registradas.</p>
                ) : (
                  <div className={styles.tableWrap}>
                    <table className={styles.tabla}>
                      <thead>
                        <tr>
                          <th>Estudiante</th>
                          <th>Materia</th>
                          <th>Nota</th>
                          <th>Periodo</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {grades.map(g => {
                          const student = students.find(s => s.id === g.student?.id || g.studentId)
                          const subject = subjects.find(s => s.id === g.subject?.id || g.subjectId)
                          const editing = editingGradeId === g.id
                          return (
                            <tr key={g.id}>
                              <td>{student?.studentName || 'N/A'}</td>
                              <td>{subject?.subjectName || 'N/A'}</td>
                              <td>
                                {editing ? (
                                  <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="10"
                                    className={styles.editInput}
                                    value={editGradeValue}
                                    onChange={e => setEditGradeValue(e.target.value)}
                                  />
                                ) : (
                                  <strong>{getGradeValue(g).toFixed(2)}</strong>
                                )}
                              </td>
                              <td>
                                {editing ? (
                                  <input
                                    type="text"
                                    className={styles.editInput}
                                    value={editGradePeriod}
                                    onChange={e => setEditGradePeriod(e.target.value)}
                                  />
                                ) : (
                                  g.period
                                )}
                              </td>
                              <td>
                                {editing ? (
                                  <div className={styles.actionBtns}>
                                    <button className={styles.btnSave} onClick={() => saveEditGrade(g.id)}>Guardar</button>
                                    <button className={styles.btnCancel} onClick={cancelEditGrade}>Cancelar</button>
                                  </div>
                                ) : (
                                  <button className={styles.btnEdit} onClick={() => startEditGrade(g)}>Editar</button>
                                )}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'alumnos' && (
            <div className={styles.informationBlock}>
              <h3>Alumnos</h3>
              {students.length === 0 ? (
                <p style={{ color: '#4a7a9b' }}>No hay alumnos registrados.</p>
              ) : (
                <div className={styles.tableWrap}>
                  <table className={styles.tabla}>
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
                          <td>{s.document || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'asistencia' && (
            <>
              <div className={styles.informationBlock}>
                <h3>Registrar Nueva Asistencia</h3>
                <form className={styles.formInline} onSubmit={handleCrearAsistencia}>
                  <select
                    className={styles.editSelect}
                    value={nuevaAsistencia.materiaId}
                    onChange={e => setNuevaAsistencia({ ...INIT_ASISTENCIA, materiaId: e.target.value })}
                    required
                  >
                    <option value="">Seleccionar materia</option>
                    {mySubjects.map(s => (
                      <option key={s.id} value={s.id}>{s.subjectName}</option>
                    ))}
                  </select>
                  <select
                    className={styles.editSelect}
                    value={nuevaAsistencia.alumnoId}
                    onChange={e => setNuevaAsistencia(p => ({ ...p, alumnoId: e.target.value }))}
                    required
                    disabled={!nuevaAsistencia.materiaId}
                  >
                    <option value="">Seleccionar alumno</option>
                    {selectedSubjectForAttendance?.students?.map(st => (
                      <option key={st.id} value={st.id}>{st.studentName}</option>
                    ))}
                  </select>
                  <select
                    className={styles.editSelect}
                    value={nuevaAsistencia.estado}
                    onChange={e => setNuevaAsistencia(p => ({ ...p, estado: e.target.value }))}
                  >
                    {STATUS_OPTIONS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <button type="submit" className={styles.btnSave}>Registrar Asistencia</button>
                </form>
              </div>

              <div className={styles.informationBlock}>
                <h3>Asistencias Registradas</h3>
                {attendance.length === 0 ? (
                  <p style={{ color: '#4a7a9b' }}>No hay registros de asistencia.</p>
                ) : (
                  <div className={styles.tableWrap}>
                    <table className={styles.tabla}>
                      <thead>
                        <tr>
                          <th>Estudiante</th>
                          <th>Materia</th>
                          <th>Fecha</th>
                          <th>Estado</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendance.map(a => {
                          const student = students.find(s => s.id === a.student?.id || a.studentId)
                          const subject = subjects.find(s => s.id === a.subject?.id || a.subjectId)
                          const editing = editingAttendanceId === a.id
                          return (
                            <tr key={a.id}>
                              <td>{student?.studentName || 'N/A'}</td>
                              <td>{subject?.subjectName || 'N/A'}</td>
                              <td>{a.date}</td>
                              <td>
                                {editing ? (
                                  <select
                                    className={styles.editSelect}
                                    value={editAttendanceStatus}
                                    onChange={e => setEditAttendanceStatus(e.target.value)}
                                  >
                                    {STATUS_OPTIONS.map(s => (
                                      <option key={s} value={s}>{s}</option>
                                    ))}
                                  </select>
                                ) : (
                                  <span className={`${styles.badge} ${a.status === 'PRESENTE' ? styles.badgeVerde : a.status === 'AUSENTE' ? styles.badgeRojo : styles.badgeAmarillo}`}>
                                    {a.status}
                                  </span>
                                )}
                              </td>
                              <td>
                                {editing ? (
                                  <div className={styles.actionBtns}>
                                    <button className={styles.btnSave} onClick={() => saveEditAttendance(a.id)}>Guardar</button>
                                    <button className={styles.btnCancel} onClick={cancelEditAttendance}>Cancelar</button>
                                  </div>
                                ) : (
                                  <button className={styles.btnEdit} onClick={() => startEditAttendance(a)}>Editar</button>
                                )}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  )
}

export default Docentes
