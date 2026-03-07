/*
 * RESPONSABLE: Kevin
 * Componente: Navbar
 * Descripción: Barra de navegación principal de Evalix con logo y links
 * Props: ninguna (componente de presentación)
 */

import styles from './Navbar.module.css'

function Navbar() {
  return (
    <nav className={styles.nav} aria-label="Navegación principal">
      <a href="/" className={styles.logo}>
        <img
          src="/evalix.png"
          alt="Evalix logo"
          width={70}
          height="auto"
          className={styles.logoImg}
        />
        <span className={styles.navLink}>Administrador</span>
      </a>
      <div className={styles.navLinks}>
        <a className={styles.navLink} href="/profesores">Profesores</a>
        <a className={styles.navLink} href="/alumnos">Alumnos</a>
        <a className={styles.navLink} href="/nosotros">Nosotros</a>
        <a className={styles.navLink} href="/contacto">Contacto</a>
      </div>
    </nav>
  )
}

export default Navbar