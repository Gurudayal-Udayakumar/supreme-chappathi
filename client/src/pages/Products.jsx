import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiShoppingCart, FiX, FiCheck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './Products.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const categoryEmojis = {
  'chappathi': '🫓',
  'poori': '🟡',
  'parotta': '🥐',
  'chola-poori': '✨'
};

const categories = [
  { key: 'all', label: 'All Products' },
  { key: 'chappathi', label: 'Chappathi' },
  { key: 'poori', label: 'Poori' },
  { key: 'parotta', label: 'Parotta' },
  { key: 'chola-poori', label: 'Chola Poori' },
];

// Fallback product data when API is not available
const fallbackProducts = [
  {
    _id: '1', name: 'Classic Chappathi', slug: 'classic-chappathi', category: 'chappathi',
    tagline: 'Soft, fluffy & homestyle',
    description: 'Our signature ready-to-cook chappathi made from premium whole wheat flour. Each piece is perfectly rolled, pressed by our automated machines, and packed fresh.',
    ingredients: ['Whole Wheat Flour', 'Water', 'Salt', 'Sunflower Oil'],
    nutrition: { calories: '120 kcal/pc', protein: '3.5g', carbs: '22g', fat: '2.5g', fiber: '3g' },
    packSizes: [{ size: '10 pieces', price: 50 }, { size: '20 pieces', price: 90 }, { size: '50 pieces', price: 200 }, { size: '100 pieces', price: 380 }],
    cookingInstructions: ['Heat a tawa on medium flame', 'Place chappathi on hot tawa', 'Cook 30 sec each side', 'Apply ghee if desired', 'Serve hot'],
    shelfLife: '5 days refrigerated, 30 days frozen', isAvailable: true, isFeatured: true
  },
  {
    _id: '2', name: 'Ready-to-Cook Poori', slug: 'ready-to-cook-poori', category: 'poori',
    tagline: 'Perfectly round, puffs every time',
    description: 'Pre-rolled, perfectly circular pooris ready for frying. Made with fine wheat flour and a touch of semolina for that perfect puff.',
    ingredients: ['Wheat Flour', 'Semolina', 'Water', 'Salt', 'Cooking Oil'],
    nutrition: { calories: '95 kcal/pc', protein: '2.5g', carbs: '15g', fat: '3g', fiber: '1.5g' },
    packSizes: [{ size: '10 pieces', price: 45 }, { size: '20 pieces', price: 80 }, { size: '50 pieces', price: 180 }, { size: '100 pieces', price: 340 }],
    cookingInstructions: ['Heat oil in a deep pan', 'Slide poori into hot oil', 'Press lightly to puff', 'Flip once golden', 'Drain and serve hot'],
    shelfLife: '3 days refrigerated, 20 days frozen', isAvailable: true, isFeatured: true
  },
  {
    _id: '3', name: 'Flaky Parotta', slug: 'flaky-parotta', category: 'parotta',
    tagline: 'Layers of crispy, flaky deliciousness',
    description: 'Multi-layered, flaky parotta made with our signature folding technique. Crispy outside, soft inside — a South Indian favourite!',
    ingredients: ['Maida', 'Water', 'Salt', 'Sunflower Oil', 'Sugar'],
    nutrition: { calories: '180 kcal/pc', protein: '4g', carbs: '28g', fat: '6g', fiber: '1g' },
    packSizes: [{ size: '5 pieces', price: 55 }, { size: '10 pieces', price: 100 }, { size: '25 pieces', price: 230 }, { size: '50 pieces', price: 440 }],
    cookingInstructions: ['Heat tawa on medium-high', 'Place parotta on tawa', 'Add oil/ghee around edges', 'Cook 1-2 min each side', 'Clap to separate layers'],
    shelfLife: '4 days refrigerated, 30 days frozen', isAvailable: true, isFeatured: true
  },
  {
    _id: '4', name: 'Chola Poori', slug: 'chola-poori', category: 'chola-poori',
    tagline: 'Spiced & golden, festival favourite',
    description: 'Special chola-flavoured pooris infused with aromatic spices and turmeric. A festival favourite bringing festive flavours to everyday meals!',
    ingredients: ['Wheat Flour', 'Chola Dal Powder', 'Turmeric', 'Cumin', 'Black Pepper', 'Salt', 'Water'],
    nutrition: { calories: '110 kcal/pc', protein: '3.5g', carbs: '16g', fat: '3.5g', fiber: '2g' },
    packSizes: [{ size: '10 pieces', price: 55 }, { size: '20 pieces', price: 100 }, { size: '50 pieces', price: 220 }, { size: '100 pieces', price: 420 }],
    cookingInstructions: ['Heat oil in deep pan', 'Slide chola poori into oil', 'It will puff up naturally', 'Flip once golden', 'Serve with potato masala'],
    shelfLife: '3 days refrigerated, 20 days frozen', isAvailable: true, isFeatured: true
  }
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPackSize, setSelectedPackSize] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        setProducts(fallbackProducts);
      }
    } catch {
      setProducts(fallbackProducts);
    }
  };

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const handleAddToCart = (product, packSize) => {
    addToCart(product, packSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setSelectedPackSize(product.packSizes?.[0] || null);
    setAddedToCart(false);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setSelectedPackSize(null);
    document.body.style.overflow = '';
  };

  return (
    <div className="products-page page-enter">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="badge">Fresh From Our Factory</span>
          <h1>Our <span className="text-gradient">Products</span></h1>
          <p style={{ margin: '0 auto', maxWidth: '600px' }}>
            Four signature products made with state-of-the-art machinery and the finest ingredients.
            Ready to cook, ready to love.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="section">
        <div className="container">
          <div className="category-filters" data-aos="fade-up">
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`filter-btn ${activeCategory === cat.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filteredProducts.map((product, index) => (
              <div
                key={product._id}
                className="product-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="product-card-img" onClick={() => openModal(product)} style={{ cursor: 'pointer' }}>
                  {categoryEmojis[product.category] || '🍞'}
                  <span className="product-card-category">{product.category}</span>
                </div>
                <div className="product-card-content">
                  <h3 onClick={() => openModal(product)} style={{ cursor: 'pointer' }}>{product.name}</h3>
                  <p className="tagline">{product.tagline}</p>
                  <p className="description">{product.description}</p>
                  <div className="product-card-footer">
                    <div className="price">
                      ₹{product.packSizes?.[0]?.price} <small>/ {product.packSizes?.[0]?.size}</small>
                    </div>
                    <button
                      className="add-cart-btn"
                      onClick={() => openModal(product)}
                    >
                      <FiShoppingCart /> View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="product-modal-overlay" onClick={closeModal}>
          <div className="product-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}><FiX /></button>

            <div className="modal-image">
              {categoryEmojis[selectedProduct.category] || '🍞'}
            </div>

            <div className="modal-body">
              <h2>{selectedProduct.name}</h2>
              <p className="tagline">{selectedProduct.tagline}</p>
              <p className="description">{selectedProduct.description}</p>

              <div className="modal-info-grid">
                <div className="modal-info-section">
                  <h4>🧾 Ingredients</h4>
                  <ul>
                    {selectedProduct.ingredients?.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>
                <div className="modal-info-section">
                  <h4>📊 Nutrition</h4>
                  <ul>
                    {selectedProduct.nutrition && Object.entries(selectedProduct.nutrition).map(([key, val]) => (
                      <li key={key}>{key}: {val}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {selectedProduct.cookingInstructions && (
                <div className="modal-info-section" style={{ marginBottom: 'var(--space-xl)' }}>
                  <h4>👩‍🍳 Cooking Instructions</h4>
                  <ul>
                    {selectedProduct.cookingInstructions.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 'var(--space-lg)' }}>
                🕐 Shelf Life: {selectedProduct.shelfLife}
              </p>

              <div className="pack-sizes">
                <h4>📦 Select Pack Size</h4>
                <div className="pack-size-options">
                  {selectedProduct.packSizes?.map((ps, i) => (
                    <button
                      key={i}
                      className={`pack-size-btn ${selectedPackSize?.size === ps.size ? 'selected' : ''}`}
                      onClick={() => setSelectedPackSize(ps)}
                    >
                      {ps.size} — ₹{ps.price}
                    </button>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => selectedPackSize && handleAddToCart(selectedProduct, selectedPackSize)}
                  disabled={!selectedPackSize}
                >
                  {addedToCart ? <><FiCheck /> Added!</> : <><FiShoppingCart /> Add to Cart — ₹{selectedPackSize?.price}</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
