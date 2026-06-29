import React from 'react';
import SilverFernNavbar from '../../components/SilverFernNavbar/SilverFernNavbar';
import SilverFernContact from '../../components/SilverFernContact/SilverFernContact';

function ServiceDetailsPage({ setCurrentPage, service }) {
  if (!service) {
    return (
      <div className="silver-fern-app sf-services-page-container">
        <SilverFernNavbar 
          onBasagiClick={() => setCurrentPage('basagi')} 
          onAdminClick={() => setCurrentPage('admin')} 
          onAboutClick={() => setCurrentPage('about')}
          onHomeClick={() => setCurrentPage('silver-fern')}
          onServicesClick={() => setCurrentPage('services')}
          onMembershipClick={() => setCurrentPage('membership')}
          onBlogClick={() => setCurrentPage('blog')}
          onGalleryClick={() => setCurrentPage('gallery')}
          onContactClick={() => setCurrentPage('contact')}
        />
        <div className="sf-services-page-wrapper" style={{ textAlign: 'center' }}>
          <h2>Service not found</h2>
          <button 
            onClick={() => setCurrentPage('services')}
            style={{ marginTop: '2rem', padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  let imgSrc = '';
  if (service.image) {
    if (typeof service.image === 'object' && service.image.file_path) {
      imgSrc = service.image.file_path;
    } else if (typeof service.image === 'string') {
      imgSrc = service.image;
    }
  } else if (service.icon && (service.icon.startsWith('data:') || service.icon.startsWith('blob:') || service.icon.startsWith('/') || service.icon.startsWith('http'))) {
    imgSrc = service.icon;
  }

  return (
    <div className="silver-fern-app sf-services-page-container">
      <SilverFernNavbar 
        onBasagiClick={() => setCurrentPage('basagi')} 
        onAdminClick={() => setCurrentPage('admin')} 
        onAboutClick={() => setCurrentPage('about')}
        onHomeClick={() => setCurrentPage('silver-fern')}
        onServicesClick={() => setCurrentPage('services')}
        onMembershipClick={() => setCurrentPage('membership')}
        onBlogClick={() => setCurrentPage('blog')}
        onGalleryClick={() => setCurrentPage('gallery')}
        onContactClick={() => setCurrentPage('contact')}
      />
      <div className="sf-services-page-wrapper">
        <button 
          onClick={() => setCurrentPage('services')}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#4b5563', fontWeight: 'bold', fontSize: '1rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          &larr; Back to Services
        </button>

        {imgSrc ? (
          <img src={imgSrc} alt={service.name || service.title} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '24px', marginBottom: '3rem' }} />
        ) : (
          <div style={{ width: '100%', height: '400px', backgroundColor: '#e2e8f0', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem', marginBottom: '3rem' }}>
            {service.icon || '🌱'}
          </div>
        )}

        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#1f2937', marginBottom: '1.5rem', lineHeight: 1.2 }}>
          {service.name || service.title}
        </h1>
        
        {(service.short_description || (service.desc && service.description && service.desc !== service.description)) && (
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#166534', marginBottom: '2rem', borderLeft: '4px solid #16a34a', lineHeight: 1.6, backgroundColor: '#f0fdf4', padding: '1.2rem 1.5rem', borderRadius: '0 12px 12px 0', boxShadow: '0 2px 8px rgba(22, 163, 74, 0.08)' }}>
            {service.short_description || service.desc}
          </div>
        )}

        {Array.isArray(service.features) && service.features.length > 0 && (
          <div style={{ marginBottom: '2.5rem', backgroundColor: '#f9fafb', padding: '1.5rem 2rem', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1f2937', marginBottom: '1rem' }}>Key Highlights & Features</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.8rem' }}>
              {service.features.map((feat, fIdx) => (
                <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#374151', fontSize: '1rem', fontWeight: 500 }}>
                  <span style={{ color: '#16a34a', fontWeight: 'bold' }}>✓</span> {feat}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937', marginBottom: '1rem' }}>Overview & Detailed Description</h3>
          <div style={{ fontSize: '1.15rem', color: '#4b5563', lineHeight: 1.85, whiteSpace: 'pre-wrap' }}>
            {service.description || service.desc || "No detailed description available for this service."}
          </div>
        </div>
      </div>
      <SilverFernContact setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default ServiceDetailsPage;
