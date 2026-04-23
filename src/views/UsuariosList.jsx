import { useUsuarios } from '../context/UsuariosContext'
import UsuarioCard from '../components/UsuarioCard'
import styles from './UsuariosList.module.css'

export default function UsuariosList() {
  const { usuarios } = useUsuarios()

  return (
    <div className={styles.contenedor}>
      <h1 className={styles.titulo}>Usuarios del sistema</h1>
      <p className={styles.subtitulo}>{usuarios.length} usuarios registrados</p>
      <div className={styles.lista}>
        {usuarios.map((usuario) => (
          <UsuarioCard key={usuario.id} usuario={usuario} />
        ))}
      </div>
    </div>
  )
}