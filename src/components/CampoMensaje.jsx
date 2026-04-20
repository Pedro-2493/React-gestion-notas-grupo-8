import GrupoFormulario from "./GrupoFormulario";

const estiloInput = "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

const CampoMensaje = ({ valor, manejarCambio }) => (
    <GrupoFormulario etiqueta="Tu Mensaje:" htmlFor="mensaje">
    <textarea
        id="mensaje"
        name="mensaje"
        rows="5"
        value={valor}
        onChange={manejarCambio}
        required
        className={estiloInput}
    />
    </GrupoFormulario>
);

export default CampoMensaje;