import React, { useState, useEffect } from 'react';

function SilverFernNavbar({ onBasagiClick, onAdminClick, onAboutClick, onHomeClick, onServicesClick, onMembershipClick, onBlogClick, onGalleryClick, onContactClick }) {
  const [activePage, setActivePage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const determineActivePage = () => {
      const path = window.location.pathname.replace(/^\/|\/$/g, '');
      if (path === '' || path === 'home') {
        setActivePage('home');
      } else {
        setActivePage(path);
      }
    };
    
    determineActivePage();
    window.addEventListener('popstate', determineActivePage);
    return () => window.removeEventListener('popstate', determineActivePage);
  }, []);

  const handleLinkClick = (e, callback, pageName) => {
    e.preventDefault();
    setActivePage(pageName);
    setMenuOpen(false);
    if (callback) callback();
  };

  return (
    <nav className="sf-navbar">
      <div className="sf-logo-container" onClick={(e) => handleLinkClick(e, onHomeClick, 'home')} style={{ cursor: 'pointer' }}>
        <div>
          <img src="/sf-logo.png" alt="Logo" className="sf-logo-img" style={{ height: '80px', maxHeight: '80px', objectFit: 'contain', display: 'block' }} onError={(e) => { e.target.src = './assets/logo1.png'; }} />
        </div>
      </div>

      <div className={`sf-nav-pill ${menuOpen ? 'sf-nav-open' : ''}`}>
        <a href="/" className={`sf-nav-link ${activePage === 'home' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, onHomeClick, 'home')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          Home
        </a>
        <a href="/about" className={`sf-nav-link ${activePage === 'about' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, onAboutClick, 'about')}>About Us</a>
        <a href="/services" className={`sf-nav-link ${activePage === 'services' || activePage === 'service-details' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, onServicesClick, 'services')}>Services</a>
        <a href="/membership" className={`sf-nav-link ${activePage === 'membership' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, onMembershipClick, 'membership')}>Member</a>
        <a href="/gallery" className={`sf-nav-link ${activePage === 'gallery' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, onGalleryClick, 'gallery')}>Gallery</a>
        <a href="/blog" className={`sf-nav-link ${activePage === 'blog' || activePage === 'blog-detail' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, onBlogClick, 'blog')}>Blog</a>
        <a href="/contact" className={`sf-nav-link ${activePage === 'contact' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, onContactClick, 'contact')}>Contact Us</a>
      </div>

      <div className="sf-nav-right">
        <div className="basagi-redirect" onClick={onBasagiClick} style={{ cursor: 'pointer' }}>
          <img src="/assets/logo.png" alt="BASAGI" className="sf-basagi-logo" />
        </div>
        <button className="sf-book-btn">Book Your Slot</button>
        <button
          className="sf-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}

export default SilverFernNavbar;
