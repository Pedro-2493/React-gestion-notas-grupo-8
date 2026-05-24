import styles from './CaracteristicaCard.module.css';

function CaracteristicaCard({ icono, titulo, descripcion }) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.iconWrap}>{icono}</div>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
    </div>
  );
}

export default CaracteristicaCard;
