import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Footer.module.css";

function Footer({ simple }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  if (simple) {
    return (
      <div className={styles.topBar}>
        <a href="/" className={styles.topLink}>Inicio</a>
        {user && (
          <button onClick={handleLogout} className={styles.topLogout}>
            Cerrar Sesión
          </button>
        )}
      </div>
    )
  }

  return (
    <footer className={styles.footer}>
      <section className={styles.container}>

        <h2 className={styles.title}>
          ¿Listo para transformar tu institución?
        </h2>

        <p className={styles.text}>
          Agenda una demo gratuita y descubre cómo Evalix puede ayudarte.
        </p>

        <p className={styles.copy}>
          © 2026 Evalix. Todos los derechos reservados.
        </p>

        <div className={styles.links}>
          <a href="/privacidad">Políticas de privacidad</a>
          <a href="/terminos">Términos y condiciones</a>
        </div>

      </section>
    </footer>
  );
}

export default Footer;
