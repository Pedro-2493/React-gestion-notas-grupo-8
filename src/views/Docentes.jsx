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
            </div>
          )}

          {activeTab === 'notas' && (
            <div className={styles.informationBlock}>
              <h3>Notas de Alumnos</h3>
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
            <div className={styles.informationBlock}>
              <h3>Asistencias</h3>
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
          )}
        </section>
      </div>
    </main>
  )
}

export default Docentes
