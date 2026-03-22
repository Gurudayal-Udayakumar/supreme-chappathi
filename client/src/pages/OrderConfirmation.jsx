import { Link, useLocation, Navigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './OrderConfirmation.css';

const deliveryLabels = {
  direct: '🏠 Direct Delivery',
  bus: '🚌 Bus Delivery',
  pickup: '🏭 Factory Pickup'
};

export default function OrderConfirmation() {
  const { state } = useLocation();

  if (!state?.order) {
    return <Navigate to="/" replace />;
  }

  const { order } = state;

  const whatsappMessage = encodeURIComponent(
    `Hi Supreme Chappathi! I just placed an order.\n\n` +
    `Order #: ${order.orderNumber}\n` +
    `Total: ₹${order.totalAmount}\n` +
    `Delivery: ${deliveryLabels[order.deliveryMethod] || order.deliveryMethod}\n\n` +
    `Please confirm my order. Thank you! 🙏`
  );

  return (
    <div className="confirmation-page page-enter">
      <section className="page-hero">
        <div className="container">
          <span className="badge">✅ Order Placed</span>
          <h1>Thank <span className="text-gradient">You!</span></h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="confirmation-content">
            <div className="success-animation">✅</div>

            <h2>Order Placed Successfully!</h2>
            <p style={{ margin: 'var(--space-md) auto var(--space-lg)', maxWidth: '400px' }}>
              Your order has been received and is being processed. We'll have it ready for you soon!
            </p>

            <div className="order-number">
              #{order.orderNumber}
            </div>

            <div className="confirmation-details">
              <h4>Order Details</h4>
              <div className="detail-row">
                <span>Order Number</span>
                <strong>{order.orderNumber}</strong>
              </div>
              <div className="detail-row">
                <span>Total Amount</span>
                <strong>₹{order.totalAmount}</strong>
              </div>
              <div className="detail-row">
                <span>Delivery Method</span>
                <strong>{deliveryLabels[order.deliveryMethod] || order.deliveryMethod}</strong>
              </div>
              <div className="detail-row">
                <span>Status</span>
                <strong style={{ color: 'var(--saffron)' }}>🟡 {order.status || 'Pending Confirmation'}</strong>
              </div>
            </div>

            {/* UPI QR Placeholder */}
            <div className="upi-qr-section">
              <h4>Pay via UPI</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Scan the QR code below to pay ₹{order.totalAmount} via UPI
              </p>
              <div className="upi-placeholder">
                📱
                <small>UPI QR Code</small>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Or pay cash on delivery / at pickup
              </p>
            </div>

            <div className="confirmation-actions">
              <a
                href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <FaWhatsapp /> Confirm on WhatsApp
              </a>
              <Link to="/products" className="btn btn-secondary">
                Order More <FiArrowRight />
              </Link>
              <Link to="/" className="btn btn-dark">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
