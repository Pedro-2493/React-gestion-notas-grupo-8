import FormularioContacto from "../components/FormularioContacto";
const Contacto = () => {
const manejarEnvio = (datosFormulario) => {
    console.log(datosFormulario);
};

return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 px-4 overflow-auto">
        <div className="w-full max-w-2xl py-8">   
        <FormularioContacto alEnviar={manejarEnvio} />
        </div>
    </div>
);
};

export default Contacto;