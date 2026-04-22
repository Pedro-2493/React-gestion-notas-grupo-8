
import "../components/docentes.css";

function Docentes() {
    return (
        <main>
            <div className="container">
                <aside className="navbar">
                    <ul className="navbar__list">
                        <li><a href="#notas">Notas</a></li>
                        <li><a href="#asistencia">Asistencia</a></li>
                        <li><a href="#reportes">Reportes</a></li>
                        <li><a href="#calendario">Calendario</a></li>
                    </ul>
                </aside>

                <section className="main">
                    <div className="information-block">
                        <h2>Información Docente</h2>

                        <div className="information-block__teacher">
                            <div>
                                <p>Nombre: Steven Wattson</p>
                                <p>Cédula: 1000678090</p>
                                <p>Género: Masculino</p>
                                <p>Correo: steven1000@uniedu.co</p>
                            </div>

                            <div>
                                <img
                                    className="information-block__user-icon"
                                    src="/evalix.png"
                                    alt="Usuario"
                                />
                                <a href="#actualizar">
                                    Actualizar Datos
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="container-principal">
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