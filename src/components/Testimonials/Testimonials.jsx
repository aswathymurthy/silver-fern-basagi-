import React, { useState, useEffect, useCallback } from 'react';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Hannah Schmitt',
    role: 'Lead Designer',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim.',
  },
  {
    id: 2,
    name: 'Hannah Schmitt',
    role: 'Co-Founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim.',
  },
  {
    id: 3,
    name: 'Hannah Schmitt',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim.',
  },
  {
    id: 4,
    name: 'Hannah Schmitt',
    role: 'Artist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim.',
  },
  {
    id: 5,
    name: 'Hannah Schmitt',
    role: 'Producer',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim.',
  },
];

export default function Testimonials({ items }) {
  const displayItems = Array.isArray(items) && items.length > 0 ? items : TESTIMONIALS;
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = useCallback((dir) => {
    if (animating) return;
    setAnimating(true);
    setActive((prev) => (prev + dir + displayItems.length) % displayItems.length);
    setTimeout(() => setAnimating(false), 450);
  }, [animating, displayItems.length]);

  useEffect(() => {
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
  }, [go]);

  const getCard = (offset) => {
    if (displayItems.length === 0) return null;
    return displayItems[(active + offset + displayItems.length) % displayItems.length];
  };

  const centerCard = getCard(0);
  if (!centerCard) return null;

  const slots = [
    { data: getCard(-1), pos: 'left'   },
    { data: centerCard,  pos: 'center' },
    { data: getCard(1),  pos: 'right'  },
  ].filter(s => s.data !== null);

  return (
    <section id="testimonials" className="t-section">
      {/* ── Header ── */}
      <div className="t-header">
        <button className="t-arrow" onClick={() => go(-1)} aria-label="Previous">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <h2 className="t-heading">What Our Clients Say About Us</h2>

        <button className="t-arrow" onClick={() => go(1)} aria-label="Next">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* ── Dots ── */}
      <div className="t-dots">
        {displayItems.map((_, i) => (
          <button
            key={i}
            className={`t-dot${i === active ? ' active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Testimonial ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Cards ── */}
      <div className="t-stage">
        {/* Purple glow behind center */}
        <div className="t-glow" />

        {slots.map(({ data, pos }) => (
          <div key={`${pos}-${data.id || data.name}`} className={`t-card ${pos}${animating ? ' animating' : ''}`}>
            {/* Avatar floats above card */}
            {data.image && (
              <div className="t-avatar-wrap">
                <img src={data.image} alt={data.name} className="t-avatar" onError={e => { e.target.src = '/assets/a1.png'; }} />
              </div>
            )}

            <div className="t-card-body">
              <h3 className="t-name">{data.name}</h3>
              {data.role && <p className="t-role" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: 500, margin: '2px 0 10px' }}>{data.role}</p>}

              <div className="t-quote">❝</div>

              <p className="t-text">{data.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
