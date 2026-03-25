import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiX, FiChevronLeft, FiChevronRight, FiCamera, FiDisc, FiSun, FiLayers, FiStar, FiRefreshCw, FiCircle, FiZap, FiArrowRight, FiPackage, FiHeart, FiBriefcase, FiGift } from 'react-icons/fi';
import { FaBus } from 'react-icons/fa';
import './Gallery.css';

const galleryItems = [
  { media: '/chappathi-herobanner.jpg', title: 'Classic Chappathi', category: 'products', desc: 'Soft, fresh chappathi stacks', isImage: true },
  { media: '/poori.png', title: 'Golden Poori', category: 'products', desc: 'Perfectly round pooris', isImage: true },
  { media: '/parotta.png', title: 'Flaky Parotta', category: 'products', desc: 'Layered parotta perfection', isImage: true },
  { media: '/chola-poori.png', title: 'Chola Poori', category: 'products', desc: 'Spiced festival favourite', isImage: true },
  { media: <FiRefreshCw />, title: 'Dough Kneader', category: 'factory', desc: 'Industrial dough mixing' },
  { media: <FiCircle />, title: 'Ball Cutter', category: 'factory', desc: 'Precision portioning' },
  { media: <FiZap />, title: 'Pressing Machine', category: 'factory', desc: 'Uniform pressing' },
  { media: <FiArrowRight />, title: 'Conveyor Belt', category: 'factory', desc: 'Automated transfer system' },
  { media: <FiPackage />, title: 'Packaging Line', category: 'factory', desc: 'Hygienic sealed packaging' },
  { media: <FiHeart />, title: 'Wedding Catering', category: 'catering', desc: 'Grand wedding feast' },
  { media: <FiBriefcase />, title: 'Corporate Event', category: 'catering', desc: 'Office party catering' },
  { media: <FiGift />, title: 'Festival Special', category: 'catering', desc: 'Festival celebrations' },
];

const filterCategories = [
  { key: 'all', label: 'All' },
  { key: 'products', label: 'Products' },
  { key: 'factory', label: 'Factory' },
  { key: 'catering', label: 'Catering' },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);

  const filtered = activeFilter === 'all' ? galleryItems : galleryItems.filter(g => g.category === activeFilter);

  const openLightbox = (index) => {
    setLightbox(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = '';
  };

  const navigate = (dir) => {
    setLightbox(prev => {
      const next = prev + dir;
      if (next < 0) return filtered.length - 1;
      if (next >= filtered.length) return 0;
      return next;
    });
  };

  const renderMedia = (item) => {
    if (item.isImage) {
      return <img src={item.media} alt={item.title} className="gallery-img" />;
    }
    return item.media;
  };

  return (
    <div className="gallery-page page-enter">
      <section className="page-hero">
        <div className="container">
          <span className="badge"><FiCamera style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} /> Gallery</span>
          <h1>Our <span className="text-gradient">Gallery</span></h1>
          <p style={{ margin: '0 auto', maxWidth: '600px' }}>
            A visual journey through our products, factory, and catering events
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-filters" data-aos="fade-up">
            {filterCategories.map(cat => (
              <button key={cat.key} className={`filter-btn ${activeFilter === cat.key ? 'active' : ''}`} onClick={() => setActiveFilter(cat.key)}>
                {cat.label}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filtered.map((item, i) => (
              <div className="gallery-item" key={i} data-aos="fade-up" data-aos-delay={i * 50} onClick={() => openLightbox(i)}>
                {renderMedia(item)}
                <div className="overlay">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}><FiX /></button>
          <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); navigate(-1); }}><FiChevronLeft /></button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {filtered[lightbox] && renderMedia(filtered[lightbox])}
          </div>
          <p className="lightbox-caption">{filtered[lightbox]?.title} — {filtered[lightbox]?.desc}</p>
          <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); navigate(1); }}><FiChevronRight /></button>
        </div>
      )}
    </div>
  );
}
