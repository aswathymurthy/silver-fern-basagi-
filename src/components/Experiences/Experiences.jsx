import React from 'react';

const basagiServices = [
  {
    title: 'Podcast Production',
    description: 'Create professional podcasts with crystal-clear audio, cinematic visuals, and expert production support. BASAGI Studio provides everything you need to record, edit, and publish high-quality podcast content.',
    features: [
      'Professional Studio Recording',
      'Multi-Camera Setup',
      'Audio Mixing & Editing',
      'Video Podcast Production',
      'Intro & Outro Integration',
      'Publishing Support'
    ],
    image: '/assets/booking_studio.png',
    imageRight: false
  },
  {
    title: 'Interview Recording',
    description: 'We provide a professional, natural interview environment with expert lighting, sound, and multi-camera production services built for broadcast, digital media, and branded content.',
    features: [
      'Video Recording',
      'Multi-Camera Lighting Rig',
      'High-Quality Audio',
      'Editing & Delivery',
      'Interview Set Design'
    ],
    image: '/assets/a2.jpg',
    imageRight: true
  },
  {
    title: 'Digital Billboard Advertising',
    description: 'Reach thousands with high-visibility city billboard campaigns — helping local businesses and brands connect with their audience across prime, high-traffic locations.',
    features: [
      'Billboard Campaign Planning',
      'Creative Design & Production',
      'High-Impact Exposure',
      'Brand Promotion Campaign',
      'Campaign Conversion Report'
    ],
    image: '/assets/g5.png',
    imageRight: false
  }
];

function getImageUrl(src) {
  if (!src) return '/assets/booking_studio.png';
  if (src.startsWith('http')) return src;
  if (src.startsWith('/storage')) return `http://localhost:8000${src}`;
  return src;
}

function Experiences({ services = [] }) {
  const displayServices = Array.isArray(services) ? services : [];

  return (
    <section
      id="experiences"
      style={{
        backgroundColor: '#0e0e0e',
        padding: '7rem 6rem',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Section Tag */}
      <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <span style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,0.07)',
          color: '#ccc',
          fontSize: '0.78rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '6px 18px',
          borderRadius: 999,
          border: '1px solid rgba(255,255,255,0.12)'
        }}>Our Services</span>
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          color: '#fff',
          marginBottom: '1.25rem',
          lineHeight: 1.15,
          letterSpacing: '-0.02em'
        }}>
          Experiences<br />Through Our Services
        </h2>
        <p style={{
          color: '#888',
          maxWidth: '620px',
          margin: '0 auto',
          fontSize: '0.95rem',
          lineHeight: 1.75
        }}>
          Discover professional production services designed to help creators, businesses, and brands produce
          impactful media content with confidence. From podcast recording and interview production to digital
          advertising and content creation, BASAGI Studio delivers quality, creativity, and results in every project.
        </p>
      </div>

      {/* Alternating Cards */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {displayServices.map((srv, idx) => {
          const title = srv.title || srv.name || 'Untitled';
          const description = srv.description || srv.desc || srv.short_description || '';
          const imgUrl = getImageUrl(srv.image || srv.icon || srv.image_url);
          const features = Array.isArray(srv.features) ? srv.features : [];
          const isImageRight = idx % 2 === 1;

          const ImagePanel = (
            <div style={{
              flex: '0 0 39%',
              minHeight: 340,
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5)'
            }}>
              <img
                src={imgUrl}
                alt={title}
                onError={e => { e.target.src = '/assets/booking_studio.png'; }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          );

          const ContentPanel = (
            <div style={{
              flex: '0 0 58%',
              backgroundColor: '#1e2d6b',
              borderRadius: 20,
              padding: '2.75rem 2.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxShadow: '0 8px 40px rgba(0,0,0,0.4)'
            }}>
              <h3 style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '1rem',
                lineHeight: 1.25
              }}>{title}</h3>

              <p style={{
                fontSize: '0.875rem',
                color: '#c5cdf0',
                lineHeight: 1.75,
                marginBottom: features.length > 0 ? '1.5rem' : 0
              }}>{description}</p>

              {features.length > 0 && (
                <>
                  <div style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '0.75rem',
                    letterSpacing: '0.04em'
                  }}>Includes</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {features.map((f, i) => (
                      <li key={i} style={{
                        fontSize: '0.85rem',
                        color: '#d0d9f5',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem'
                      }}>
                        <span style={{
                          width: 6, height: 6,
                          backgroundColor: '#7b93e8',
                          borderRadius: '50%',
                          flexShrink: 0
                        }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          );

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
                gap: '2rem',
              }}
            >
              {isImageRight ? (
                <>{ContentPanel}{ImagePanel}</>
              ) : (
                <>{ImagePanel}{ContentPanel}</>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Experiences;
