import styles from './Navbar.module.css'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className={styles.nav} aria-label="Navegación principal">
      <Link to="/" className={styles.logo}>
        <img
          src="/evalix.png"
          alt="Evalix logo"
          width={70}
          height="auto"
          className={styles.logoImg}
        />
        <span className={styles.navLink}>Administrador</span>
      </Link>
      <div className={styles.navLinks}>
        <a className={styles.navLink} href="/profesores">Profesores</a>
        <a className={styles.navLink} href="/alumnos">Alumnos</a>
        <a className={styles.navLink} href="/nosotros">Nosotros</a>
        <Link to="/contacto" className="text-gray-700 hover:text-blue-600 font-medium">
        Contacto
      </Link>
      </div>
    </nav>
  )
}

export default Navbar