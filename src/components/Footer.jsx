import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={styles.cta}>
        <h2 style={{ fontSize: "1.5rem" }}>
          ¿Listo para transformar tu institución?
        </h2>

        <p>
          Agenda una demo gratuita y descubre cómo Evalix puede ayudarte.
        </p>

        <a
          href="/pages-main/registro.html"
          className={styles.ctaButton}
        >
          Agendar Demo
        </a>

        <p>
          © 2025 Evalix. Todos los derechos reservados.
          <br />
          Políticas de privacidad
          <br />
          Términos y condiciones
        </p>
      </section>
    </footer>
  );
}

export default Footer;