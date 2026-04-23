import styles from './UsuarioCard.module.css';

function UsuarioCard({ avatar, nombre, rol, materia, estado }) {
  const statusClass = estado === 'activo' ? styles.activo : styles.inactivo;

  return (
    <div className={styles.usuarioCard}>
      <span className={styles.avatar}>{avatar}</span>
      <h3>{nombre}</h3>
      <p className={styles.rol}>{rol}</p>
      <p className={styles.materia}>{materia}</p>
      <span className={`${styles.estado} ${statusClass}`}>{estado}</span>
    </div>
  );
}

export default UsuarioCard;
