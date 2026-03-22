import { Link } from 'react-router-dom';
import { FiMinus, FiPlus, FiTrash2, FiShoppingCart, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './Cart.css';

const categoryEmojis = { 'classic-chappathi': '🫓', 'ready-to-cook-poori': '🟡', 'flaky-parotta': '🥐', 'chola-poori': '✨' };

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal, cartCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page page-enter">
        <section className="page-hero">
          <div className="container">
            <span className="badge">🛒 Your Cart</span>
            <h1>Shopping <span className="text-gradient">Cart</span></h1>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="cart-empty">
              <div className="empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added any products yet</p>
              <Link to="/products" className="btn btn-primary">Browse Products <FiArrowRight /></Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="cart-page page-enter">
      <section className="page-hero">
        <div className="container">
          <span className="badge">🛒 Your Cart</span>
          <h1>Shopping <span className="text-gradient">Cart</span></h1>
          <p>{cartCount} item{cartCount !== 1 ? 's' : ''} in your cart</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cart-layout">
            {/* Cart Items */}
            <div className="cart-items">
              {cartItems.map((item, i) => (
                <div className="cart-item" key={i}>
                  <div className="cart-item-image">
                    {categoryEmojis[item.productSlug] || '🍞'}
                  </div>
                  <div className="cart-item-info">
                    <h4>{item.productName}</h4>
                    <p className="pack-size">{item.packSize} — ₹{item.price} each</p>
                  </div>
                  <div className="quantity-controls">
                    <button className="qty-btn" onClick={() => updateQuantity(item.productId, item.packSize, item.quantity - 1)}>
                      <FiMinus />
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.productId, item.packSize, item.quantity + 1)}>
                      <FiPlus />
                    </button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className="item-total">₹{item.price * item.quantity}</span>
                    <button className="remove-btn" onClick={() => removeFromCart(item.productId, item.packSize)} aria-label="Remove item">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal ({cartCount} items)</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="summary-actions">
                <Link to="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                  Proceed to Checkout <FiArrowRight />
                </Link>
                <button className="btn btn-dark" onClick={clearCart} style={{ width: '100%' }}>
                  Clear Cart
                </button>
                <Link to="/products" className="btn btn-secondary btn-sm" style={{ width: '100%', textAlign: 'center' }}>
                  <FiShoppingCart /> Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
