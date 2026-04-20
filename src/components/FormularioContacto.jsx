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
    <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-lg mx-auto">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Envíanos un Mensaje</h2>
    <form onSubmit={manejarEnvio}>
        <CamposInput datosFormulario={datosFormulario} manejarCambio={manejarCambio} />
        <CampoMensaje valor={datosFormulario.mensaje} manejarCambio={manejarCambio} />
        <button type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200">
        Enviar Mensaje
        </button>
    </form>
    </div>
);
};

export default FormularioContacto;