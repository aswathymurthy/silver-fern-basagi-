import React, { useState, useEffect } from 'react';

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

  // Helper to format the title with line breaks and highlight class
  const formatTitle = (text) => {
    if (!text) return '';
    if (text === "Your Presence. Professionally Built.") {
      return 'Your<br/>Presence.<br/><span class="highlight">Professionally<br/>Built.</span>';
    }
    // Fallback: split words and wrap last two in highlight class with br
    const words = text.split(' ');
    if (words.length >= 4) {
      const line1 = words.slice(0, -3).join(' ');
      const line2 = words[words.length - 3];
      const line3 = words[words.length - 2];
      const line4 = words[words.length - 1];
      return `${line1}<br/>${line2}<br/><span class="highlight">${line3}<br/>${line4}</span>`;
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

export default Hero;
