import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiAward, FiDroplet, FiFeather, FiUsers, FiZap, FiHeart, FiUserCheck } from 'react-icons/fi';
import './About.css';

export default function About() {
  useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);

  return (
    <div className="about-page page-enter">
      <section className="page-hero">
        <div className="container">
          <span className="badge">About Us</span>
          <h1>The Story of <span className="text-gradient">Supreme Chappathi</span></h1>
          <p style={{ margin: '0 auto', maxWidth: '600px' }}>
            From a small kitchen dream to a fully mechanized mini food factory — our journey is built on quality, freshness, and love for great food.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section">
        <div className="container">
          <div className="story-section">
            <div className="story-image" data-aos="fade-right"><FiUserCheck /></div>
            <div className="story-text" data-aos="fade-left">
              <span className="badge">Our Story</span>
              <h2>Started with a <span className="text-gradient">Passion for Quality</span></h2>
              <p>Supreme Chappathi began with a simple vision — to bring consistently excellent, fresh chappathi and Indian flatbreads to every household and shop in Tirupur.</p>
              <p>What started as a small operation has grown into a fully mechanized mini food factory, equipped with industrial machinery for every step of the production process — from dough kneading to sealed packaging.</p>
              <p>Today, we serve 50+ retail partners, handle catering for large events, and have pioneered a unique bus delivery system that brings our products to doorsteps across Tamil Nadu.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="badge">Our Values</span>
            <h2>What We <span className="text-gradient">Stand For</span></h2>
          </div>
          <div className="values-grid">
            {[
              { icon: <FiAward />, title: 'Quality First', desc: 'Every product meets our strict quality standards — no compromises, no shortcuts.' },
              { icon: <FiDroplet />, title: 'Hygiene', desc: 'Factory-level cleanliness with FSSAI compliance and sanitized machinery.' },
              { icon: <FiFeather />, title: 'Freshness', desc: 'Made fresh daily and delivered within hours of production.' },
              { icon: <FiUsers />, title: 'Reliability', desc: 'Our retail partners trust us for consistent daily supply, rain or shine.' },
              { icon: <FiZap />, title: 'Innovation', desc: 'From bus delivery to automated production — we innovate constantly.' },
              { icon: <FiHeart />, title: 'Community', desc: 'Proud to serve Tirupur and surrounding communities with affordable nutrition.' },
            ].map((v, i) => (
              <div className="value-card" key={i} data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="value-icon">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section">
        <div className="container">
          <div className="founder-section" data-aos="fade-up">
            <div>
              <div className="founder-image"><FiUserCheck /></div>
            </div>
            <div className="founder-info">
              <span className="badge">Founder</span>
              <h3>The Heart Behind Supreme Chappathi</h3>
              <p className="title">Founder & Head of Operations</p>
              <p>With years of experience in the food industry and a deep understanding of quality Indian flatbreads, our founder built Supreme Chappathi from the ground up. Her vision of combining traditional recipes with modern machinery has resulted in products that are loved by thousands.</p>
              <p>Under her leadership, Supreme Chappathi has grown from a small operation to a fully mechanized factory serving retailers across Tamil Nadu.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="badge">Our Journey</span>
            <h2>Milestones <span className="text-gradient">Along the Way</span></h2>
          </div>
          <div className="timeline" data-aos="fade-up">
            {[
              { year: '2018', title: 'The Beginning', desc: 'Started production with basic equipment and a small team' },
              { year: '2019', title: 'First Machines', desc: 'Invested in our first dough kneader and pressing machine' },
              { year: '2020', title: 'Factory Setup', desc: 'Moved to a dedicated factory space with full machinery' },
              { year: '2021', title: 'Bus Delivery Launch', desc: 'Pioneered our innovative bus route delivery system' },
              { year: '2022', title: '50+ Retailers', desc: 'Reached 50+ retail shop partnerships across the region' },
              { year: '2023', title: 'Full Automation', desc: 'Complete conveyor belt system and automated packaging' },
            ].map((item, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-content">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
