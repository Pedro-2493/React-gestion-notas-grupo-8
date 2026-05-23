import GrupoFormulario from "./GrupoFormulario";

const estiloInput = "w-full rounded-md px-3 py-2 text-sm focus:outline-none";
const estiloInputObj = { backgroundColor: '#0a1628', border: '1px solid rgba(255,255,255,0.08)', color: '#e0f2fe' };

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
        style={estiloInputObj}
    />
    </GrupoFormulario>
);

export default CampoMensaje;