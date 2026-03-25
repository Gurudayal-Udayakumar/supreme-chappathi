import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiTruck, FiShield, FiClock, FiArrowRight, FiSettings, FiFileText, FiUserCheck, FiGift, FiStar } from 'react-icons/fi';
import { FaBus } from 'react-icons/fa';
import './Home.css';

const products = [
  {
    name: 'Classic Chappathi',
    tagline: 'Soft & fluffy',
    price: '₹60 / 12 pcs',
    slug: 'classic-chappathi',
    image: '/chappathi-herobanner.jpg'
  },
  {
    name: 'Ready-to-Cook Poori',
    tagline: 'Puffs every time',
    price: '₹60 / 10 pcs',
    slug: 'ready-to-cook-poori',
    image: '/poori.png'
  },
  {
    name: 'Flaky Parotta',
    tagline: 'Layers of deliciousness',
    price: '₹60 / 6 pcs',
    slug: 'flaky-parotta',
    image: '/parotta.png'
  },
  {
    name: 'Chola Poori',
    tagline: 'Festival favourite',
    price: '₹75 / 10 pcs',
    slug: 'chola-poori',
    image: '/chola-poori.png'
  },
];

const testimonials = [
  {
    quote: "Supreme Chappathi has been our go-to supplier for over 3 years. Their quality is unmatched — our customers love the soft, fresh chappathis!",
    name: "Rajesh Kumar",
    role: "Retail Shop Owner, Tirupur",
    initials: "RK"
  },
  {
    quote: "We ordered for our daughter's wedding catering — 2000 parottas delivered hot and fresh. The bus delivery saved us so much hassle!",
    name: "Lakshmi Devi",
    role: "Catering Customer",
    initials: "LD"
  },
  {
    quote: "The factory-fresh quality shows in every piece. Machine-made precision with homestyle taste. Consistently excellent!",
    name: "Mohamed Irfan",
    role: "Restaurant Owner",
    initials: "MI"
  }
];

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    <div className="page-enter">
      {/* ═══ HERO ═══ */}
      <section className="home-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <span className="dot"></span>
                Fresh from our factory daily
              </div>
              <h1>
                Freshly Made.<br />
                <span className="highlight">Ready to Cook.</span><br />
                Delivered Fresh.
              </h1>
              <p>
                Tirupur's trusted mini food factory producing premium chappathi, poori, parotta
                & chola poori with state-of-the-art machinery. From our factory to your table.
              </p>
              <div className="hero-actions" data-aos="fade-up" data-aos-delay="300">
              <Link to="/products" className="btn btn-primary btn-lg">
                View Products <FiArrowRight />
              </Link>
              <Link to="/contact" className="btn btn-outline btn-lg">Contact Us</Link>
            </div>
            </div>

            <div className="hero-visual">
              <div className="hero-image-wrapper">
                <div className="hero-image-placeholder">
                  <img
                    src="/chappathi-herobanner.jpg"
                    alt="Freshly cooked Supreme Chappathi"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="hero-float-card card-1">
                <div className="card-icon"><FiSettings /></div>
                <div className="card-info">
                  <span>Production</span>
                  <strong>5000+ Daily</strong>
                </div>
              </div>
              <div className="hero-float-card card-2">
                <div className="card-icon"><FaBus /></div>
                <div className="card-info">
                  <span>Delivery</span>
                  <strong>Bus Routes</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRODUCT HIGHLIGHTS ═══ */}
      <section className="section products-highlight">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="badge">Our Products</span>
            <h2>Made Fresh. <span className="text-gradient">Every Single Day.</span></h2>
            <p>Four signature products, each crafted with precision machinery and the finest ingredients</p>
          </div>

          <div className="products-grid">
            {products.map((product, index) => (
              <Link to="/products" key={product.slug} className="product-highlight-card" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="product-card-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-card-body">
                  <h3>{product.name}</h3>
                  <p className="tagline">{product.tagline}</p>
                  <p className="price">From {product.price} <span>onwards</span></p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FACTORY TEASER ═══ */}
      <section className="section factory-teaser">
        <div className="container">
          <div className="factory-teaser-content">
            <div className="factory-text" data-aos="fade-right">
              <span className="badge">Our Factory</span>
              <h2>Not a Home Kitchen.<br /><span className="text-gradient">A Mini Food Factory.</span></h2>
              <p>
                Every chappathi, poori, and parotta is crafted using industrial-grade machinery —
                from automated dough kneading to precision pressing, conveyor belt processing,
                and hygienic sealed packaging.
              </p>
              <div className="factory-stats">
                <div className="stat-item">
                  <span className="stat-number">6+</span>
                  <span className="stat-label">Machines</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">5K+</span>
                  <span className="stat-label">Daily Output</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Retail Partners</span>
                </div>
              </div>
              <Link to="/factory" className="btn btn-primary">
                Explore Our Factory <FiArrowRight />
              </Link>
            </div>
            <div className="factory-image-block" data-aos="fade-left">
              <div className="factory-image-placeholder">
                <FiSettings style={{ fontSize: '3rem' }} />
                <span>Factory Tour Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BUS DELIVERY PREVIEW ═══ */}
      <section className="section bus-delivery-preview">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="badge"><FaBus style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} /> Unique Delivery</span>
            <h2>How We <span className="text-gradient">Dispatch to Your City</span></h2>
            <p>Our unique bus-route logistics ensures fresh supply reaches you within hours, anywhere across our served routes.</p>
          </div>

          <div className="dispatch-teaser-grid">
            <div className="dispatch-card" data-aos="fade-up">
              <div className="dispatch-icon">1</div>
              <h4>Place Enquiry</h4>
              <p>Confirm your bulk or retail needs via WhatsApp</p>
            </div>
            <div className="dispatch-card" data-aos="fade-up" data-aos-delay="100">
              <div className="dispatch-icon">2</div>
              <h4>Rapid Dispatch</h4>
              <p>Freshly packed and loaded onto early morning buses</p>
            </div>
            <div className="dispatch-card" data-aos="fade-up" data-aos-delay="200">
              <div className="dispatch-icon">3</div>
              <h4>Fresh Arrival</h4>
              <p>Collect at your stop — simple and cost-effective</p>
            </div>
          </div>

          <div className="text-center" style={{ marginTop: 'var(--space-2xl)' }}>
            <Link to="/bus-delivery" className="btn btn-secondary" data-aos="fade-up">
              Learn More About Bus Delivery <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="badge">Testimonials</span>
            <h2>Loved by <span className="text-gradient">Retailers & Families</span></h2>
            <p>Hear from the businesses and families who trust Supreme Chappathi</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="stars">{[...Array(5)].map((_, i) => <FiStar key={i} />)}</div>
                <p className="quote">"{t.quote}"</p>
                <div className="testimonial-author">
                  <div className="avatar">{t.initials}</div>
                  <div className="author-info">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="cta-section" data-aos="fade-up">
        <div className="container">
          <h2>Ready to Order Fresh?</h2>
          <p>Get factory-fresh chappathi, poori, parotta & chola poori for your business or event</p>
          <Link to="/products" className="btn btn-lg">
            Browse Products <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
