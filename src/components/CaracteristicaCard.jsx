import styles from './CaracteristicaCard.module.css';

function CaracteristicaCard({ icono, titulo, descripcion }) {
  return (
    <div className={styles.featureCard}>
      <span>{icono}</span>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
    </div>
  );
}

export default CaracteristicaCard;
