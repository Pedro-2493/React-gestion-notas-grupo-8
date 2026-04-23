import { useState } from 'react'
import { usuariosData } from '../data/usuarios'
import { caracteristicasData } from '../data/caracteristicas'
import CaracteristicaCard from '../components/CaracteristicaCard'
import UsuarioCard from '../components/UsuarioCard'
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
          <CaracteristicaCard 
            key={item.id}
            icono={item.icono}
            titulo={item.titulo}
            descripcion={item.descripcion}
          />
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
          <UsuarioCard 
            key={usuario.id}
            avatar={usuario.avatar}
            nombre={usuario.nombre}
            rol={usuario.rol}
            materia={usuario.materia}
            estado={usuario.estado}
          />
        ))}
      </section>

    </main>
  )
}

export default Home