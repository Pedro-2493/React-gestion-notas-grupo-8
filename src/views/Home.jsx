import { useState } from 'react'
import { Link } from 'react-router-dom'
import { caracteristicasData } from '../data/caracteristicas.jsx'
import CaracteristicaCard from '../components/CaracteristicaCard'
import styles from './Home.module.css'
import heroBg from '../images/universidad.jpg'

const roles = [
  {
    id: 'profesor',
    icono: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00f5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        <path d="M8 7h6" />
        <path d="M8 11h8" />
        <circle cx="14" cy="16" r="2" />
        <path d="M18 19a3 3 0 0 0-3-3" />
      </svg>
    ),
    titulo: 'Profesor',
    descripcion: 'Gestiona tus materias, calificaciones y estudiantes.',
  },
  {
    id: 'estudiante',
    icono: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00f5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    titulo: 'Estudiante',
    descripcion: 'Consulta tus notas, horarios y avance académico.',
  },
  {
    id: 'administrador',
    icono: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00f5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    titulo: 'Administrador',
    descripcion: 'Administra usuarios, roles y configuración del sistema.',
  },
]

function Home() {
  const [caracteristicas] = useState(caracteristicasData)

  return (
    <main>

      <section className={styles.hero} style={{ backgroundImage: `url(${heroBg})` }}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Evalix</span>
          <h1 className={styles.heroTitle}>
            Optimiza la <span className={styles.heroTitleAccent}>gestión de calificaciones</span>
          </h1>
          <p className={styles.heroSub}>
            Plataforma inteligente para profesores, estudiantes y administradores.
            Automatiza, organiza y centraliza todo en un solo lugar.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Características</span>
          <h2 className={styles.sectionTitle}>
            Todo lo que necesitas en <span>un solo lugar</span>
          </h2>
          <p className={styles.sectionDesc}>
            Herramientas diseñadas para facilitar la gestión académica diaria.
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {caracteristicas.map((item) => (
            <CaracteristicaCard
              key={item.id}
              icono={item.icono}
              titulo={item.titulo}
              descripcion={item.descripcion}
            />
          ))}
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Testimonial</span>
          <h2 className={styles.sectionTitle}>
            Lo que dicen <span>de nosotros</span>
          </h2>
        </div>
        <div className={styles.testimonial}>
          <p className={styles.testimonialText}>
            "Gracias a Evalix hemos reducido un 80% del tiempo dedicado
            a gestionar calificaciones. Su facilidad de uso y rapidez
            son insuperables."
          </p>
          <span className={styles.testimonialAuthor}>
            Director Académico, Universidad del Futuro
          </span>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Acceso</span>
          <h2 className={styles.sectionTitle}>
            ¿Quién <span>eres</span>?
          </h2>
          <p className={styles.sectionDesc}>
            Selecciona tu perfil y accede a tu panel personalizado.
          </p>
        </div>
        <div className={styles.rolesGrid}>
          {roles.map((rol) => (
            <Link key={rol.id} to={`/login?rol=${rol.id}`} className={styles.roleCard}>
              <div className={styles.roleIcon}>{rol.icono}</div>
              <h3 className={styles.roleTitle}>{rol.titulo}</h3>
              <p className={styles.roleDesc}>{rol.descripcion}</p>
            </Link>
          ))}
        </div>
      </section>

    </main>
  )
}

export default Home
