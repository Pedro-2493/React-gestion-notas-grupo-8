import { useState } from "react";
import CamposInput from "./CamposInput";
import CampoMensaje from "./CampoMensaje";

const FormularioContacto = ({ alEnviar }) => {
const [datosFormulario, setDatosFormulario] = useState({
    nombre: "", correo: "", celular: "", mensaje: "",
});

const manejarCambio = (e) => {
    setDatosFormulario({ ...datosFormulario, [e.target.name]: e.target.value });
};

const manejarEnvio = (e) => {
    e.preventDefault();
    alEnviar(datosFormulario);

};

return (
    <div className="rounded-2xl p-8 w-full" style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }}>
    <h2 className="text-2xl font-bold mb-6" style={{ color: '#e0f2fe' }}>Envíanos un Mensaje</h2>
    <form onSubmit={manejarEnvio}>
        <CamposInput datosFormulario={datosFormulario} manejarCambio={manejarCambio} />
        <CampoMensaje valor={datosFormulario.mensaje} manejarCambio={manejarCambio} />
        <button type="submit"
        className="w-full font-semibold py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer"
        style={{ background: 'linear-gradient(90deg, #22d3ee, #3b82f6)', color: 'white', border: 'none' }}>
        Enviar Mensaje
        </button>
    </form>
    </div>
);
};

export default FormularioContacto;