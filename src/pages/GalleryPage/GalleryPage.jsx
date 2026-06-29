import React, { useState } from 'react';
import SilverFernNavbar from '../../components/SilverFernNavbar/SilverFernNavbar';
import SilverFernContact from '../../components/SilverFernContact/SilverFernContact';
import PublicPagination from '../../components/PublicPagination/PublicPagination';

function GalleryPage({ setCurrentPage, gallery = [] }) {
  const defaultImages = [
    { src: '/assets/g1.png', alt: 'Farmers at sunset' },
    { src: '/assets/g2.png', alt: 'Agricultural workers' },
    { src: '/assets/g3.png', alt: 'Planting seedlings' },
    { src: '/assets/g4.png', alt: 'Sorting grains' },
    { src: '/assets/g5.png', alt: 'Harvesting' },
    { src: '/assets/g6.png', alt: 'Wheat field' },
    { src: '/assets/g7.png', alt: 'Aerial farm view' },
    { src: '/assets/g8.png', alt: 'Cattle' },
    { src: '/assets/g9.png', alt: 'Milking cows' },
    { src: '/assets/g10.png', alt: 'Dairy farm' }
  ];

  const safeGallery = Array.isArray(gallery) ? gallery : [];
  const displayImages = safeGallery.map(item => ({
    src: item.image_url || item.image || item.src || '/assets/g1.png',
    alt: item.title || item.alt || ''
  }));

  const [page, setPage] = useState(1);
  const imagesPerPage = 9;
  const totalPages = Math.ceil(displayImages.length / imagesPerPage);
  const paginatedImages = displayImages.slice((page - 1) * imagesPerPage, page * imagesPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getGridStyle = (idx) => {
    const mod = idx % 10;
    if (mod === 0) return { gridColumn: 'span 2', gridRow: 'span 1' };
    if (mod === 1) return { gridColumn: 'span 1', gridRow: 'span 2' };
    if (mod === 4) return { gridColumn: 'span 2', gridRow: 'span 1' };
    return { gridColumn: 'span 1', gridRow: 'span 1' };
  };

  return (
    <div className="silver-fern-app sf-gallery-page-container">
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
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#1f2937', marginTop: '1rem' }}>Gallery</h2>
        </div>

        {displayImages.length === 0 ? (
          <div style={{ minHeight: '200px' }}></div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '250px', gap: '1rem' }}>
              {paginatedImages.map((img, idx) => (
                <div key={idx} style={{ ...getGridStyle((page - 1) * imagesPerPage + idx), borderRadius: '16px', overflow: 'hidden' }}>
                  <img src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                </div>
              ))}
            </div>
            <PublicPagination 
              currentPage={page} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          </>
        )}
      </div>
      <SilverFernContact setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default GalleryPage;
