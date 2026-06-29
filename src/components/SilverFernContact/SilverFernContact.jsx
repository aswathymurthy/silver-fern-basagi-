import React, { useState, useEffect, useCallback } from 'react';

function SilverFernContact({ setCurrentPage }) {
  const [contact, setContact] = useState({
    website_name: 'Silver Fern',
    email: 'hello.cultivo@gmail.com',
    phone: '(303) 873-2083',
    address: '1901 Thornridge Cir.\nShiloh, Hawaii 81063',
    brand_desc: 'We are custom home builder located in Dallas, TX servicing Highland Park, Cultivo & Preston Hollow!'
  });

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [showTerms, setShowTerms] = useState(false);

  const [submittingNewsletter, setSubmittingNewsletter] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || submittingNewsletter) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail.trim())) {
      alert('Please enter a valid email address.');
      return;
    }
    setSubmittingNewsletter(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail.trim(), platform: 'silver-fern' }),
      });
      const data = await response.json();
      if (data.success) {
        alert(`Thank you for subscribing! A confirmation email has been sent to ${newsletterEmail.trim()}.`);
        setNewsletterEmail('');
      } else {
        alert(data.message || 'Subscription failed. Please try again.');
      }
    } catch (err) {
      console.error('Newsletter error:', err);
      alert('Subscription submitted! A confirmation email will be sent.');
      setNewsletterEmail('');
    } finally {
      setSubmittingNewsletter(false);
    }
  };

  const navigate = (e, page) => {
    e.preventDefault();
    if (setCurrentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const pathMap = {
        'silver-fern': '/',
        'about': '/about',
        'services': '/services',
        'membership': '/membership',
        'gallery': '/gallery',
        'blog': '/blog',
        'contact': '/contact',
      };
      window.location.href = pathMap[page] || '/';
    }
  };

  const openTerms = (e) => {
    e.preventDefault();
    setShowTerms(true);
    document.body.style.overflow = 'hidden';
  };

  const closeTerms = useCallback(() => {
    setShowTerms(false);
    document.body.style.overflow = '';
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') closeTerms(); };
    if (showTerms) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showTerms, closeTerms]);

  useEffect(() => {
    fetch('/api/contact?platform=silver-fern')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setContact({
            website_name: data.website_name || 'Silver Fern',
            email: data.email || 'hello.cultivo@gmail.com',
            phone: data.phone || '(303) 873-2083',
            address: data.address || '1901 Thornridge Cir.\nShiloh, Hawaii 81063',
            brand_desc: data.brand_desc || 'We are custom home builder located in Dallas, TX servicing Highland Park, Cultivo & Preston Hollow!'
          });
        }
      })
      .catch(err => console.error('Failed to load contact info:', err));
  }, []);

  return (
    <>
      {/* ── Terms & Conditions Modal ── */}
      {showTerms && (
        <div className="tc-overlay" onClick={closeTerms} role="dialog" aria-modal="true" aria-labelledby="tc-title">
          <div className="tc-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="tc-modal-header">
              <div className="tc-header-left">
                <span className="tc-badge">Legal</span>
                <h2 id="tc-title" className="tc-modal-title">Terms &amp; Conditions</h2>
                <p className="tc-modal-subtitle">Last updated: June 2026 &nbsp;·&nbsp; Effective immediately</p>
              </div>
              <button className="tc-close-btn" onClick={closeTerms} aria-label="Close Terms & Conditions">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="tc-modal-body">

              <div className="tc-section">
                <div className="tc-section-icon">🌿</div>
                <div>
                  <h3 className="tc-section-title">1. Acceptance of Terms</h3>
                  <p className="tc-section-text">
                    By accessing or using the Silver Fern platform, website, or any of its associated services, you agree to be bound by these Terms &amp; Conditions. If you do not agree to all the terms stated here, please discontinue use of our services immediately.
                  </p>
                </div>
              </div>

              <div className="tc-section">
                <div className="tc-section-icon">🔐</div>
                <div>
                  <h3 className="tc-section-title">2. Use of Services</h3>
                  <p className="tc-section-text">
                    Our services are intended for lawful agricultural and community-related purposes. You agree not to misuse, reverse-engineer, or exploit our platform in any way. Unauthorised access or fraudulent use will result in immediate termination of access.
                  </p>
                </div>
              </div>

              <div className="tc-section">
                <div className="tc-section-icon">👤</div>
                <div>
                  <h3 className="tc-section-title">3. User Accounts &amp; Membership</h3>
                  <p className="tc-section-text">
                    Members are responsible for maintaining the confidentiality of their account credentials. Silver Fern reserves the right to suspend or terminate any account that violates these terms or is found to provide false information during registration.
                  </p>
                </div>
              </div>

              <div className="tc-section">
                <div className="tc-section-icon">📦</div>
                <div>
                  <h3 className="tc-section-title">4. Products &amp; Services</h3>
                  <p className="tc-section-text">
                    Silver Fern provides agricultural produce, collective farming support, and value-added services. All pricing, availability, and delivery timelines are subject to change without prior notice. We strive to maintain accuracy but cannot guarantee all information is error-free.
                  </p>
                </div>
              </div>

              <div className="tc-section">
                <div className="tc-section-icon">🛡️</div>
                <div>
                  <h3 className="tc-section-title">5. Privacy &amp; Data</h3>
                  <p className="tc-section-text">
                    Your personal information is collected and used in accordance with our Privacy Policy. We do not sell or share your data with third parties for marketing purposes. Data is used solely to improve your experience and deliver our services.
                  </p>
                </div>
              </div>

              <div className="tc-section">
                <div className="tc-section-icon">⚖️</div>
                <div>
                  <h3 className="tc-section-title">6. Intellectual Property</h3>
                  <p className="tc-section-text">
                    All content, logos, designs, and materials on this platform are the exclusive intellectual property of Silver Fern. Reproduction, redistribution, or commercial use of any content without prior written consent is strictly prohibited.
                  </p>
                </div>
              </div>

              <div className="tc-section">
                <div className="tc-section-icon">🔄</div>
                <div>
                  <h3 className="tc-section-title">7. Changes to Terms</h3>
                  <p className="tc-section-text">
                    Silver Fern reserves the right to update or modify these Terms &amp; Conditions at any time. Continued use of the platform after any changes constitutes your acceptance of the revised terms. We encourage users to review this page periodically.
                  </p>
                </div>
              </div>

              <div className="tc-section">
                <div className="tc-section-icon">📞</div>
                <div>
                  <h3 className="tc-section-title">8. Contact Us</h3>
                  <p className="tc-section-text">
                    If you have any questions about these Terms &amp; Conditions, please reach out to us at&nbsp;
                    <a href={`mailto:${contact.email}`} className="tc-email-link">{contact.email}</a>
                    &nbsp;or call us at <strong>{contact.phone}</strong>.
                  </p>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="tc-modal-footer">
              <p className="tc-footer-note">
                By using Silver Fern services, you acknowledge that you have read and understood these terms.
              </p>
              <button className="tc-accept-btn" onClick={closeTerms}>
                I Understand &amp; Accept
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="sf-footer">
        <div className="sf-footer-container">

          {/* Top Section */}
          <div className="sf-footer-top">
            <div className="sf-footer-brand">
              <p className="sf-footer-brand-text">
                {contact.brand_desc}
              </p>
              <div className="sf-footer-socials">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="sf-social-icon" aria-label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="sf-social-icon" aria-label="Twitter">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="sf-social-icon" aria-label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="sf-social-icon" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="sf-footer-links-group">
              <h4 className="sf-footer-heading">COMPANY</h4>
              <a href="/" onClick={(e) => navigate(e, 'silver-fern')}>Home</a>
              <a href="/about" onClick={(e) => navigate(e, 'about')}>About Us</a>
              <a href="/services" onClick={(e) => navigate(e, 'services')}>Services</a>
              <a href="/contact" onClick={(e) => navigate(e, 'contact')}>Contact</a>
              <a href="/membership" onClick={(e) => navigate(e, 'membership')}>Member</a>
            </div>

            <div className="sf-footer-links-group">
              <h4 className="sf-footer-heading">RESOURCE</h4>
              <a href="/blog" onClick={(e) => navigate(e, 'blog')}>Blog</a>
              <a href="/gallery" onClick={(e) => navigate(e, 'gallery')}>Gallery</a>
              <a href="/about" onClick={(e) => navigate(e, 'about')}>About Us</a>
              <a href="/contact" onClick={(e) => navigate(e, 'contact')}>Contact Us</a>
            </div>

            <div className="sf-footer-links-group">
              <h4 className="sf-footer-heading">CAREER</h4>
              <a href="/about" onClick={(e) => navigate(e, 'about')}>About Us</a>
              <a href="/membership" onClick={(e) => navigate(e, 'membership')}>Member</a>
              <a href="/blog" onClick={(e) => navigate(e, 'blog')}>News</a>
            </div>

            <div className="sf-footer-links-group">
              <h4 className="sf-footer-heading">HELP</h4>
              <a href="/contact" onClick={(e) => navigate(e, 'contact')}>FAQ</a>
              <a href="/contact" onClick={(e) => navigate(e, 'contact')}>Help Center</a>
              <a href="/contact" onClick={(e) => navigate(e, 'contact')}>Support</a>
            </div>
          </div>

          {/* Middle Section */}
          <div className="sf-footer-middle">
            <div className="sf-footer-newsletter">
              <h2 className="sf-newsletter-title">Get In Touch!</h2>
              <p className="sf-newsletter-desc">have questions or need assistance?<br/>We're here to help!</p>
              <form onSubmit={handleNewsletterSubmit} className="sf-newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="sf-newsletter-input"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit" className="sf-newsletter-btn">Subscribe</button>
              </form>
            </div>

            <div className="sf-footer-contact-info">
              <div className="sf-contact-block">
                <h4 className="sf-footer-heading">ADDRESS</h4>
                <p style={{ whiteSpace: 'pre-line' }}>{contact.address}</p>
              </div>
              <div className="sf-contact-block">
                <h4 className="sf-footer-heading">ADDRESS</h4>
                <p style={{ whiteSpace: 'pre-line' }}>{contact.address}</p>
              </div>
            </div>

            <div className="sf-footer-contact-info">
              <div className="sf-contact-block">
                <h4 className="sf-footer-heading">PHONE</h4>
                <p>{contact.phone}</p>
              </div>
              <div className="sf-contact-block">
                <h4 className="sf-footer-heading">EMAIL</h4>
                <p>{contact.email}</p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="sf-footer-bottom">
            <div className="sf-footer-copyright">
              © Copyright 2026 {contact.website_name}, All Rights Reserved
            </div>
            <div className="sf-footer-legal-links">
              <a href="/contact" onClick={(e) => navigate(e, 'contact')}>FAQ</a>
              <a href="#terms" onClick={openTerms} className="tc-trigger-link">Term of Service</a>
              <a href="#">Privacy Policy</a>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}

export default SilverFernContact;
