import React, { useState, useEffect } from 'react';

function Stats() {
  const stats = [
    { value: '150+', label: 'Projects Completed' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '50+', label: 'Happy Clients' },
    { value: '15+', label: 'Industry Awards' },
  ]

  return (
    <section className="stats-section">
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-card-glow"></div>
            <h3>{s.value}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}


export default Stats;
