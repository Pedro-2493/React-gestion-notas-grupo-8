const GrupoFormulario = ({ etiqueta, htmlFor, children }) => {
return (
    <div className="flex flex-col gap-1 mb-4">
    <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
        {etiqueta}
    </label>
    {children}
    </div>
);
};

export default GrupoFormulario;