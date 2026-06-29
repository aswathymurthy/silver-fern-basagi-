import React, { useState, useEffect } from 'react';

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
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.history.pushState(null, '', '/basagi#home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const sections = ['about', 'experiences', 'gallery', 'contact'];

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

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

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={(e) => handleNavClick(e)} style={{ cursor: 'pointer' }}>
        <img src="/assets/logo.png" alt="Logo" className="navbar-logo" />
      </div>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <a
            href="#home"
            className={activeSection === 'home' ? 'active' : ''}
            onClick={(e) => handleNavClick(e)}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            className={activeSection === 'about' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, 'about')}
          >
            About Us
          </a>
        </li>
        <li>
          <a
            href="#experiences"
            className={activeSection === 'experiences' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, 'experiences')}
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#gallery"
            className={activeSection === 'gallery' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, 'gallery')}
          >
            Gallery
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className={activeSection === 'contact' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            Contact Us
          </a>
        </li>
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
        <div className="silver-fern-redirect" onClick={handleSilverFernClick} title="Go to Silver Fern Website" style={{ cursor: 'pointer' }}>
          <img src="/sf-logo.png" alt="Silver Fern" className="basagi-sf-logo" />
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>

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

export default Navbar;
