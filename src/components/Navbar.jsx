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
        <Link to="/" className={styles.navLink}>Inicio</Link>
        <Link to="/login" className={styles.navLink}>Ingresar</Link>  
        <Link to="/docentes" className={styles.navLink}>Docentes</Link>
        <Link to="/contacto" className={styles.navLink}>Contacto</Link>
        <Link to="/usuarios" className={styles.navLink}>Usuarios</Link>
      </div>
    </nav>
  )
}

export default Navbar