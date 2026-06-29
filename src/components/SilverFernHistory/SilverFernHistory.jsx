import React, { useState, useEffect } from 'react';

function SilverFernHistory() {
  const timeline = [
    { year: '2024', title: 'Company Incorporated', desc: 'Nullam porta enim vel tellus commodo.' },
    { year: '2024', title: 'Farm Remodelacion', desc: 'Nullam porta enim vel tellus commodo.' },
    { year: '2025', title: 'Grainformers Formed', desc: 'Nullam porta enim vel tellus commodo.' },
    { year: '2025', title: 'Start of Agriculture', desc: 'Nullam porta enim vel tellus commodo.' }
  ];

  return (
    <section className="sf-history">
      <div className="sf-history-header">
        <div className="sf-history-header-left">
          <span className="sf-history-tag">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
            Our History
          </span>
          <h2 className="sf-history-title">Farming have been since 1866.</h2>
        </div>
        <div className="sf-history-header-right">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
        </div>
      </div>
      <div className="sf-timeline-container">
        <div className="sf-timeline-line"></div>
        <div className="sf-timeline-grid">
          {timeline.map((item, idx) => (
            <div key={idx} className="sf-timeline-item">
              <div className="sf-timeline-year-bg">{item.year}</div>
              <div className="sf-timeline-marker"></div>
              <h4 className="sf-timeline-item-title">{item.title}</h4>
              <p className="sf-timeline-item-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


export default SilverFernHistory;
