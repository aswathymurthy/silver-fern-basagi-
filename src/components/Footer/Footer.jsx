import React, { useState, useEffect } from 'react';

function Footer() {
  const [quickLinks, setQuickLinks] = useState([]);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    fetch('/api/quick-links')
      .then(res => res.json())
      .then(data => setQuickLinks(data))
      .catch(err => console.error('Failed to load quick links', err));
      
    fetch('/api/contact?platform=basagi')
      .then(res => res.json())
      .then(data => setContact(data))
      .catch(err => console.error(err));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
  )
}


export default Footer;
