import GrupoFormulario from "./GrupoFormulario";

const campos = [
{ etiqueta: "Nombre Completo:", id: "nombre", tipo: "text", requerido: true },
{ etiqueta: "Correo Electrónico:", id: "correo", tipo: "email", requerido: true },
{ etiqueta: "Celular:", id: "celular", tipo: "text", requerido: true },
];

const estiloInput = "w-full rounded-md px-3 py-2 text-sm focus:outline-none";
const estiloInputObj = { backgroundColor: '#0a1628', border: '1px solid rgba(255,255,255,0.08)', color: '#e0f2fe' };

const CamposInput = ({ datosFormulario, manejarCambio }) => {

const renderizarCampo = ({ etiqueta, id, tipo, requerido }) => (
    <GrupoFormulario key={id} etiqueta={etiqueta} htmlFor={id}>
    <input
        type={tipo}
        id={id}
        name={id}
        value={datosFormulario[id]}
        onChange={manejarCambio}
        required={requerido}
        className={estiloInput}
        style={estiloInputObj}
    />
    </GrupoFormulario>
);

return <>{campos.map(renderizarCampo)}</>;
};

export default CamposInput;