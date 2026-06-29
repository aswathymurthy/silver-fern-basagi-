import React, { useState, useEffect } from 'react';

function BuiltForCreators() {
  const features = [
    'Soundproof Recording Rooms',
    '4K Video Production',
    'Professional Lighting Setup',
    'Editing Suite',
    'High-Speed Internet',
    'Comfortable Creative Environment',
  ]

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
  )
}


export default BuiltForCreators;
