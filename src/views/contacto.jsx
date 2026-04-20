import FormularioContacto from "../components/FormularioContacto";

const Contacto = () => {
const manejarEnvio = (datosFormulario) => {
    console.log(datosFormulario);
};

return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <FormularioContacto alEnviar={manejarEnvio} />
    </div>
);
};

export default Contacto;