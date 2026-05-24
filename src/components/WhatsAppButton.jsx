import styles from './WhatsAppButton.module.css'

const WHATSAPP_NUMBER = ''
const WHATSAPP_MESSAGE = 'Hola, quiero más información sobre Evalix'

function WhatsAppButton() {
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsapp}
      aria-label="Contactar por WhatsApp"
    >
      <svg viewBox="0 0 32 32" fill="white" className={styles.icon}>
        <path d="M16 0C7.2 0 0 7.2 0 16c0 2.8 0.8 5.6 2 8L0 32l8.4-2c2.4 1.2 4.8 2 7.6 2 8.8 0 16-7.2 16-16S24.8 0 16 0z m0 29.6c-2.4 0-4.8-0.8-6.8-2l-0.4-0.4-5.2 1.6 1.6-5.2-0.4-0.4C4 22.4 3.2 19.6 3.2 16c0-7.2 5.6-12.8 12.8-12.8S28.8 8.8 28.8 16 23.2 29.6 16 29.6z" />
        <path d="M22.4 18.8c-0.4-0.4-2.4-1.2-2.8-1.6s-0.8-0.4-1.2 0c-0.4 0.4-1.2 1.6-1.6 1.6-0.4 0-0.8 0-1.2-0.4-1.6-0.8-3.2-2-4-3.6-0.4-0.4 0-0.8 0-1.2 0.4-0.4 0.4-0.8 0.4-1.2s-0.4-0.8-0.8-1.2c-0.4-0.4-2-2-2.4-2.4s-1.2-0.4-1.6 0c-0.8 0.8-2 1.6-2 3.2 0 1.2 0.8 2.4 1.2 3.2 1.6 2.8 3.6 5.2 6.4 6.4 1.2 0.4 2 0.8 3.2 0.8 1.6 0 3.2-0.8 4-2 0.8-1.2 0.8-2 0.4-2.4z" />
      </svg>
    </a>
  )
}

export default WhatsAppButton
