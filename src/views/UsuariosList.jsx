import { useUsuarios } from '../context/UsuariosContext'
import UsuarioCard from '../components/UsuarioCard'
import styles from './UsuariosList.module.css'
import AgregarUsuario from '../components/AgregarUsuario';

function UsuariosList() {
  const { usuarios } = useUsuarios()

  return (

    
    <main>
      <section className={styles.header}>
        <h1 className={styles.titulo}>Usuarios del sistema</h1>
        <p className={styles.subtitulo}>{usuarios.length} usuarios registrados</p>
      </section>

          <AgregarUsuario />

      <section className={styles.usuariosGrid}>
        {usuarios.map((usuario) => (
          <UsuarioCard
            key={usuario.id}
            avatar="👤"
            nombre={usuario.nombre}
            rol={usuario.rol}
            materia={usuario.email}
            estado="activo"
          />
        ))}
      </section>
    </main>
  )
}

export default UsuariosList