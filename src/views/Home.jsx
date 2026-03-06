import { useState } from 'react'
import { usuariosData } from '../data/usuarios'
import { caracteristicasData } from '../data/caracteristicas'
import styles from './Home.module.css'



function Home() {
  const [usuarios, setUsuarios] = useState(usuariosData)
  const [caracteristicas, setCaracteristicas] = useState(caracteristicasData)

  return (
    <main>

      {/* HERO — viene de <section class="section__h1"> */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Optimiza la gestión de calificaciones
        </h1>
        <p className={styles.heroSub}>bienvenidos al futuro.</p>
      </section>

      {/* CARACTERÍSTICAS — viene de los 3 divs .caracteristicas */}
      <section className={styles.featuresGrid}>
        {caracteristicas.map((item) => (
          
          <div key={item.id} className={styles.featureCard}>
            <span>{item.icono}</span>
            <h3>{item.titulo}</h3>
            <p>{item.descripcion}</p>
          </div>
        ))}
      </section>

      {/* TESTIMONIAL — viene de <section id="testimonial"> */}
      <section className={styles.testimonial}>
        <p className={styles.testimonialText}>
          "Gracias a Evalix hemos reducido un 80% del tiempo dedicado
          a gestionar calificaciones. Su facilidad de uso y rapidez
          son insuperables."
        </p>
        <span className={styles.testimonialAuthor}>
          Director Académico, Universidad del Futuro
        </span>
      </section>

      {/* USUARIOS — sección nueva con mock data */}
      <section className={styles.usuariosGrid}>
        {usuarios.map((usuario) => (
          
          <div key={usuario.id} className={styles.usuarioCard}>
            <span>{usuario.avatar}</span>
            <h3>{usuario.nombre}</h3>
            <p>{usuario.rol}</p>
            <p>{usuario.materia}</p>
            <span>{usuario.estado}</span>
          </div>
        ))}
      </section>

    </main>
  )
}

export default Home