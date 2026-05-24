import { useState, useEffect } from "react"
import { studentService } from "../api/students"
import { gradeService } from "../api/grades"
import { subjectService } from "../api/subjects"
import "./EstudiantesDashboard.css"

export default function EstudiantesDashboard() {
  const [students, setStudents] = useState([])
  const [subjects, setSubjects] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [notas, setNotas] = useState([])
  const [periodo, setPeriodo] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [studentsData, subjectsData] = await Promise.all([
          studentService.listar(),
          subjectService.listar(),
        ])
        setStudents(studentsData)
        setSubjects(subjectsData)
      } catch {
        console.warn("No se pudo conectar con el backend")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  async function handleSelectStudent(student) {
    setSelectedStudent(student)
    setNotas([])
    setPeriodo("")
    try {
      const gradesData = await gradeService.porEstudiante(student.id)
      const mapped = gradesData.map(g => ({
        id: g.id,
        subjectId: g.subjectId,
        period: g.period,
        value: g.value,
      }))
      setNotas(mapped)
      const periods = [...new Set(mapped.map(n => n.period))]
      if (periods.length) setPeriodo(periods[0])
    } catch {
      console.warn("Sin notas en el backend para este estudiante")
    }
  }

  const periodos = [...new Set(notas.map(n => n.period))]
  const notasDelPeriodo = notas.filter(n => n.period === periodo)

  if (loading) {
    return (
      <div className="pagina">
        <p style={{ color: '#4a7a9b' }}>Cargando estudiantes...</p>
      </div>
    )
  }

  return (
    <div className="pagina">

      <div className="card">
        <h2>Estudiantes</h2>
        {students.length === 0 ? (
          <p style={{ color: '#4a7a9b' }}>No hay estudiantes registrados en el sistema.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
            {students.map(s => (
              <button
                key={s.id}
                className={`pill ${selectedStudent?.id === s.id ? 'activo' : ''}`}
                onClick={() => handleSelectStudent(s)}
              >
                {s.studentName}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedStudent && (
        <>
          <div className="card">
            <div className="perfil">
              <div className="avatar">
                {selectedStudent.studentName.charAt(0)}
              </div>
              <div>
                <h2>{selectedStudent.studentName}</h2>
                <p>Documento: {selectedStudent.document || 'N/A'}</p>
                <p>Email: {selectedStudent.email}</p>
              </div>
            </div>
          </div>

          {notas.length > 0 && periodos.length > 0 && (
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
            <h3>Notas {periodo ? `— ${periodo}` : ''}</h3>
            {notasDelPeriodo.length === 0 ? (
              <p style={{ color: '#4a7a9b' }}>Este estudiante no tiene notas registradas.</p>
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
        </>
      )}

    </div>
  )
}
