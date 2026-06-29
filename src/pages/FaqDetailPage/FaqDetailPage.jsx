import React from 'react';
import SilverFernNavbar from '../../components/SilverFernNavbar/SilverFernNavbar';
import SilverFernContact from '../../components/SilverFernContact/SilverFernContact';

function FaqDetailPage({ setCurrentPage, faq }) {
  if (!faq) {
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
          <h2>FAQ not found</h2>
          <button 
            onClick={() => setCurrentPage('silver-fern')}
            style={{ marginTop: '2rem', padding: '10px 20px', background: '#166534', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
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
          onClick={() => setCurrentPage('silver-fern')}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#4b5563', fontWeight: 'bold', fontSize: '1rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          &larr; Back to FAQ
        </button>

        <div style={{ display: 'inline-block', backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          Frequently Asked Questions
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1f2937', marginBottom: '2rem', lineHeight: 1.25 }}>
          {faq.q}
        </h1>
        
        <div style={{ borderLeft: '4px solid #2e7d32', paddingLeft: '24px', margin: '2rem 0', minHeight: '100px' }}>
          <p style={{ fontSize: '1.25rem', color: '#374151', lineHeight: 1.8, fontWeight: 500 }}>
            {faq.a}
          </p>
        </div>

        <div style={{ marginTop: '3rem', borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
          <h4 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>Still have questions?</h4>
          <p style={{ color: '#4b5563', fontSize: '0.95rem' }}>
            Feel free to reach out to our team at any time via our contact page.
          </p>
          <button
            onClick={() => setCurrentPage('contact')}
            style={{
              marginTop: '1rem',
              backgroundColor: '#166534',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            Contact Support
          </button>
        </div>
      </div>
      <SilverFernContact setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default FaqDetailPage;
