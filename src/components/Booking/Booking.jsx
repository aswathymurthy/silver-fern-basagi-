import React, { useState, useEffect } from 'react';

function Booking() {
  const [selectedService, setSelectedService] = useState('Interview Recording')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState(10)
  const [selectedTime, setSelectedTime] = useState('10:00 AM')
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const services = [
    'Podcast Production',
    'Interview Recording',
    'Digital Billboard Advertising'
  ]

  const timeSlots = [
    '9:00 AM',
    '9:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM'
  ]

  // Calendar setup: June 2025 starts on Sunday, June 1, and has 30 days
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1)
  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleConfirm = async (e) => {
    if (e) e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      setErrorMsg('Please fill in both your Name and Email Address.')
      return
    }

    const nameRegex = /^[a-zA-Z\s]{2,100}$/;
    if (!nameRegex.test(name.trim())) {
      setErrorMsg('Name must contain only letters and spaces (min 2 characters).')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.')
      return
    }

    if (phone.trim()) {
      const phoneRegex = /^[\d\s\+\-\(\)]{10,20}$/;
      if (!phoneRegex.test(phone.trim())) {
        setErrorMsg('Please enter a valid phone number (between 10 and 20 digits).')
        return
      }
    }

    setSubmitting(true)
    setErrorMsg('')
    setBookingConfirmed(false)

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          service_name: selectedService,
          booking_date: `June ${selectedDay}, 2025`,
          booking_time: selectedTime,
          platform: 'basagi'
        })
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setBookingConfirmed(true)
        setName('')
        setEmail('')
        setPhone('')
        setTimeout(() => {
          setBookingConfirmed(false)
        }, 6000)
      } else {
        setErrorMsg(data.message || 'Failed to submit booking request. Please check inputs.')
      }
    } catch (err) {
      console.error('Error submitting booking:', err)
      setErrorMsg('Connection error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // Determine setup badge text based on selection
  const getBadgeText = (service) => {
    if (service === 'Podcast Production') return 'Podcast Setup'
    if (service === 'Digital Billboard Advertising') return 'Billboard Setup'
    return 'Interview Setup'
  }

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
            <button
              className="dropdown-toggle-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>{selectedService}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className={`dropdown-arrow-icon ${dropdownOpen ? 'open' : ''}`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {dropdownOpen && (
              <ul className="dropdown-options-list">
                {services.map((service, index) => (
                  <li
                    key={index}
                    className={`dropdown-option-item ${selectedService === service ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedService(service)
                      setDropdownOpen(false)
                    }}
                  >
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
            {/* Calendar Widget Left */}
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
                  <button
                    key={day}
                    className={`calendar-day-btn ${selectedDay === day ? 'selected' : ''}`}
                    onClick={() => setSelectedDay(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot List Right */}
            <div className="time-slots-list">
              {timeSlots.map((time, idx) => (
                <button
                  key={idx}
                  className={`time-slot-btn ${selectedTime === time ? 'selected' : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details Form Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.03)', color: '#fff', outline: 'none', fontFamily: 'inherit', fontSize: '0.9rem' }}
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.03)', color: '#fff', outline: 'none', fontFamily: 'inherit', fontSize: '0.9rem' }}
                  required
                />
              </div>
            </div>
            <div>
              <input
                type="tel"
                placeholder="Phone Number (Optional)"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.03)', color: '#fff', outline: 'none', fontFamily: 'inherit', fontSize: '0.9rem' }}
              />
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
  )
}


export default Booking;
