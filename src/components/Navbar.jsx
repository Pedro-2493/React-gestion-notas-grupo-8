import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../images/evalix.png';

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

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
        {user ? (
          <button onClick={handleLogout} className={styles.navLinkBtn}>Inicio</button>
        ) : (
          <Link to="/" className={styles.navLink}>Inicio</Link>
        )}
        {!user && <Link to="/login" className={styles.navLink}>Ingresar</Link>}
        <Link to="/contacto" className={styles.navLink}>Contacto</Link>
        <Link to="/usuarios" className={styles.navLink}>Usuarios</Link>
        {user && (
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Cerrar Sesión
          </button>
        )}
      </div>

    </nav>
  );
}

export default Navbar;
