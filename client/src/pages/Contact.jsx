import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './Contact.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);

  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;

  const validatePhone = (phone) => {
    if (!phone.trim()) return 'Phone number is required';
    if (phone.length < 7 || phone.length > 20) return 'Phone number must be between 7 and 20 digits';
    if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate phone before submitting
    const phoneValidation = validatePhone(formData.phone);
    if (phoneValidation) {
      setPhoneError(phoneValidation);
      return;
    }

    setLoading(true);
    try {
      // Save to MongoDB (backend) and send email (Web3Forms) in parallel
      const backendPromise = fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const emailPromise = WEB3FORMS_KEY
        ? fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
              access_key: WEB3FORMS_KEY,
              subject: `📩 New Contact: ${formData.subject}`,
              from_name: 'Supreme Chappathi Website',
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              message: formData.message
            })
          })
        : Promise.resolve(null);

      const [backendRes] = await Promise.all([backendPromise, emailPromise]);
      const data = await backendRes.json();
      if (!backendRes.ok) {
        setError(data.errors ? data.errors.join(', ') : data.message || 'Something went wrong');
        setLoading(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError('Could not reach the server. Please try again later.');
    }
    setLoading(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'phone') setPhoneError(validatePhone(value));
    if (error) setError('');
  };

  return (
    <div className="contact-page page-enter">
      <section className="page-hero">
        <div className="container">
          <span className="badge">📞 Contact</span>
          <h1>Get In <span className="text-gradient">Touch</span></h1>
          <p style={{ margin: '0 auto', maxWidth: '600px' }}>
            Have a question, bulk order enquiry, or just want to say hello? We'd love to hear from you!
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            {/* Contact Info */}
            <div className="contact-info-cards" data-aos="fade-right">
              <div className="contact-card">
                <div className="contact-card-icon"><FiMapPin /></div>
                <div className="contact-card-info">
                  <h4>Visit Us</h4>
                  <p>Supreme Chappathi, Industrial Area,<br />Tirupur, Tamil Nadu 641602</p>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon"><FiPhone /></div>
                <div className="contact-card-info">
                  <h4>Call Us</h4>
                  <p><a href="tel:+919876543210">+91 98765 43210</a></p>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon"><FaWhatsapp /></div>
                <div className="contact-card-info">
                  <h4>WhatsApp</h4>
                  <p><a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">+91 98765 43210</a></p>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon"><FiMail /></div>
                <div className="contact-card-info">
                  <h4>Email Us</h4>
                  <p><a href="mailto:info@supremechappathi.com">info@supremechappathi.com</a></p>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon"><FiClock /></div>
                <div className="contact-card-info">
                  <h4>Business Hours</h4>
                  <p>Mon - Sat: 6:00 AM - 8:00 PM<br />Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrapper" data-aos="fade-left">
              {submitted ? (
                <div className="form-success">
                  <div className="success-icon">✅</div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Name *</label>
                      <input className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone *</label>
                      <input
                        type="tel"
                        className={`form-control${phoneError ? ' input-error' : ''}`}
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        required
                      />
                      {phoneError && <span className="field-error">{phoneError}</span>}
                    </div>
                    <div className="form-group">
                      <label>Subject *</label>
                      <input className="form-control" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Message *</label>
                    <textarea className="form-control" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us more..." required />
                  </div>
                  {error && <div className="form-error">{error}</div>}
                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading || !!phoneError}>
                    {loading ? 'Sending...' : <><FiSend /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="map-section" data-aos="fade-up">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125323.40517416685!2d77.28410879999999!3d11.1085242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba907b0754fed9f%3A0x68370824feae4286!2sTiruppur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Supreme Chappathi Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
