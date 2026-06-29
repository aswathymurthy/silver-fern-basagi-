import React, { useState, useEffect, useCallback } from 'react';

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

  const openTerms = (e) => {
    e.preventDefault();
    setShowTerms(true);
  };

  const closeTerms = useCallback(() => {
    setShowTerms(false);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeTerms();
    };
    if (showTerms) {
      window.addEventListener('keydown', handleKey);
    }
    return () => window.removeEventListener('keydown', handleKey);
  }, [showTerms, closeTerms]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccess(false);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    const nameRegex = /^[a-zA-Z\s]{2,100}$/;
    if (!nameRegex.test(name.trim())) {
      setErrorMsg('Name must contain only letters and spaces (between 2 and 100 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (phone.trim()) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phone.trim())) {
        setErrorMsg('Phone number must be exactly 10 digits.');
        return;
      }
    }

    if (!agree) {
      setErrorMsg('You must agree to the Terms & Conditions.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          subject: subject.trim() || null,
          message: message.trim(),
          platform: 'basagi'
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        // Send email notification via Gmail SMTP (App Password)
        try {
          await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              name: name.trim(),
              email: email.trim(),
              phone: phone.trim() || 'N/A',
              subject: subject.trim() || 'Basagi Contact Form',
              message: message.trim(),
              platform: 'basagi'
            })
          });
        } catch (mailErr) {
          console.warn('Email notification failed, but message was saved:', mailErr);
        }

        setSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
        setAgree(false);
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
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="contact-input"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="contact-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    placeholder="Phone Number (10 digits)"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="contact-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="contact-input"
                />
              </div>

              <div className="form-group">
                <textarea
                  placeholder="Tell us about your project or inquiry... *"
                  rows="5"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="contact-textarea"
                  required
                ></textarea>
              </div>

              <div className="form-checkbox-group">
                <input
                  type="checkbox"
                  id="basagi-agree"
                  checked={agree}
                  onChange={e => setAgree(e.target.checked)}
                  className="contact-checkbox"
                />
                <label htmlFor="basagi-agree" className="contact-checkbox-label">
                  I accept the{' '}
                  <a href="#terms" onClick={openTerms} className="contact-terms-link">
                    Terms & Conditions
                  </a>
                </label>
              </div>

              {errorMsg && (
                <div className="contact-error-msg">
                  <span className="error-icon">⚠️</span> {errorMsg}
                </div>
              )}

              {success && (
                <div className="contact-success-msg">
                  <span className="success-icon">✓</span> Your message was sent successfully!
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="contact-submit-btn"
              >
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
              <iframe
                src={getMapSrc()}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Basagi Studio Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Conditions Modal Overlay */}
      {showTerms && (
        <div className="tc-overlay" onClick={closeTerms} role="dialog" aria-modal="true" aria-labelledby="basagi-tc-title">
          <div className="tc-modal" onClick={e => e.stopPropagation()} style={{ borderColor: 'rgba(245, 197, 24, 0.3)' }}>
            <div className="tc-modal-header" style={{ borderBottomColor: 'rgba(255, 255, 255, 0.08)' }}>
              <h2 id="basagi-tc-title" className="tc-modal-title" style={{ color: '#f5c518' }}>Terms &amp; Conditions</h2>
              <button className="tc-close-btn" onClick={closeTerms} aria-label="Close Terms & Conditions">✕</button>
            </div>
            <div className="tc-modal-body">
              <div className="tc-text-content">
                <p className="tc-intro-text">
                  Welcome to BASAGI Studio. By accessing our studio services, requesting bookings, or submitting queries via this contact form, you agree to comply with and be bound by the following terms and conditions.
                </p>

                <div className="tc-sections">
                  <div className="tc-section">
                    <h3 className="tc-section-title">1. Booking and Services</h3>
                    <p className="tc-section-body">
                      All studio bookings (podcast recording, interview production, videography, or digital billboard slots) are subject to availability and confirmation by the BASAGI team. Submitting an inquiry through this form does not guarantee a slot.
                    </p>
                  </div>

                  <div className="tc-section">
                    <h3 className="tc-section-title">2. Use of Information</h3>
                    <p className="tc-section-body">
                      We collect name, email, and phone numbers via this form solely to contact you regarding your inquiries. We respect your privacy and will not share your personal credentials or project briefs with third-party marketers without your consent.
                    </p>
                  </div>

                  <div className="tc-section">
                    <h3 className="tc-section-title">3. Content Ownership</h3>
                    <p className="tc-section-body">
                      For creators and brands utilizing our recording suites, the creative ownership of the produced audio/video material remains entirely yours, subject to the specific service agreements signed prior to production.
                    </p>
                  </div>

                  <div className="tc-section">
                    <h3 className="tc-section-title">4. Changes and Cancellations</h3>
                    <p className="tc-section-body">
                      Cancellation policies for confirmed studio booking slots will be outlined in your invoice and booking agreements. Please inform us at least 24 hours in advance of any changes to scheduled recording sessions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="tc-modal-footer" style={{ borderTopColor: 'rgba(255, 255, 255, 0.08)' }}>
                <p className="tc-footer-note">By checking the agreement box on the contact form, you acknowledge that you have read and understood these terms.</p>
                <button className="tc-accept-btn" onClick={closeTerms} style={{ backgroundColor: '#f5c518', color: '#05050a', fontWeight: 'bold' }}>
                  I Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Contact;
