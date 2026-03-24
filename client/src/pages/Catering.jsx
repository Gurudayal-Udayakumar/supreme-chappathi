import { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiCheck, FiSend } from 'react-icons/fi';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import './Catering.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const packages = [
  {
    icon: '💍',
    title: 'Wedding Package',
    desc: 'Grand celebrations deserve grand feasts',
    features: ['Custom menu selection', 'Bulk quantities (500+)', 'On-time delivery guaranteed', 'Variety packs available', 'Dedicated coordinator'],
    featured: false
  },
  {
    icon: '🏢',
    title: 'Corporate Events',
    desc: 'Impress your team with fresh delights',
    features: ['Office parties & meetings', 'Regular supply contracts', 'Custom branding options', 'Weekly/monthly plans', 'Flexible quantities'],
    featured: true
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Family Celebrations',
    desc: 'Birthdays, festivals & family gatherings',
    features: ['Minimum 50 pieces', 'Festival special items', 'Same-day delivery', 'Combo packs available', 'Affordable pricing'],
    featured: false
  }
];

export default function Catering() {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', eventType: 'wedding',
    eventDate: '', guestCount: '', menuPreferences: [], message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null);

  const HCAPTCHA_SITE_KEY = import.meta.env.VITE_HCAPTCHA_SITE_KEY || '10000000-ffff-ffff-ffff-000000000001';

  useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!captchaToken) {
      setError('Please complete the CAPTCHA verification');
      return;
    }

    setLoading(true);
    try {
      // Save to MongoDB and send email in parallel
      const backendPromise = fetch(`${API_URL}/catering`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, captchaToken })
      });

      const emailPromise = WEB3FORMS_KEY
        ? fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
              access_key: WEB3FORMS_KEY,
              subject: `🍽️ Catering Enquiry: ${formData.eventType} - ${formData.name}`,
              from_name: 'Supreme Chappathi Website',
              name: formData.name,
              email: formData.email || 'Not provided',
              phone: formData.phone,
              'Event Type': formData.eventType,
              'Event Date': formData.eventDate,
              'Guest Count': formData.guestCount,
              message: formData.message || 'No additional details'
            })
          })
        : Promise.resolve(null);

      const [backendRes] = await Promise.all([backendPromise, emailPromise]);
      if (backendRes.ok) {
        setSubmitted(true);
      } else {
        const data = await backendRes.json();
        setError(data.message || 'Something went wrong');
      }
    } catch {
      setError('Could not reach the server. Please try again later.');
    }
    setLoading(false);
    if (captchaRef.current) captchaRef.current.resetCaptcha();
    setCaptchaToken(null);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  return (
    <div className="catering-page page-enter">
      <section className="page-hero">
        <div className="container">
          <span className="badge">🍽️ Catering Services</span>
          <h1>Catering for <span className="text-gradient">Every Occasion</span></h1>
          <p style={{ margin: '0 auto', maxWidth: '600px' }}>
            From intimate family gatherings to grand weddings — we deliver fresh, delicious
            chappathi, poori, parotta & chola poori in bulk for your special events.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="section">
        <div className="container">
          <div className="catering-packages">
            {packages.map((pkg, i) => (
              <div className={`package-card ${pkg.featured ? 'featured' : ''}`} key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="package-header">
                  <div className="package-icon">{pkg.icon}</div>
                  <h3>{pkg.title}</h3>
                  <p className="package-desc">{pkg.desc}</p>
                </div>
                <div className="package-features">
                  <ul>
                    {pkg.features.map((f, j) => (
                      <li key={j}><FiCheck className="check" /> {f}</li>
                    ))}
                  </ul>
                </div>
                <div className="package-footer">
                  <a href="#enquiry-form" className="btn btn-primary" style={{ width: '100%' }}>
                    Get Quote
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="section enquiry-section" id="enquiry-form">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="badge">Get a Quote</span>
            <h2>Catering <span className="text-gradient">Enquiry</span></h2>
            <p>Tell us about your event and we'll get back to you with a custom quote</p>
          </div>

          <div className="enquiry-form-wrapper" data-aos="fade-up">
            {submitted ? (
              <div className="form-success">
                <div className="success-icon">✅</div>
                <h3>Enquiry Submitted!</h3>
                <p>Thank you! We will contact you within 24 hours with a custom quote.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Full name" required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" />
                  </div>
                  <div className="form-group">
                    <label>Event Type *</label>
                    <select className="form-control" name="eventType" value={formData.eventType} onChange={handleChange} required>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="family">Family Celebration</option>
                      <option value="festival">Festival</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Event Date *</label>
                    <input type="date" className="form-control" name="eventDate" value={formData.eventDate} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Estimated Guests *</label>
                    <input type="number" className="form-control" name="guestCount" value={formData.guestCount} onChange={handleChange} placeholder="Number of guests" required min="10" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Additional Details</label>
                  <textarea className="form-control" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your menu preferences, special requirements, etc." />
                </div>

                {error && <div className="form-error">{error}</div>}
                <div className="captcha-wrapper">
                  <HCaptcha
                    sitekey={HCAPTCHA_SITE_KEY}
                    onVerify={(token) => setCaptchaToken(token)}
                    onExpire={() => setCaptchaToken(null)}
                    ref={captchaRef}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading || !captchaToken}>
                  {loading ? 'Submitting...' : <><FiSend /> Submit Enquiry</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
