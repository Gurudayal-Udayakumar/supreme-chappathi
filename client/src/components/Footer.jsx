import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">🫓</div>
              Supreme Chappathi
            </div>
            <p>
              Tirupur's trusted mini food factory. Machine-made perfection with homestyle taste.
              Fresh chappathi, poori, parotta & chola poori — delivered daily.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
              <a href="https://wa.me/918825982567" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/factory">Our Factory</Link></li>
              <li><Link to="/catering">Catering</Link></li>
              <li><Link to="/bus-delivery">Bus Delivery</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="footer-contact-item">
              <FiMapPin className="icon" />
              <span>Supreme Chappathi, Industrial Area,<br />Tirupur, Tamil Nadu 641602</span>
            </div>
            <div className="footer-contact-item">
              <FiPhone className="icon" />
              <span>+91 88259 82567</span>
            </div>
            <div className="footer-contact-item">
              <FiMail className="icon" />
              <span>info@supremechappathi.com</span>
            </div>
            <div className="footer-contact-item">
              <FiClock className="icon" />
              <span>Mon - Sat: 6:00 AM - 8:00 PM</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Supreme Chappathi. All rights reserved.</p>
          <p>Crafted with ❤️ in Tirupur, Tamil Nadu</p>
        </div>
      </div>
    </footer>
  );
}
