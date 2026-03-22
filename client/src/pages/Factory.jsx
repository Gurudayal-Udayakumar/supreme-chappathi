import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiArrowRight } from 'react-icons/fi';
import './Factory.css';

const productionSteps = [
  {
    number: 1,
    title: 'Raw Material Selection',
    machine: 'Quality Control',
    emoji: '🌾',
    description: 'We source only the finest wheat flour, semolina, and cooking oil from trusted suppliers. Every batch is tested for quality, freshness, and consistency before entering our production line.'
  },
  {
    number: 2,
    title: 'Automated Dough Kneading',
    machine: 'Dough Kneader Machine',
    emoji: '🔄',
    description: 'Our industrial dough kneader mixes precise proportions of flour, water, salt, and oil to create perfectly consistent dough every time. The machine handles large batches while maintaining the ideal texture and softness.'
  },
  {
    number: 3,
    title: 'Precision Ball Cutting',
    machine: 'Ball Cutter Machine',
    emoji: '⚪',
    description: 'The kneaded dough moves to our ball cutter, which portions each piece to exact weight specifications. Every dough ball is uniform — ensuring consistent size and weight in every chappathi, poori, or parotta.'
  },
  {
    number: 4,
    title: 'Machine Pressing',
    machine: 'Pressing Machine',
    emoji: '🔨',
    description: 'Each dough ball is fed into our pressing machine, which flattens and shapes them to perfect circular form and uniform thickness. For parotta, a special folding mechanism creates those signature flaky layers.'
  },
  {
    number: 5,
    title: 'Conveyor Belt Transfer',
    machine: 'Conveyor Belt System',
    emoji: '➡️',
    description: 'A sanitized conveyor belt system smoothly transfers the pressed products through our flour dusting station and into the packaging area. This automated flow ensures zero manual handling for maximum hygiene.'
  },
  {
    number: 6,
    title: 'Flour Dust Application',
    machine: 'Flour Dust Conveyor',
    emoji: '💨',
    description: 'A light dusting of flour is applied to prevent sticking during packaging and storage. Our flour dust conveyor ensures even distribution on every piece, maintaining freshness and easy separation.'
  },
  {
    number: 7,
    title: 'Hygienic Packaging',
    machine: 'Packaging Machine',
    emoji: '📦',
    description: 'Products are automatically counted, stacked, and placed into food-grade packaging. Our packaging machine ensures each pack contains the exact number of pieces with proper arrangement for easy handling.'
  },
  {
    number: 8,
    title: 'Sealed & Ready',
    machine: 'Sealing Machine',
    emoji: '✅',
    description: 'The final step — our sealing machine heat-seals every package to lock in freshness. Each sealed pack is dated, labeled, and ready for distribution to retail shops or direct customer orders.'
  }
];

const qualityPoints = [
  { icon: '🧼', title: 'Hygiene First', desc: 'FSSAI standards, sanitized equipment, hairnets & gloves' },
  { icon: '⚙️', title: 'Machine Precision', desc: 'Consistent quality with automated processes' },
  { icon: '🌿', title: 'Fresh Ingredients', desc: 'Sourced daily from trusted local suppliers' },
  { icon: '🔬', title: 'Quality Tested', desc: 'Every batch inspected before packaging' },
];

export default function Factory() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    <div className="factory-page page-enter">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="badge">🏭 Our Factory</span>
          <h1>Where <span className="text-gradient">Machines Meet</span> Tradition</h1>
          <p style={{ margin: '0 auto', maxWidth: '600px' }}>
            Take a virtual tour of our state-of-the-art mini food factory in Tirupur.
            See how we combine industrial machinery with traditional recipes.
          </p>
        </div>
      </section>

      {/* Production Line */}
      <section className="section production-line">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="badge">The Production Process</span>
            <h2>From <span className="text-gradient">Raw Flour to Sealed Pack</span></h2>
            <p>8 precision steps, 6+ machines, zero compromise on quality</p>
          </div>

          {productionSteps.map((step, index) => (
            <div className="production-step" key={step.number}>
              <div className="step-content" data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'} data-aos-delay="100">
                <span className="machine-name">⚙️ {step.machine}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <div className="step-number" data-aos="zoom-in" data-aos-delay="200">
                {step.number}
              </div>
              <div className="step-visual" data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'} data-aos-delay="300">
                {step.emoji}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quality Section */}
      <section className="section quality-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="badge">Quality Promise</span>
            <h2>Quality at <span className="text-gradient">Every Step</span></h2>
          </div>

          <div className="quality-grid">
            {qualityPoints.map((point, i) => (
              <div className="quality-card" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="quality-icon">{point.icon}</div>
                <h4>{point.title}</h4>
                <p>{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capacity */}
      <section className="section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="badge">Production Capacity</span>
            <h2>Built to <span className="text-gradient">Scale</span></h2>
          </div>

          <div className="capacity-stats">
            <div className="capacity-stat" data-aos="fade-up" data-aos-delay="0">
              <div className="number">5000+</div>
              <span className="label">Pieces / Day</span>
            </div>
            <div className="capacity-stat" data-aos="fade-up" data-aos-delay="100">
              <div className="number">6+</div>
              <span className="label">Machines</span>
            </div>
            <div className="capacity-stat" data-aos="fade-up" data-aos-delay="200">
              <div className="number">50+</div>
              <span className="label">Retail Partners</span>
            </div>
            <div className="capacity-stat" data-aos="fade-up" data-aos-delay="300">
              <div className="number">100%</div>
              <span className="label">Machine Made</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Want Our Products?</h2>
          <p>Order in bulk for your retail shop or try our products at home</p>
          <Link to="/products" className="btn btn-lg">
            Browse Products <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
