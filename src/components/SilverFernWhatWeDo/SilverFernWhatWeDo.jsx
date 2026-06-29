import React, { useState, useEffect } from 'react';

function SilverFernWhatWeDo() {
  return (
    <section className="sf-whatwedo">
      <div className="sf-whatwedo-img-col">
        <img src="" alt="What we do" className="sf-whatwedo-img-placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className="sf-whatwedo-content-col">
        <div className="sf-whatwedo-card">
          <span className="sf-whatwedo-badge">What We Do</span>
          <h2 className="sf-whatwedo-title">Growing Together Through Collective Farming.</h2>
          <p className="sf-whatwedo-desc">
            Nullam porta enim vel tellus commodo, eget laoreet odio ultrices. Phasellus sed velit tempor, aliquam ex id, lacinia dolor.
          </p>
          <div className="sf-whatwedo-stats">
            <div className="sf-wwd-stat-item">
              <div className="sf-donut-chart p90"><span>90%</span></div>
              <p>Eco Farms Worldwide</p>
            </div>
            <div className="sf-wwd-stat-item">
              <div className="sf-donut-chart p78"><span>78%</span></div>
              <p>Special Equipment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


export default SilverFernWhatWeDo;
