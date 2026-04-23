import styles from "./Docentes.module.css";

function Docentes() {
    return (
        <main>
            <div className={styles.container}>
                <aside className={styles.navbar}>
                    <ul className={styles.navbar__list}>
                        <li><a href="#notas">Notas</a></li>
                        <li><a href="#asistencia">Asistencia</a></li>
                        <li><a href="#reportes">Reportes</a></li>
                        <li><a href="#calendario">Calendario</a></li>
                    </ul>
                </aside>

                <section className={styles.main}>
                    <div className={styles.informationBlock}>
                        <h2>Información Docente</h2>

                        <div className={styles.informationBlockTeacher}>
                            <div>
                                <p>Nombre: Steven Wattson</p>
                                <p>Cédula: 1000678090</p>
                                <p>Género: Masculino</p>
                                <p>Correo: steven1000@uniedu.co</p>
                            </div>

                            <div>
                                <img
                                    className={styles.informationBlockUserIcon}
                                    src="/evalix.png"
                                    alt="Usuario"
                                />
                                <a href="#actualizar">
                                    Actualizar Datos
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className={styles.containerPrincipal}>
                        <img
                            src="/evalix.png"
                            alt="Imagen de docente"
                        />
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Docentes;