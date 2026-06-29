import React from 'react';

function Gallery({ items = [] }) {
  const staticItems = [
    { id: 1, title: 'Podcast Room', image: '/assets/u1.png' },
    { id: 2, title: 'Interview Setup', image: '/assets/u2.png' },
    { id: 3, title: 'Control Room', image: '/assets/u3.png' },
    { id: 4, title: 'Editing Suite', image: '/assets/u4.png' },
    { id: 5, title: 'Content Creation Area', image: '/assets/u5.png' },
    { id: 6, title: 'Billboard Campaigns', image: '/assets/u6.png' },
  ];

  const displayItems = items;

  // Resolve image URL from various API data shapes
  const getImageSrc = (item) => {
    // Primary: image_url from API
    if (item.image_url) return item.image_url;
    // Legacy: image object with file_path
    if (item.image && typeof item.image === 'object' && item.image.file_path) {
      return item.image.file_path;
    }
    // Legacy: image as plain string
    if (item.image && typeof item.image === 'string') return item.image;
    // Static path fallback
    if (item.src) return item.src;
    return '/assets/u1.png';
  };

  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-header">
        <span className="section-tag">Gallery</span>
        <h2 className="gallery-title">Moments <span className="highlight">From The Studio</span></h2>
      </div>

      <div className="gallery-grid">
        {displayItems.map((item) => (
          <div key={item.id || item.title} className="gallery-card">
            <div className="gallery-image-container">
              <img src={getImageSrc(item)} alt={item.title} className="gallery-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {(item.title || item.caption) && (
              <div className="gallery-card-badge" style={{ flexDirection: 'column', alignItems: 'flex-start', borderRadius: '12px', padding: '0.6rem 1rem' }}>
                {item.title && <span className="gallery-badge-text" style={{ fontSize: '0.9rem' }}>{item.title}</span>}
                {item.caption && (
                  <span className="gallery-badge-caption" style={{ fontSize: '0.75rem', opacity: 0.7, fontWeight: 400, marginTop: '2px' }}>
                    {item.caption}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}


export default Gallery;
