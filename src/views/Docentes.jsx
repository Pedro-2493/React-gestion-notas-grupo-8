import { useState, useEffect } from "react"
import { teacherService } from "../api/teachers"
import styles from "./Docentes.module.css"

function Docentes() {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTeachers() {
      try {
        const data = await teacherService.listar()
        setTeachers(data)
      } catch {
        console.warn('Usando datos de prueba para docentes')
        setTeachers([
          { id: 1, teacherName: "Steven Wattson", email: "steven1000@uniedu.co" },
          { id: 2, teacherName: "Ana Torres", email: "ana@uniedu.co" },
        ])
      } finally {
        setLoading(false)
      }
    }
    loadTeachers()
  }, [])

  if (loading) {
    return (
      <main>
        <div className={styles.container}>
          <p style={{ color: '#4a7a9b', textAlign: 'center', padding: '2rem' }}>Cargando docentes...</p>
        </div>
      </main>
    )
  }

  return (
    <main>
      <div className={styles.container}>
        <aside className={styles.navbar}>
          <ul className={styles.navbar__list}>
            <li><a href="#notas">Notas</a></li>
            <li><a href="#asistencia">Asistencia</a></li>
            <li><a href="#reportes">Reportes</a></li>
            <li><a href="#calendario">Calendario</a></li>
          </ul>
        </aside>

        <section className={styles.main}>
          {teachers.map(teacher => (
            <div key={teacher.id} className={styles.informationBlock}>
              <h2>Información Docente</h2>
              <div className={styles.informationBlockTeacher}>
                <div>
                  <p>Nombre: {teacher.teacherName}</p>
                  <p>Cédula: {teacher.id ? `1000${teacher.id}${teacher.id * 7}`.slice(0, 10) : 'N/A'}</p>
                  <p>Correo: {teacher.email}</p>
                </div>
                <div>
                  <img
                    className={styles.informationBlockUserIcon}
                    src="/evalix.png"
                    alt="Usuario"
                  />
                  <a href="#actualizar">Actualizar Datos</a>
                </div>
              </div>
            </div>
          ))}

          {teachers.length === 0 && (
            <p style={{ color: '#4a7a9b', textAlign: 'center' }}>No hay docentes registrados</p>
          )}
        </section>
      </div>
    </main>
  )
}

export default Docentes
