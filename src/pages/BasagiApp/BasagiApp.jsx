import React, { useState, useEffect, useCallback } from 'react';

/* ─────────────────────────────────────────────────
   TESTIMONIALS CSS  (was Testimonials/Testimonials.css)
───────────────────────────────────────────────── */
const TESTIMONIALS_CSS = `
.t-section {
  background: #000000;
  padding: 60px 0 20px;
  overflow: hidden;
  position: relative;
}
.t-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  margin-bottom: 16px;
  padding: 0 24px;
}
.t-heading {
  font-family: 'Outfit', 'Inter', sans-serif;
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  font-weight: 800;
  color: #ffcc00;
  text-align: center;
  margin: 0;
  letter-spacing: -0.01em;
}
.t-arrow {
  background: none;
  border: none;
  color: #a855f7;
  font-size: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, color 0.2s;
  padding: 0 10px;
}
.t-arrow:hover { color: #d8b4fe; transform: scale(1.2); }
.t-arrow svg { stroke: currentColor; }
.t-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 60px;
}
.t-dot {
  width: 9px; height: 9px;
  border-radius: 50%;
  border: none;
  background: rgba(168, 85, 247, 0.4);
  cursor: pointer;
  padding: 0;
  transition: all 0.28s ease;
}
.t-dot.active { background: #a855f7; width: 28px; border-radius: 5px; }
.t-stage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 70px;
  min-height: 390px;
}
.t-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 500px; height: 500px;
  background: radial-gradient(ellipse at center, rgba(147,51,234,0.45) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(35px);
  pointer-events: none;
  z-index: 0;
}
.t-card {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.44s cubic-bezier(.4,0,.2,1), opacity 0.44s cubic-bezier(.4,0,.2,1);
  flex-shrink: 0;
}
.t-card.left {
  width: 260px; min-height: 300px;
  opacity: 0.65; transform: scale(0.88);
  z-index: 1; margin-right: -24px;
  background: #a855f7;
  padding: 6px 12px 14px 6px;
  border-radius: 120px 24px 30px 100px / 80px 24px 30px 80px;
}
.t-card.left .t-card-body { border-radius: 110px 20px 24px 90px / 75px 20px 24px 75px; }
.t-card.center {
  width: 320px; min-height: 380px;
  opacity: 1; z-index: 3; transform: scale(1);
  background: #a855f7;
  padding: 6px 14px 14px 6px;
  border-radius: 120px 24px 120px 24px / 90px 24px 90px 24px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.6);
}
.t-card.center .t-card-body { border-radius: 110px 20px 110px 20px / 80px 20px 80px 20px; }
.t-card.right {
  width: 260px; min-height: 300px;
  opacity: 0.65; transform: scale(0.88);
  z-index: 1; margin-left: -24px;
  background: #a855f7;
  padding: 6px 6px 14px 12px;
  border-radius: 24px 120px 100px 30px / 24px 90px 80px 30px;
}
.t-card.right .t-card-body { border-radius: 20px 110px 90px 24px / 20px 80px 75px 24px; }
.t-card.animating { transition: none; }
.t-card-body {
  background: #111116;
  width: 100%; height: 100%;
  display: flex; flex-direction: column;
  align-items: center; text-align: center;
  padding: 64px 20px 32px;
  box-sizing: border-box; flex-grow: 1;
}
.t-avatar-wrap {
  position: absolute; top: -44px;
  left: 50%; transform: translateX(-50%);
  border-radius: 50%; border: 4px solid #000;
  width: 88px; height: 88px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.5);
  z-index: 10;
}
.t-card.center .t-avatar-wrap { width: 96px; height: 96px; top: -48px; }
.t-card.left .t-avatar-wrap, .t-card.right .t-avatar-wrap { width: 76px; height: 76px; top: -38px; }
.t-avatar { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block; }
.t-name { font-family: 'Outfit', sans-serif; font-size: 1.1rem; font-weight: 700; color: #ffffff; margin: 0 0 12px; }
.t-quote { color: #a855f7; font-size: 2.4rem; font-weight: 900; line-height: 1; margin-bottom: 10px; font-family: Georgia, serif; }
.t-text { font-size: 0.82rem; line-height: 1.7; color: rgba(255,255,255,0.7); margin: 0; }
.t-card.left .t-text, .t-card.right .t-text {
  display: -webkit-box; -webkit-line-clamp: 5;
  -webkit-box-orient: vertical; overflow: hidden;
}
@media (max-width: 820px) {
  .t-card.left, .t-card.right { width: 200px; opacity: 0.4; }
  .t-card.center { width: 275px; }
  .t-glow { width: 360px; height: 360px; }
}
@media (max-width: 580px) {
  .t-stage { min-height: 360px; padding-top: 50px; overflow: hidden; }
  .t-card.left, .t-card.right { display: none; }
  .t-card.center { width: 88%; max-width: 300px; min-height: 310px; margin: 0 auto; }
  .t-heading { font-size: 1.3rem; }
  .t-arrow { font-size: 1.6rem; }
  .t-header { gap: 12px; }
}

/* ── BASAGI SERVICES RESPONSIVE CSS ── */
.basagi-services-section {
  background-color: #0e0e0e;
  padding: 7rem 6rem;
  font-family: 'Inter', sans-serif;
}
.basagi-services-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}
.basagi-services-card {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 2rem;
}
.basagi-services-card.reverse {
  flex-direction: row-reverse;
}
.basagi-services-img-panel {
  flex: 0 0 39%;
  min-height: 340px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0,0,0,0.5);
}
.basagi-services-content-panel {
  flex: 0 0 58%;
  background-color: #1e2d6b;
  border-radius: 20px;
  padding: 2.75rem 2.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 8px 40px rgba(0,0,0,0.4);
}

@media (max-width: 992px) {
  .basagi-services-section {
    padding: 5rem 2rem;
  }
  .basagi-services-card, .basagi-services-card.reverse {
    flex-direction: column;
  }
  .basagi-services-img-panel {
    flex: 0 0 auto;
    width: 100%;
    height: 260px;
    min-height: auto;
  }
  .basagi-services-content-panel {
    flex: 0 0 auto;
    width: 100%;
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 576px) {
  .basagi-services-section {
    padding: 4rem 1rem;
  }
}
`;

/* ─────────────────────────────────────────────────
   SECTION: NAVBAR
───────────────────────────────────────────────── */
function Navbar({ onSilverFernClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleSilverFernClick = (e) => {
    if (e) e.preventDefault();
    if (onSilverFernClick) {
      onSilverFernClick();
    } else {
      window.location.href = '/';
    }
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    setActiveSection(targetId || 'home');
    if (targetId) {
      window.history.pushState(null, '', '/basagi#' + targetId);
      const element = document.getElementById(targetId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.history.pushState(null, '', '/basagi#home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const sections = ['about', 'experiences', 'gallery', 'contact'];
    const observerOptions = { root: null, rootMargin: '-30% 0px -50% 0px', threshold: 0 };
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          window.history.replaceState(null, '', '/basagi#' + entry.target.id);
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveSection('home');
        if (window.location.hash !== '' && window.location.hash !== '#home') {
          window.history.replaceState(null, '', '/basagi#home');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => { observer.disconnect(); window.removeEventListener('scroll', handleScroll); };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={(e) => handleNavClick(e)} style={{ cursor: 'pointer' }}>
        <img src="/assets/logo.png" alt="Logo" className="navbar-logo" />
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '✕' : '☰'}
      </button>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={(e) => handleNavClick(e)}>
            Home
          </a>
        </li>
        <li>
          <a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'about')}>
            About Us
          </a>
        </li>
        <li>
          <a href="#experiences" className={activeSection === 'experiences' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'experiences')}>
            Services
          </a>
        </li>
        <li>
          <a href="#gallery" className={activeSection === 'gallery' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'gallery')}>
            Gallery
          </a>
        </li>
        <li>
          <a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'contact')}>
            Contact Us
          </a>
        </li>
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div className="silver-fern-redirect" onClick={handleSilverFernClick} title="Go to Silver Fern Website" style={{ cursor: 'pointer' }}>
          <img src="/sf-logo.png" alt="Silver Fern" className="basagi-sf-logo" />
        </div>

        <a href="#booking" className="nav-cta" onClick={(e) => handleNavClick(e, 'booking')}>
          Book Your Slot
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="cta-icon">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </a>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────────
   SECTION: HERO
───────────────────────────────────────────────── */
function Hero() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch('/api/home-content')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error(err));
  }, []);

  const title = (content && content.hero_title) ? content.hero_title : "Your Presence. Professionally Built.";
  const desc = (content && content.hero_desc) ? content.hero_desc : "BASAGI Studio is a creative media studio for podcasts, interviews, and digital marketing. We help creators and brands produce professional content that stands out.";

  const formatTitle = (text) => {
    if (!text) return '';
    if (text === "Your Presence. Professionally Built.") {
      return 'Your Presence.<br/><span class="highlight">Professionally Built.</span>';
    }
    const words = text.split(' ');
    if (words.length >= 4) {
      const mid = Math.ceil(words.length / 2);
      const line1 = words.slice(0, mid).join(' ');
      const line2 = words.slice(mid).join(' ');
      return `${line1}<br/><span class="highlight">${line2}</span>`;
    }
    return text.replace(/\.\s/g, '.<br/>');
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: formatTitle(title) }}></h1>
        <p className="hero-desc">{desc}</p>
        <div className="hero-btns">
          <a href="#booking" className="btn-primary" onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('booking');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>
            Book A Slot
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </a>
          <a href="#about" className="btn-ghost" onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('about');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>
            Watch Studio Tour
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '4px' }}>
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   SECTION: BUILT FOR CREATORS (About)
───────────────────────────────────────────────── */
function BuiltForCreators() {
  const features = [
    'Soundproof Recording Rooms',
    '4K Video Production',
    'Professional Lighting Setup',
    'Editing Suite',
    'High-Speed Internet',
    'Comfortable Creative Environment',
  ];

  return (
    <section id="about" className="creators-section">
      <div className="creators-container">
        <div className="creators-content">
          <span className="section-tag">About Us</span>
          <h2>Built for <span className="highlight">Creators</span></h2>
          <p>
            A modern creative studio designed for podcasters, creators, influencers,
            startups, and brands. BASAGI Studio combines professional production equipment with
            a premium creative atmosphere.
          </p>
          <h4>Studio Features</h4>
          <ul className="features-list">
            {features.map((f, i) => (
              <li key={i}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feature-check">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="creators-image-container">
          <div className="creators-image-glow"></div>
          <div className="creators-image-frame">
            <img src="/assets/about us.jpg" alt="Creator" className="creator-img" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   SECTION: STATS
───────────────────────────────────────────────── */
function Stats() {
  const stats = [
    { value: '150+', label: 'Projects Completed' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '50+', label: 'Happy Clients' },
    { value: '15+', label: 'Industry Awards' },
  ];

  return (
    <section className="stats-section">
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-card-glow"></div>
            <h3>{s.value}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   SECTION: EXPERIENCES (Services)
───────────────────────────────────────────────── */
function getImageUrl(src) {
  if (!src) return '/assets/booking_studio.png';
  if (src.startsWith('http')) return src;
  if (src.startsWith('/storage')) return `http://localhost:8000${src}`;
  return src;
}

function Experiences({ services = [] }) {
  const displayServices = Array.isArray(services) ? services : [];

  return (
    <section id="experiences" className="basagi-services-section">
      {/* Section Tag */}
      <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <span style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,0.07)',
          color: '#ccc',
          fontSize: '0.78rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '6px 18px',
          borderRadius: 999,
          border: '1px solid rgba(255,255,255,0.12)'
        }}>Our Services</span>
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          color: '#fff',
          marginBottom: '1.25rem',
          lineHeight: 1.15,
          letterSpacing: '-0.02em'
        }}>
          Experiences<br />Through Our Services
        </h2>
        <p style={{
          color: '#888',
          maxWidth: '620px',
          margin: '0 auto',
          fontSize: '0.95rem',
          lineHeight: 1.75
        }}>
          Discover professional production services designed to help creators, businesses, and brands produce
          impactful media content with confidence. From podcast recording and interview production to digital
          advertising and content creation, BASAGI Studio delivers quality, creativity, and results in every project.
        </p>
      </div>

      {/* Alternating Cards */}
      <div className="basagi-services-container">
        {displayServices.map((srv, idx) => {
          const title = srv.title || srv.name || 'Untitled';
          const description = srv.description || srv.desc || srv.short_description || '';
          const imgUrl = getImageUrl(srv.image || srv.icon || srv.image_url);
          const features = Array.isArray(srv.features) ? srv.features : [];
          const isImageRight = idx % 2 === 1;

          const ImagePanel = (
            <div className="basagi-services-img-panel">
              <img
                src={imgUrl}
                alt={title}
                onError={e => { e.target.src = '/assets/booking_studio.png'; }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          );

          const ContentPanel = (
            <div className="basagi-services-content-panel">
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.25 }}>{title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#c5cdf0', lineHeight: 1.75, marginBottom: features.length > 0 ? '1.5rem' : 0 }}>{description}</p>
              {features.length > 0 && (
                <>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>Includes</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {features.map((f, i) => (
                      <li key={i} style={{ fontSize: '0.85rem', color: '#d0d9f5', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ width: 6, height: 6, backgroundColor: '#7b93e8', borderRadius: '50%', flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          );

          return (
            <div key={idx} className={`basagi-services-card ${isImageRight ? 'reverse' : ''}`}>
              {ImagePanel}
              {ContentPanel}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   SECTION: BOOKING
───────────────────────────────────────────────── */
function Booking() {
  const [selectedService, setSelectedService] = useState('Interview Recording');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(10);
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const services = ['Podcast Production', 'Interview Recording', 'Digital Billboard Advertising'];
  const timeSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'];
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const handleConfirm = async (e) => {
    if (e) e.preventDefault();
    if (!name.trim() || !email.trim()) { setErrorMsg('Please fill in both your Name and Email Address.'); return; }
    const nameRegex = /^[a-zA-Z\s]{2,100}$/;
    if (!nameRegex.test(name.trim())) { setErrorMsg('Name must contain only letters and spaces (min 2 characters).'); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) { setErrorMsg('Please enter a valid email address.'); return; }
    if (phone.trim()) {
      const phoneRegex = /^[\d\s\+\-\(\)]{10,20}$/;
      if (!phoneRegex.test(phone.trim())) { setErrorMsg('Please enter a valid phone number (between 10 and 20 digits).'); return; }
    }
    setSubmitting(true); setErrorMsg(''); setBookingConfirmed(false);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim() || null, service_name: selectedService, booking_date: `June ${selectedDay}, 2025`, booking_time: selectedTime, platform: 'basagi' })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBookingConfirmed(true); setName(''); setEmail(''); setPhone('');
        setTimeout(() => setBookingConfirmed(false), 6000);
      } else {
        setErrorMsg(data.message || 'Failed to submit booking request. Please check inputs.');
      }
    } catch (err) {
      console.error('Error submitting booking:', err);
      setErrorMsg('Connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getBadgeText = (service) => {
    if (service === 'Podcast Production') return 'Podcast Setup';
    if (service === 'Digital Billboard Advertising') return 'Billboard Setup';
    return 'Interview Setup';
  };

  return (
    <section id="booking" className="booking-section">
      <div className="booking-header">
        <span className="section-tag">Booking</span>
        <h2 className="booking-title">Simple. Fast. Flexible</h2>
        <p className="booking-desc">
          Book your studio session for podcasts, interviews, media production, or digital advertising in just a few simple steps.
        </p>
      </div>

      <div className="booking-container">
        {/* Left Column: Dropdown and Image */}
        <div className="booking-left">
          <div className="custom-dropdown-container">
            <button className="dropdown-toggle-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <span>{selectedService}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`dropdown-arrow-icon ${dropdownOpen ? 'open' : ''}`}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {dropdownOpen && (
              <ul className="dropdown-options-list">
                {services.map((service, index) => (
                  <li key={index} className={`dropdown-option-item ${selectedService === service ? 'active' : ''}`}
                    onClick={() => { setSelectedService(service); setDropdownOpen(false); }}>
                    {service}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="booking-image-card">
            <img src="/assets/booking_studio.png" alt="Studio Setup Preview" className="booking-preview-img" />
            <div className="booking-image-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="badge-icon">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v1a7 7 0 0 1-14 0v-1"></path>
                <line x1="12" y1="19" x2="12" y2="22"></line>
              </svg>
              <span>{getBadgeText(selectedService)}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Calendar Widget + Confirm Booking */}
        <div className="booking-right">
          <div className="calendar-time-card">
            <div className="calendar-widget">
              <div className="calendar-month-header">
                <button className="cal-nav-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <span className="current-month-label">
                  June 2025
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '4px' }}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
                <button className="cal-nav-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>

              <div className="calendar-weekdays-grid">
                {weekdays.map((day, idx) => (
                  <div key={idx} className="weekday-label">{day}</div>
                ))}
              </div>

              <div className="calendar-days-grid">
                {calendarDays.map((day) => (
                  <button key={day} className={`calendar-day-btn ${selectedDay === day ? 'selected' : ''}`} onClick={() => setSelectedDay(day)}>
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="time-slots-list">
              {timeSlots.map((time, idx) => (
                <button key={idx} className={`time-slot-btn ${selectedTime === time ? 'selected' : ''}`} onClick={() => setSelectedTime(time)}>
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details Form Fields */}
          <div className="booking-fields-wrap">
            <div className="booking-fields-row">
              <div className="booking-field-col">
                <input type="text" className="booking-input" placeholder="Full Name *" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="booking-field-col">
                <input type="email" className="booking-input" placeholder="Email Address *" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>
            <div className="booking-field-col">
              <input type="tel" className="booking-input" placeholder="Phone Number (Optional)" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
          </div>

          {errorMsg && (
            <div style={{ color: '#ef4444', fontSize: '0.88rem', fontWeight: 600, marginTop: '4px' }}>
              ⚠️ {errorMsg}
            </div>
          )}

          <button className="confirm-booking-btn" onClick={handleConfirm} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Confirm Booking'}
          </button>

          {bookingConfirmed && (
            <div className="booking-success-toast">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="success-icon">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Booking request submitted! We will contact you soon.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   SECTION: GALLERY
───────────────────────────────────────────────── */
function Gallery({ items = [] }) {
  const getImageSrc = (item) => {
    if (item.image_url) return item.image_url;
    if (item.image && typeof item.image === 'object' && item.image.file_path) return item.image.file_path;
    if (item.image && typeof item.image === 'string') return item.image;
    if (item.src) return item.src;
    return '/assets/u1.png';
  };

  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-header">
        <span className="section-tag">Gallery</span>
        <h2 className="gallery-title">Moments <span className="highlight">From The Studio</span></h2>
      </div>

      <div className="gallery-grid">
        {items.map((item) => (
          <div key={item.id || item.title} className="gallery-card">
            <div className="gallery-image-container">
              <img src={getImageSrc(item)} alt={item.title} className="gallery-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {(item.title || item.caption) && (
              <div className="gallery-card-badge" style={{ flexDirection: 'column', alignItems: 'flex-start', borderRadius: '12px', padding: '0.6rem 1rem' }}>
                {item.title && <span className="gallery-badge-text" style={{ fontSize: '0.9rem' }}>{item.title}</span>}
                {item.caption && (
                  <span className="gallery-badge-caption" style={{ fontSize: '0.75rem', opacity: 0.7, fontWeight: 400, marginTop: '2px' }}>
                    {item.caption}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   SECTION: TESTIMONIALS
───────────────────────────────────────────────── */
const STATIC_TESTIMONIALS = [
  { id: 1, name: 'Hannah Schmitt', role: 'Lead Designer', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim.' },
  { id: 2, name: 'Hannah Schmitt', role: 'Co-Founder', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim.' },
  { id: 3, name: 'Hannah Schmitt', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim.' },
  { id: 4, name: 'Hannah Schmitt', role: 'Artist', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim.' },
  { id: 5, name: 'Hannah Schmitt', role: 'Producer', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim.' },
];

function Testimonials({ items }) {
  const displayItems = Array.isArray(items) && items.length > 0 ? items : STATIC_TESTIMONIALS;
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = useCallback((dir) => {
    if (animating) return;
    setAnimating(true);
    setActive((prev) => (prev + dir + displayItems.length) % displayItems.length);
    setTimeout(() => setAnimating(false), 450);
  }, [animating, displayItems.length]);

  useEffect(() => {
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
  }, [go]);

  const getCard = (offset) => {
    if (displayItems.length === 0) return null;
    return displayItems[(active + offset + displayItems.length) % displayItems.length];
  };

  const centerCard = getCard(0);
  if (!centerCard) return null;

  const slots = [
    { data: getCard(-1), pos: 'left' },
    { data: centerCard, pos: 'center' },
    { data: getCard(1), pos: 'right' },
  ].filter(s => s.data !== null);

  return (
    <section id="testimonials" className="t-section">
      <div className="t-header">
        <button className="t-arrow" onClick={() => go(-1)} aria-label="Previous">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h2 className="t-heading">What Our Clients Say About Us</h2>
        <button className="t-arrow" onClick={() => go(1)} aria-label="Next">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="t-dots">
        {displayItems.map((_, i) => (
          <button key={i} className={`t-dot${i === active ? ' active' : ''}`} onClick={() => setActive(i)} aria-label={`Testimonial ${i + 1}`} />
        ))}
      </div>

      <div className="t-stage">
        <div className="t-glow" />
        {slots.map(({ data, pos }) => (
          <div key={`${pos}-${data.id || data.name}`} className={`t-card ${pos}${animating ? ' animating' : ''}`}>
            {data.image && (
              <div className="t-avatar-wrap">
                <img src={data.image} alt={data.name} className="t-avatar" onError={e => { e.target.src = '/assets/a1.png'; }} />
              </div>
            )}
            <div className="t-card-body">
              <h3 className="t-name">{data.name}</h3>
              {data.role && <p className="t-role" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: 500, margin: '2px 0 10px' }}>{data.role}</p>}
              <div className="t-quote">❝</div>
              <p className="t-text">{data.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   SECTION: CONTACT
───────────────────────────────────────────────── */
function Contact() {
  const [contactInfo, setContactInfo] = useState({
    email: 'hello@basagistudio.com',
    phone: '+91 98765 43210',
    address: 'Thrissur, Kerala, India',
    map_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125492.38027732297!2d76.15545229606822!3d10.527641571408892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ee15ed074857%3A0xfa27e54531d0473!2sThrissur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1718960000000!5m2!1sen!2sin',
    brand_desc: ''
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    fetch('/api/contact?platform=basagi')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setContactInfo({
            email: data.email || 'hello@basagistudio.com',
            phone: data.phone || '+91 98765 43210',
            address: data.address || 'Thrissur, Kerala, India',
            map_url: data.map_url || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125492.38027732297!2d76.15545229606822!3d10.527641571408892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ee15ed074857%3A0xfa27e54531d0473!2sThrissur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1718960000000!5m2!1sen!2sin',
            brand_desc: data.brand_desc || ''
          });
        }
      })
      .catch(err => console.error('Failed to fetch contact details:', err));
  }, []);

  const openTerms = (e) => { e.preventDefault(); setShowTerms(true); };
  const closeTerms = useCallback(() => setShowTerms(false), []);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') closeTerms(); };
    if (showTerms) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showTerms, closeTerms]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(''); setSuccess(false);
    if (!name.trim() || !email.trim() || !message.trim()) { setErrorMsg('Please fill in all required fields (Name, Email, and Message).'); return; }
    const nameRegex = /^[a-zA-Z\s]{2,100}$/;
    if (!nameRegex.test(name.trim())) { setErrorMsg('Name must contain only letters and spaces (between 2 and 100 characters).'); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) { setErrorMsg('Please enter a valid email address.'); return; }
    if (phone.trim()) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phone.trim())) { setErrorMsg('Phone number must be exactly 10 digits.'); return; }
    }
    if (!agree) { setErrorMsg('You must agree to the Terms & Conditions.'); return; }
    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim() || null, subject: subject.trim() || null, message: message.trim(), platform: 'basagi' })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        try {
          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim() || 'N/A', subject: subject.trim() || 'Basagi Contact Form', message: message.trim(), platform: 'basagi' })
          });
        } catch (mailErr) {
          console.warn('Email notification failed, but message was saved:', mailErr);
        }
        setSuccess(true); setName(''); setEmail(''); setPhone(''); setSubject(''); setMessage(''); setAgree(false);
      } else {
        setErrorMsg(data.message || 'Failed to submit contact request. Please check inputs.');
      }
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setErrorMsg('A connection error occurred. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const getMapSrc = () => {
    const mapUrl = contactInfo.map_url;
    if (mapUrl && mapUrl.trim()) {
      if (mapUrl.includes('<iframe')) {
        const match = mapUrl.match(/src="([^"]+)"/);
        return match && match[1] ? match[1] : mapUrl.trim();
      }
      return mapUrl.trim();
    }
    return `https://maps.google.com/maps?q=${encodeURIComponent(contactInfo.address.replace(/\n/g, ' '))}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-glow-overlay"></div>
      <div className="contact-section-container">
        <div className="contact-header">
          <span className="section-tag">Get in touch</span>
          <h2 className="contact-title">Let's Create Something <span className="highlight">Great</span></h2>
          <p className="contact-desc">
            Have a project in mind, want to book a studio tour, or discuss digital billboard rates?
            Drop us a message, and our team will get back to you shortly.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Form */}
          <div className="contact-form-card">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input type="text" placeholder="Your Name *" value={name} onChange={e => setName(e.target.value)} className="contact-input" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input type="email" placeholder="Email Address *" value={email} onChange={e => setEmail(e.target.value)} className="contact-input" required />
                </div>
                <div className="form-group">
                  <input type="tel" placeholder="Phone Number (10 digits)" value={phone} onChange={e => setPhone(e.target.value)} className="contact-input" />
                </div>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} className="contact-input" />
              </div>
              <div className="form-group">
                <textarea placeholder="Tell us about your project or inquiry... *" rows="5" value={message} onChange={e => setMessage(e.target.value)} className="contact-textarea" required></textarea>
              </div>
              <div className="form-checkbox-group">
                <input type="checkbox" id="basagi-agree" checked={agree} onChange={e => setAgree(e.target.checked)} className="contact-checkbox" />
                <label htmlFor="basagi-agree" className="contact-checkbox-label">
                  I accept the{' '}
                  <a href="#terms" onClick={openTerms} className="contact-terms-link">Terms & Conditions</a>
                </label>
              </div>
              {errorMsg && <div className="contact-error-msg"><span className="error-icon">⚠️</span> {errorMsg}</div>}
              {success && <div className="contact-success-msg"><span className="success-icon">✓</span> Your message was sent successfully!</div>}
              <button type="submit" disabled={submitting} className="contact-submit-btn">
                {submitting ? 'Sending...' : 'Send Message'}
                {!submitting && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="submit-btn-arrow">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Contact Details + Map */}
          <div className="contact-info-panel">
            <div className="contact-info-cards">
              <div className="info-card">
                <div className="info-card-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="info-card-details">
                  <h4>Email Us</h4>
                  <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                </div>
              </div>
              <div className="info-card">
                <div className="info-card-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div className="info-card-details">
                  <h4>Call Us</h4>
                  <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
                </div>
              </div>
              <div className="info-card">
                <div className="info-card-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="info-card-details">
                  <h4>Visit Us</h4>
                  <p>{contactInfo.address}</p>
                </div>
              </div>
            </div>
            <div className="contact-map-wrapper">
              <iframe src={getMapSrc()} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Basagi Studio Location Map"></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Conditions Modal */}
      {showTerms && (
        <div className="tc-overlay" onClick={closeTerms} role="dialog" aria-modal="true" aria-labelledby="basagi-tc-title">
          <div className="tc-modal" onClick={e => e.stopPropagation()} style={{ borderColor: 'rgba(245, 197, 24, 0.3)' }}>
            <div className="tc-modal-header" style={{ borderBottomColor: 'rgba(255, 255, 255, 0.08)' }}>
              <h2 id="basagi-tc-title" className="tc-modal-title" style={{ color: '#f5c518' }}>Terms &amp; Conditions</h2>
              <button className="tc-close-btn" onClick={closeTerms} aria-label="Close Terms & Conditions">✕</button>
            </div>
            <div className="tc-modal-body">
              <div className="tc-text-content">
                <p className="tc-intro-text">Welcome to BASAGI Studio. By accessing our studio services, requesting bookings, or submitting queries via this contact form, you agree to comply with and be bound by the following terms and conditions.</p>
                <div className="tc-sections">
                  <div className="tc-section">
                    <h3 className="tc-section-title">1. Booking and Services</h3>
                    <p className="tc-section-body">All studio bookings (podcast recording, interview production, videography, or digital billboard slots) are subject to availability and confirmation by the BASAGI team. Submitting an inquiry through this form does not guarantee a slot.</p>
                  </div>
                  <div className="tc-section">
                    <h3 className="tc-section-title">2. Use of Information</h3>
                    <p className="tc-section-body">We collect name, email, and phone numbers via this form solely to contact you regarding your inquiries. We respect your privacy and will not share your personal credentials or project briefs with third-party marketers without your consent.</p>
                  </div>
                  <div className="tc-section">
                    <h3 className="tc-section-title">3. Content Ownership</h3>
                    <p className="tc-section-body">For creators and brands utilizing our recording suites, the creative ownership of the produced audio/video material remains entirely yours, subject to the specific service agreements signed prior to production.</p>
                  </div>
                  <div className="tc-section">
                    <h3 className="tc-section-title">4. Changes and Cancellations</h3>
                    <p className="tc-section-body">Cancellation policies for confirmed studio booking slots will be outlined in your invoice and booking agreements. Please inform us at least 24 hours in advance of any changes to scheduled recording sessions.</p>
                  </div>
                </div>
              </div>
              <div className="tc-modal-footer" style={{ borderTopColor: 'rgba(255, 255, 255, 0.08)' }}>
                <p className="tc-footer-note">By checking the agreement box on the contact form, you acknowledge that you have read and understood these terms.</p>
                <button className="tc-accept-btn" onClick={closeTerms} style={{ backgroundColor: '#f5c518', color: '#05050a', fontWeight: 'bold' }}>I Accept</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ─────────────────────────────────────────────────
   SECTION: FOOTER
───────────────────────────────────────────────── */
function Footer({ onSilverFernClick }) {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    fetch('/api/contact?platform=basagi')
      .then(res => res.json())
      .then(data => setContact(data))
      .catch(err => console.error(err));
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="site-footer">
      <div className="footer-bg-circles">
        <div className="bg-circle yellow-circle"></div>
        <div className="bg-circle blue-circle"></div>
        <div className="bg-circle purple-circle"></div>
      </div>

      <div className="footer-content">
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <img src="/assets/logo.png" alt={contact?.website_name || "BASAGI"} />
          </div>
          <p className="brand-desc">
            {contact?.brand_desc || "Professional podcast production, interview recording, media creation, and digital billboard advertising for creators, influencers, startups, and brands."}
          </p>
          <a href={`mailto:${contact?.email || 'hello@basagistudio.com'}`} className="footer-email-arrow-link">
            {contact?.email || 'hello@basagistudio.com'} <span className="arrow-symbol">→</span>
          </a>
        </div>

        <div className="footer-col links-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>About Us</a></li>
            <li><a href="#experiences" onClick={(e) => { e.preventDefault(); document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' }); }}>Services</a></li>
            <li><a href="#gallery" onClick={(e) => { e.preventDefault(); document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' }); }}>Gallery</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-col services-col">
          <h4 className="footer-heading">Services</h4>
          <ul className="footer-links">
            <li><a href="#podcast">Podcast Production</a></li>
            <li><a href="#interview">Interview Recording</a></li>
            <li><a href="#billboard">Digital Billboard Advertising</a></li>
            <li><a href="#video">Video Production</a></li>
            <li><a href="#audio">Audio Editing</a></li>
            <li><a href="#content">Content Creation</a></li>
          </ul>
        </div>

        <div className="footer-col contact-col">
          <h4 className="footer-heading">Contact Information</h4>
          <ul className="footer-links contact-info">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span>{contact?.email || 'hello@basagistudio.com'}</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span>{contact?.phone || '+91 98765 43210'}</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>{contact?.address || 'Thrissur, Kerala, India'}</span>
            </li>
          </ul>
          <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Scroll to top">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────
   MAIN: BasagiApp  (one-page, section-wise)
───────────────────────────────────────────────── */
function BasagiApp({ gallery: initialGallery, services: initialServices, testimonials: initialTestimonials, onSilverFernClick }) {
  const [gallery, setGallery] = useState(initialGallery || []);
  const [services, setServices] = useState(initialServices || []);
  const [testimonials, setTestimonials] = useState(initialTestimonials || []);

  useEffect(() => {
    fetch('/api/gallery?type=basagi')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setGallery(data); })
      .catch(err => console.error('Error fetching gallery:', err));

    fetch('/api/services?type=basagi')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setServices(data); })
      .catch(err => console.error('Error fetching services:', err));

    fetch('/api/testimonials?platform=basagi')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setTestimonials(data); })
      .catch(err => console.error('Error fetching testimonials:', err));
  }, []);

  return (
    <div className="app-container">
      {/* Inject Testimonials CSS */}
      <style>{TESTIMONIALS_CSS}</style>

      {/* ── Sections ── */}
      <Navbar onSilverFernClick={onSilverFernClick} />
      <Hero />
      <BuiltForCreators />
      <Stats />
      <Experiences services={services} />
      <Booking />
      <Gallery items={gallery} />
      <Testimonials items={testimonials} />
      <Contact />
      <Footer onSilverFernClick={onSilverFernClick} />
    </div>
  );
}

export default BasagiApp;
