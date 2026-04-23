import { createContext, useState, useContext } from 'react'

// 1. Crea la cartelera
export const UsuariosContext = createContext()

// 2. Datos iniciales — los 5 usuarios mock
const usuariosIniciales = [
    { id: 1, nombre: 'Steven Wattson', email: 'steven@uniedu.co', rol: 'docente' },
    { id: 2, nombre: 'Luisa Contreras', email: 'luisa@uniedu.co', rol: 'estudiante' },
    { id: 3, nombre: 'Carlos Mejía', email: 'carlos@uniedu.co', rol: 'estudiante' },
    { id: 4, nombre: 'Ana Torres', email: 'ana@uniedu.co', rol: 'docente' },
    { id: 5, nombre: 'Jorge Ramírez', email: 'jorge@uniedu.co', rol: 'estudiante' },
]

// 3. El Provider — el marco que sostiene la cartelera
export function UsuariosProvider({ children }) {
    const [usuarios, setUsuarios] = useState(usuariosIniciales)

    // Función para agregar un usuario nuevo
    // Mariana la va a usar desde su formulario
    function agregarUsuario(nuevoUsuario) {
        setUsuarios(prev => [
            ...prev,
            { ...nuevoUsuario, id: prev.length + 1 }
        ])
    }

    return (
        <UsuariosContext.Provider value={{ usuarios, agregarUsuario }}>
            {children}
        </UsuariosContext.Provider>
    )
}

// 4. Hook personalizado — para no repetir código en cada componente
// Kevin y Mariana solo escriben: const { usuarios } = useUsuarios()
export function useUsuarios() {
    return useContext(UsuariosContext)
}