import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import Logo from '../images/evalix.png';


function Navbar() {
  return (
    <nav className={styles.nav} aria-label="Navegación principal">

      <Link to="/" className={styles.brand}>
     <img
      src={Logo}
      alt="Evalix logo"
      width={70}
      className={styles.logo}
    />
        <div className={styles.brandText}>
          <h2>Bienvenido a Evalix</h2>
          <p>Gestión académica inteligente</p>
        </div>
      </Link>

      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>Inicio</Link>
        <Link to="/login" className={styles.navLink}>Ingresar</Link>
        <Link to="/docentes" className={styles.navLink}>Docentes</Link>
        <Link to="/estudiantes" className={styles.navLink}>Estudiantes</Link>
        <Link to="/contacto" className={styles.navLink}>Contacto</Link>
      </div>

    </nav>
  );
}

export default Navbar;