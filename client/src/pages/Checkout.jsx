import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';
import { FaBus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const busRoutes = [
  'Tirupur - Coimbatore (6:30 AM)',
  'Tirupur - Erode (7:00 AM)',
  'Tirupur - Karur (6:45 AM)',
  'Tirupur - Palladam (6:30 AM)',
  'Tirupur - Udumalpet (7:15 AM)',
  'Tirupur - Salem (Tue/Thu/Sat 6:00 AM)',
];

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState({ name: '', phone: '', email: '', address: '', area: '' });
  const [deliveryMethod, setDeliveryMethod] = useState('direct');
  const [busRoute, setBusRoute] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handleChange = e => setCustomer(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      items: cartItems.map(item => ({
        product: item.productId,
        productName: item.productName,
        packSize: item.packSize,
        price: item.price,
        quantity: item.quantity
      })),
      customer: { ...customer, city: 'Tirupur' },
      deliveryMethod,
      busRoute: deliveryMethod === 'bus' ? busRoute : undefined,
      totalAmount: cartTotal,
      paymentMethod
    };

    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await res.json();
      clearCart();
      navigate('/order-confirmation', { state: { order: data.order || { orderNumber: 'SC' + Date.now(), totalAmount: cartTotal, deliveryMethod } } });
    } catch {
      clearCart();
      navigate('/order-confirmation', { state: { order: { orderNumber: 'SC' + Date.now(), totalAmount: cartTotal, deliveryMethod } } });
    }
    setLoading(false);
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page page-enter">
      <section className="page-hero">
        <div className="container">
          <span className="badge">📋 Checkout</span>
          <h1>Complete Your <span className="text-gradient">Order</span></h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <form className="checkout-layout" onSubmit={handleSubmit}>
            <div>
              {/* Customer Info */}
              <div className="checkout-form-wrapper" style={{ marginBottom: 'var(--space-xl)' }}>
                <h3>👤 Your Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input className="form-control" name="name" value={customer.name} onChange={handleChange} placeholder="Your name" required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" className="form-control" name="phone" value={customer.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email (optional)</label>
                  <input type="email" className="form-control" name="email" value={customer.email} onChange={handleChange} placeholder="your@email.com" />
                </div>
              </div>

              {/* Delivery Method */}
              <div className="checkout-form-wrapper" style={{ marginBottom: 'var(--space-xl)' }}>
                <h3>🚚 Delivery Method</h3>
                <div className="delivery-options">
                  <div className={`delivery-option ${deliveryMethod === 'direct' ? 'selected' : ''}`} onClick={() => setDeliveryMethod('direct')}>
                    <div className="delivery-icon">🏠</div>
                    <h4>Direct Delivery</h4>
                    <p>To your doorstep</p>
                  </div>
                  <div className={`delivery-option ${deliveryMethod === 'bus' ? 'selected' : ''}`} onClick={() => setDeliveryMethod('bus')}>
                    <div className="delivery-icon"><FaBus /></div>
                    <h4>Bus Delivery</h4>
                    <p>Collect at bus stop</p>
                  </div>
                  <div className={`delivery-option ${deliveryMethod === 'pickup' ? 'selected' : ''}`} onClick={() => setDeliveryMethod('pickup')}>
                    <div className="delivery-icon">🏭</div>
                    <h4>Factory Pickup</h4>
                    <p>Collect from factory</p>
                  </div>
                </div>

                {deliveryMethod === 'direct' && (
                  <>
                    <div className="form-group">
                      <label>Delivery Address *</label>
                      <textarea className="form-control" name="address" value={customer.address} onChange={handleChange} placeholder="Full delivery address" required style={{ minHeight: '80px' }} />
                    </div>
                    <div className="form-group">
                      <label>Area / Locality</label>
                      <input className="form-control" name="area" value={customer.area} onChange={handleChange} placeholder="e.g. Avinashi Road, Palladam" />
                    </div>
                  </>
                )}

                {deliveryMethod === 'bus' && (
                  <div className="form-group">
                    <label>Select Bus Route *</label>
                    <select className="form-control" value={busRoute} onChange={e => setBusRoute(e.target.value)} required>
                      <option value="">Choose a route...</option>
                      {busRoutes.map((route, i) => (
                        <option key={i} value={route}>{route}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Payment */}
              <div className="checkout-form-wrapper">
                <h3>💳 Payment</h3>
                <div className="payment-options">
                  <div className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`} onClick={() => setPaymentMethod('cod')}>
                    <div className="pay-icon">💵</div>
                    <h4>Cash on Delivery</h4>
                  </div>
                  <div className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`} onClick={() => setPaymentMethod('upi')}>
                    <div className="pay-icon">📱</div>
                    <h4>UPI Payment</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="checkout-summary">
              <h3>Order Summary</h3>
              <div className="checkout-items">
                {cartItems.map((item, i) => (
                  <div className="checkout-item" key={i}>
                    <span className="name">{item.productName} × {item.quantity}<br /><small>{item.packSize}</small></span>
                    <span className="price">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="summary-actions" style={{ marginTop: 'var(--space-xl)' }}>
                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                  {loading ? 'Placing Order...' : <><FiSend /> Place Order — ₹{cartTotal}</>}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
