import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiArrowRight, FiChevronDown, FiFileText, FiUserCheck, FiGift, FiClock, FiDollarSign, FiFeather } from 'react-icons/fi';
import { FaBus } from 'react-icons/fa';
import './BusDelivery.css';

const routes = [
  { icon: <FaBus />, name: 'Tirupur - Coimbatore', areas: 'Avinashi, Peelamedu, Gandhipuram', timing: 'Daily 6:30 AM Bus' },
  { icon: <FaBus />, name: 'Tirupur - Erode', areas: 'Dharapuram, Kangeyam, Perundurai', timing: 'Daily 7:00 AM Bus' },
  { icon: <FaBus />, name: 'Tirupur - Karur', areas: 'Vellakoil, Palani Road areas', timing: 'Daily 6:45 AM Bus' },
  { icon: <FaBus />, name: 'Tirupur - Palladam', areas: 'Mangalam, Palladam town', timing: 'Daily 6:30 AM Bus' },
  { icon: <FaBus />, name: 'Tirupur - Udumalpet', areas: 'Pollachi Road, Pongalur', timing: 'Daily 7:15 AM Bus' },
  { icon: <FaBus />, name: 'Tirupur - Salem', areas: 'Namakkal, Rasipuram', timing: 'Tue, Thu, Sat — 6:00 AM' },
];

const faqs = [
  { q: 'How do I collect my order from the bus?', a: 'Once your order is dispatched, we will send you a WhatsApp message with the bus number, departure time, and estimated arrival at your stop. Simply go to your bus stop at the specified time and collect your package from the bus conductor or our delivery person.' },
  { q: 'What if I miss the bus pickup?', a: 'Please contact us immediately via WhatsApp or phone. We can arrange an alternative pickup or reschedule your delivery for the next available bus on that route.' },
  { q: 'Is there a minimum order for bus delivery?', a: 'Yes, bus delivery requires a minimum order of ₹200. This ensures the packaging is secure enough for bus transport and makes the delivery cost-effective.' },
  { q: 'How is the freshness maintained during bus transport?', a: 'All products are sealed in food-grade packaging immediately after production. The sealed packs maintain freshness for several hours. Bus transit typically takes 1-2 hours, so products arrive perfectly fresh.' },
  { q: 'Can I get daily recurring bus delivery?', a: 'Absolutely! Many of our retail partners use daily bus delivery. Contact us to set up a recurring order schedule and enjoy hassle-free daily supply.' },
];

export default function BusDelivery() {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);

  return (
    <div className="bus-page page-enter">
      <section className="page-hero">
        <div className="container">
          <span className="badge"><FaBus style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} /> Bus Delivery</span>
          <h1>Fresh Deliveries <span className="text-gradient">Via Bus Routes</span></h1>
          <p style={{ margin: '0 auto', maxWidth: '600px' }}>
            A unique, affordable delivery system. We load your orders onto local buses
            and you collect them at your nearest stop — fresh and on time!
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="badge">Simple Process</span>
            <h2>How It <span className="text-gradient">Works</span></h2>
          </div>

          <div className="how-it-works">
            {[
              { icon: <FiFileText />, num: '1', title: 'Place Order', desc: 'Order online or via WhatsApp with your nearest bus stop' },
              { icon: <FiUserCheck />, num: '2', title: 'We Prepare', desc: 'Fresh made, packed & sealed at our factory' },
              { icon: <FaBus />, num: '3', title: 'Bus Dispatch', desc: 'Loaded onto the bus serving your route' },
              { icon: <FiGift />, num: '4', title: 'Collect!', desc: 'Pick up fresh at your bus stop' },
            ].map((step, i) => (
              <div className="how-step" key={i} data-aos="fade-up" data-aos-delay={i * 150}>
                <div className="how-step-icon">{step.icon}</div>
                <div className="how-step-number">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/products" className="btn btn-primary" data-aos="fade-up">
              Order Now <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Routes */}
      <section className="section routes-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="badge">Available Routes</span>
            <h2>Bus Routes <span className="text-gradient">We Serve</span></h2>
            <p>Currently serving Tirupur and surrounding areas</p>
          </div>

          <div className="routes-grid">
            {routes.map((route, i) => (
              <div className="route-card" key={i} data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="route-icon">{route.icon}</div>
                <div className="route-info">
                  <h4>{route.name}</h4>
                  <p>{route.areas}</p>
                  <p className="timing"><FiClock style={{ marginRight: '0.3rem', verticalAlign: 'middle' }} /> {route.timing}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="badge">Why Bus Delivery?</span>
            <h2>Benefits of <span className="text-gradient">Bus Delivery</span></h2>
          </div>

          <div className="benefits-grid">
            {[
              { icon: <FiDollarSign />, title: 'Cost Effective', desc: 'Bus transport is much cheaper than dedicated delivery vehicles, savings passed to you' },
              { icon: <FiFeather />, title: 'Eco Friendly', desc: 'Utilizing existing bus infrastructure means lower carbon footprint for deliveries' },
              { icon: <FiClock />, title: 'Reliable Timing', desc: 'Buses run on fixed schedules — predictable delivery times you can count on' },
            ].map((b, i) => (
              <div className="benefit-card" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="benefit-icon">{b.icon}</div>
                <h4>{b.title}</h4>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="badge">FAQ</span>
            <h2>Frequently Asked <span className="text-gradient">Questions</span></h2>
          </div>

          <div className="faq-list" data-aos="fade-up">
            {faqs.map((faq, i) => (
              <div className="faq-item" key={i}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <FiChevronDown className={`arrow ${openFaq === i ? 'open' : ''}`} />
                </button>
                {openFaq === i && <div className="faq-answer">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
