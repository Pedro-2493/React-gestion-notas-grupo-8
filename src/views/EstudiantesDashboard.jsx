import { useState, useEffect, useRef } from "react"
import { useAuth } from "../context/AuthContext"
import { studentService } from "../api/students"
import { gradeService } from "../api/grades"
import { subjectService } from "../api/subjects"
import "./EstudiantesDashboard.css"

const MOCK_STUDENTS = [
  { id: 1, studentName: "Luisa Contreras", email: "luisa@uniedu.co", document: "1002345678" },
  { id: 2, studentName: "Carlos Mejía", email: "carlos@uniedu.co", document: "1009876543" },
]

const MOCK_SUBJECTS = [
  { id: 1, subjectName: "Cálculo Diferencial" },
  { id: 2, subjectName: "Estructuras de Datos" },
  { id: 3, subjectName: "Base de Datos I" },
  { id: 4, subjectName: "Inglés Técnico" },
]

const MOCK_GRADES = [
  { id: 1, subjectId: 1, period: "2024-1", value: 4.5 },
  { id: 2, subjectId: 2, period: "2024-1", value: 3.8 },
  { id: 3, subjectId: 3, period: "2024-1", value: 4.0 },
  { id: 4, subjectId: 4, period: "2024-1", value: 4.2 },
  { id: 5, subjectId: 1, period: "2024-2", value: 4.8 },
  { id: 6, subjectId: 2, period: "2024-2", value: 4.1 },
]

export default function EstudiantesDashboard() {
  const { user } = useAuth()
  const [student, setStudent] = useState(null)
  const [subjects, setSubjects] = useState(MOCK_SUBJECTS)
  const [notas, setNotas] = useState([])
  const [periodo, setPeriodo] = useState("")
  const [loading, setLoading] = useState(true)
  const fileInputRef = useRef(null)

  async function handleAvatarChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (event) => {
      try {
        const updated = await studentService.actualizarAvatar(student.id, event.target.result)
        setStudent(prev => ({ ...prev, avatar: updated.avatar }))
      } catch {
        console.warn("Error al guardar el avatar")
      }
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  useEffect(() => {
    async function load() {
      try {
        const [studentsData, subjectsData] = await Promise.all([
          studentService.listar(),
          subjectService.listar(),
        ])
        setSubjects(subjectsData.length ? subjectsData : MOCK_SUBJECTS)
        const me = studentsData.find(s => s.email === user?.email)
        if (me) {
          setStudent(me)
          const gradesData = await gradeService.porEstudiante(me.id)
          const mapped = gradesData.map(g => ({
            id: g.id,
            subjectId: g.subject?.id ?? g.subjectId,
            period: g.period,
            value: g.value,
          }))
          setNotas(mapped.length ? mapped : MOCK_GRADES)
          const periods = [...new Set(mapped.length ? mapped.map(n => n.period) : MOCK_GRADES.map(n => n.period))]
          if (periods.length) setPeriodo(periods[0])
          setLoading(false)
          return
        }
      } catch {
        console.warn("Backend no disponible, usando datos mock")
      }

      const mockStudent = MOCK_STUDENTS.find(s => s.email === user?.email)
      if (mockStudent) {
        setStudent(mockStudent)
        setNotas(MOCK_GRADES)
        const periods = [...new Set(MOCK_GRADES.map(n => n.period))]
        if (periods.length) setPeriodo(periods[0])
      }
      setLoading(false)
    }
    load()
  }, [user])

  const periodos = [...new Set(notas.map(n => n.period))]
  const notasDelPeriodo = notas.filter(n => n.period === periodo)

  if (loading) {
    return (
      <div className="pagina">
        <p style={{ color: '#4a7a9b' }}>Cargando tus datos...</p>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="pagina">
        <div className="card">
          <h2>Estudiante no encontrado</h2>
          <p style={{ color: '#4a7a9b' }}>
            No se encontró un estudiante con el correo {user?.email} en el sistema.
            <br />Usa <strong>luisa@uniedu.co</strong> para probar.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="pagina">

      <div className="card">
        <div className="perfil">
          <div className="avatar-wrapper">
            <div className="avatar" onClick={() => fileInputRef.current?.click()}>
              {student.avatar ? (
                <img src={student.avatar} alt="avatar" />
              ) : (
                student.studentName.charAt(0)
              )}
            </div>
            <div className="avatar-overlay" onClick={() => fileInputRef.current?.click()}>
              📷
            </div>
          </div>
          <div>
            <h2>{student.studentName}</h2>
            <p>Documento: {student.document || 'N/A'}</p>
            <p>Email: {student.email}</p>
          </div>
        </div>
        <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleAvatarChange} />
      </div>

      {periodos.length > 0 && (
        <div className="card">
          <p>Selecciona un período:</p>
          <div className="pills">
            {periodos.map(p => (
              <button
                key={p}
                className={periodo === p ? "pill activo" : "pill"}
                onClick={() => setPeriodo(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <h3>Mis Notas {periodo ? `— ${periodo}` : ''}</h3>
        {notasDelPeriodo.length === 0 ? (
          <p style={{ color: '#4a7a9b' }}>No tienes notas registradas en este período.</p>
        ) : (
          <table className="tabla">
            <thead>
              <tr>
                <th>Materia</th>
                <th>Nota</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {notasDelPeriodo.map(nota => {
                const materia = subjects.find(m => m.id === nota.subjectId)
                const aprobada = nota.value >= 3.0

                return (
                  <tr key={nota.id}>
                    <td>{materia?.subjectName || `Materia #${nota.subjectId}`}</td>
                    <td><strong>{nota.value.toFixed(2)}</strong></td>
                    <td>
                      <span className={aprobada ? "badge verde" : "badge rojo"}>
                        {aprobada ? "Aprobada" : "Reprobada"}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

    </div>
  )
}
