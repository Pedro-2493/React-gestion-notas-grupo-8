import { useState, useEffect } from "react"
import { gradeService } from "../api/grades"
import { subjectService } from "../api/subjects"
import "./EstudiantesDashboard.css"

const ESTUDIANTE = {
  nombre: "Melina",
  apellido: "Ramirez",
  email: "melirez@evalix.edu.co",
  documento: "1002345678",
  grupo: "EV0001",
  id: 1,
}

const MATERIAS_MOCK = [
  { id: 101, subjectName: "Cálculo Diferencial" },
  { id: 102, subjectName: "Estructuras de Datos" },
  { id: 103, subjectName: "Base de Datos I" },
  { id: 104, subjectName: "Inglés Técnico" },
]

const NOTAS_MOCK = [
  { id: 1, subjectId: 101, period: "2024-1", value: 3.8 },
  { id: 2, subjectId: 102, period: "2024-1", value: 3.5 },
  { id: 3, subjectId: 103, period: "2024-1", value: 4.0 },
  { id: 4, subjectId: 104, period: "2024-1", value: 4.5 },
  { id: 5, subjectId: 101, period: "2024-2", value: 4.0 },
  { id: 6, subjectId: 102, period: "2024-2", value: 3.9 },
]

export default function EstudiantesDashboard() {
  const [subjects, setSubjects] = useState(MATERIAS_MOCK)
  const [notas, setNotas] = useState(NOTAS_MOCK)
  const [periodo, setPeriodo] = useState("2024-1")

  useEffect(() => {
    async function loadData() {
      try {
        const [subjectsData, gradesData] = await Promise.all([
          subjectService.listar(),
          gradeService.porEstudiante(ESTUDIANTE.id),
        ])
        if (subjectsData.length) setSubjects(subjectsData.map(s => ({ id: s.id, subjectName: s.subjectName })))
        if (gradesData.length) setNotas(gradesData.map(g => ({ id: g.id, subjectId: g.subjectId, period: g.period, value: g.value })))
      } catch {
        console.warn('Usando datos de prueba para notas')
      }
    }
    loadData()
  }, [])

  const periodos = [...new Set(notas.map(n => n.period))]
  const notasDelPeriodo = notas.filter(n => n.period === periodo)

  return (
    <div className="pagina">

      <div className="card">
        <div className="perfil">
          <div className="avatar">
            {ESTUDIANTE.nombre[0]}{ESTUDIANTE.apellido[0]}
          </div>
          <div>
            <h2>{ESTUDIANTE.nombre} {ESTUDIANTE.apellido}</h2>
            <p>Documento: {ESTUDIANTE.documento}</p>
            <p>Grupo: {ESTUDIANTE.grupo}</p>
            <p>Email: {ESTUDIANTE.email}</p>
          </div>
        </div>
      </div>

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

      <div className="card">
        <h3>Notas — {periodo}</h3>
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
      </div>

    </div>
  )
}
