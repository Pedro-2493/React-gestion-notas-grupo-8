import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={styles.container}>

        <h2 className={styles.title}>
          ¿Listo para transformar tu institución?
        </h2>

        <p className={styles.text}>
          Agenda una demo gratuita y descubre cómo Evalix puede ayudarte.
        </p>

        <a href="/registro" className={styles.button}>
          Agendar Demo
        </a>

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