import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppButton.css';

export default function WhatsAppButton() {
  const phone = '918825982567';
  const message = encodeURIComponent(
    'Hi Supreme Chappathi! I would like to place an order. 🫓'
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
      id="whatsapp-button"
    >
      <FaWhatsapp />
      <span className="whatsapp-tooltip">Chat with us!</span>
    </a>
  );
}
