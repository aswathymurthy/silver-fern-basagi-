import React, { useState, useEffect, useCallback } from 'react';
import SilverFernNavbar from '../../components/SilverFernNavbar/SilverFernNavbar';
import SilverFernContact from '../../components/SilverFernContact/SilverFernContact';

function ContactPage({ setCurrentPage }) {
  const [contact, setContact] = useState({
    email: 'info@silverfern.com',
    phone: '+91 123 456 7890',
    address: '123 Green Road, Kerala, India',
    map_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000000!2d76.0840!3d10.5276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b081214a1443651%3A0x296b010079017511!2sKerala!5e0!3m2!1sen!2sin!4v1718960000000!5m2!1sen!2sin'
  });

  const [showTerms, setShowTerms] = useState(false);

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
            email: data.email || 'info@silverfern.com',
            phone: data.phone || '+91 123 456 7890',
            address: data.address || '123 Green Road, Kerala, India',
            map_url: data.map_url || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000000!2d76.0840!3d10.5276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b081214a1443651%3A0x296b010079017511!2sKerala!5e0!3m2!1sen!2sin!4v1718960000000!5m2!1sen!2sin'
          });
        }
      })
      .catch(err => console.error('Failed to load contact info:', err));
  }, []);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [agree, setAgree] = useState(false);

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please fill in all required fields (First Name, Email, and Message).');
      return;
    }

    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!nameRegex.test(firstName.trim())) {
      setErrorMsg('First Name must contain only letters and spaces (min 2 characters).');
      return;
    }
    if (lastName.trim() && !nameRegex.test(lastName.trim())) {
      setErrorMsg('Last Name must contain only letters and spaces (min 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (phone.trim()) {
      const phoneRegex = /^[\d\s\+\-\(\)]{10,20}$/;
      if (!phoneRegex.test(phone.trim())) {
        setErrorMsg('Please enter a valid phone number (between 10 and 20 digits).');
        return;
      }
    }

    if (!agree) {
      setErrorMsg('You must agree to the Terms & Conditions.');
      return;
    }

    setSending(true);
    setErrorMsg('');
    setSuccess(false);

    const name = `${firstName} ${lastName}`.trim();

    // Step 1: Save to database
    try {
      const dbResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          message: message,
          platform: 'silver-fern'
        })
      });

      if (!dbResponse.ok) {
        const errorData = await dbResponse.json();
        throw new Error(errorData.message || 'Failed to save message on server.');
      }
    } catch (dbErr) {
      console.error('Database save error:', dbErr);
      setErrorMsg('Failed to save message on server. Please try again.');
      setSending(false);
      return;
    }

    // Step 2: Send email notification via Gmail SMTP (App Password)
    try {
      const mailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone || 'N/A',
          subject: 'Silver Fern Contact Form',
          message: message,
          platform: 'silver-fern'
        })
      });

      if (mailResponse.ok) {
        setSuccess(true);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setAgree(false);
      } else {
        // Email sending failed but DB was saved — still show success with warning
        console.warn('Email notification failed, but message was saved.');
        setSuccess(true);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setAgree(false);
      }
    } catch (err) {
      console.error('Email send error:', err);
      // DB already saved — show success anyway
      setSuccess(true);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setAgree(false);
    } finally {
      setSending(false);
    }
  };


  return (
    <div className="silver-fern-app sf-contact-page-container">
      <SilverFernNavbar
        onBasagiClick={() => setCurrentPage('basagi')}
        onAdminClick={() => setCurrentPage('admin')}
        onAboutClick={() => setCurrentPage('about')}
        onHomeClick={() => setCurrentPage('silver-fern')}
        onServicesClick={() => setCurrentPage('services')}
        onMembershipClick={() => setCurrentPage('membership')}
        onBlogClick={() => setCurrentPage('blog')}
        onGalleryClick={() => setCurrentPage('gallery')}
        onContactClick={() => setCurrentPage('contact')}
      />
      <div className="sf-services-page-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#1f2937', marginTop: '1rem' }}>Contact Us</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', backgroundColor: '#fefce8', borderRadius: '24px', overflow: 'hidden' }}>

          {/* Left Form Side */}
          <div style={{ padding: '3rem' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#166534', marginBottom: '2rem' }}>Get In Touch</h3>
            <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #fcd34d', backgroundColor: '#fffbeb', color: '#78350f', outline: 'none' }}
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #fcd34d', backgroundColor: '#fffbeb', color: '#78350f', outline: 'none' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #fcd34d', backgroundColor: '#fffbeb', color: '#78350f', outline: 'none' }}
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #fcd34d', backgroundColor: '#fffbeb', color: '#78350f', outline: 'none' }}
                  />
                </div>
              </div>
              <div>
                <textarea
                  placeholder="How Can We Help?"
                  rows="6"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #fcd34d', backgroundColor: '#fffbeb', color: '#78350f', outline: 'none', resize: 'vertical' }}
                  required
                ></textarea>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="agree"
                  checked={agree}
                  onChange={e => setAgree(e.target.checked)}
                  style={{ marginTop: '0.25rem' }}
                />
                <label htmlFor="agree" style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                  I understand that by submitting this form I agree to the{' '}
                  <a href="#terms" onClick={openTerms} style={{ color: '#166534', fontWeight: 600 }}>
                    Terms & Conditions
                  </a>.
                </label>
              </div>

              {errorMsg && (
                <div style={{ color: '#dc2626', fontSize: '0.9rem', fontWeight: 600 }}>
                  ⚠️ {errorMsg}
                </div>
              )}

              {success && (
                <div style={{ color: '#166534', fontSize: '0.9rem', fontWeight: 600 }}>
                  ✅ Message sent successfully! Thank you for getting in touch.
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                style={{
                  backgroundColor: '#166534',
                  color: 'white',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  cursor: sending ? 'default' : 'pointer',
                  width: 'fit-content',
                  minWidth: '150px',
                  opacity: sending ? 0.7 : 1
                }}
              >
                {sending ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          </div>

          {/* Right Info Side */}
          <div style={{ backgroundColor: '#166534', color: 'white', padding: '3rem', position: 'relative' }}>
            <div style={{ marginBottom: '2rem' }}>
              {(() => {
                let mapSrc = '';
                if (contact.map_url && contact.map_url.trim()) {
                  if (contact.map_url.includes('<iframe')) {
                    const match = contact.map_url.match(/src="([^"]+)"/);
                    if (match && match[1]) {
                      mapSrc = match[1];
                    } else {
                      mapSrc = contact.map_url.trim();
                    }
                  } else {
                    mapSrc = contact.map_url.trim();
                  }
                } else if (contact.address) {
                  mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(contact.address.replace(/\n/g, ' '))}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
                }

                if (!mapSrc) {
                  return (
                    <div style={{ height: 170, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                      No address or map URL configured
                    </div>
                  );
                }

                return (
                  <iframe
                    src={mapSrc}
                    width="100%"
                    height="170"
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                );
              })()}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '24px', height: '24px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>📞</div>
                <span style={{ fontSize: '0.9rem' }}><a href={`tel:${contact.phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>{contact.phone}</a></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '24px', height: '24px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>✉️</div>
                <span style={{ fontSize: '0.9rem' }}><a href={`mailto:${contact.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{contact.email}</a></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '24px', height: '24px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>📍</div>
                <span style={{ fontSize: '0.9rem', whiteSpace: 'pre-line' }}>{contact.address}</span>
              </div>
            </div>

            <div style={{ marginTop: '4rem' }}>
              <p style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '0.5rem' }}>Connect with us</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {['f', 't', 'in', 'ig'].map((icon, idx) => (
                  <div key={idx} style={{ width: '32px', height: '32px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>{icon}</div>
                ))}
              </div>
            </div>

            {/* Watermark Icon */}
            <div style={{ position: 'absolute', right: '2rem', bottom: '2rem', opacity: 0.1 }}>
              <svg width="100" height="100" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 22h20L12 2z" /></svg>
            </div>
          </div>

        </div>
      </div>

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

      <SilverFernContact setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default ContactPage;
