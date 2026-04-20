import GrupoFormulario from "./GrupoFormulario";

const campos = [
{ etiqueta: "Nombre Completo:", id: "nombre", tipo: "text", requerido: true },
{ etiqueta: "Correo Electrónico:", id: "correo", tipo: "email", requerido: true },
{ etiqueta: "Celular:", id: "celular", tipo: "text", requerido: true },
];

const estiloInput = "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

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
    />
    </GrupoFormulario>
);

return <>{campos.map(renderizarCampo)}</>;
};

export default CamposInput;