import React, { useState } from 'react';
import SilverFernNavbar from '../../components/SilverFernNavbar/SilverFernNavbar';
import SilverFernContact from '../../components/SilverFernContact/SilverFernContact';
import PublicPagination from '../../components/PublicPagination/PublicPagination';
import './ServicesPage.css';

function ServicesPage({ setCurrentPage, services = [], setSelectedService }) {
  const safeServices = Array.isArray(services) ? services : [];
  const activeServices = safeServices.filter(s => (s.status || '').toLowerCase() === 'active' || s.status === undefined);

  const [page, setPage] = useState(1);
  const servicesPerPage = 6;
  const totalPages = Math.ceil(activeServices.length / servicesPerPage);
  const paginatedServices = activeServices.slice((page - 1) * servicesPerPage, page * servicesPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        <div className="sf-services-header-grid">
          <div>
            <div className="sf-services-pill">
              <span className="sf-services-pill-dot"></span>
              Services
            </div>
            <h2 className="sf-services-main-title">
              Delivering Agricultural Solutions for <span>Sustainable Growth and</span> Farmer Prosperity.
            </h2>
          </div>
          <div>
            <p className="sf-services-header-desc">
              Silver Fern Farmers Producer Company Limited provides a range of services aimed at improving Agricultural, Rural Productivity, expanding market opportunities and supporting the overall development of farming communities. Our services are designed to help farmers achieve sustainable growth by adding value across the agricultural supply chain.
            </p>
          </div>
        </div>
        
        <div className="sf-services-cards-grid">
          {paginatedServices.map((svc, idx) => {
            const name = svc.name || svc.title || 'Untitled Service';
            const desc = svc.desc || svc.short_description || svc.description || '';
            const imgUrl = svc.icon || svc.image;
            const isImg = imgUrl && (imgUrl.startsWith('data:') || imgUrl.startsWith('blob:') || imgUrl.startsWith('/') || imgUrl.startsWith('http'));
            const absoluteIdx = (page - 1) * servicesPerPage + idx;

            return (
              <div key={idx} className="sf-service-horizontal-card">
                <div className="sf-service-img-container">
                  {isImg ? (
                    <img src={imgUrl} alt={name} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                      {imgUrl || '🌱'}
                    </div>
                  )}
                </div>
                <div className="sf-service-text-container">
                  <span className="sf-service-number">{(absoluteIdx + 1).toString().padStart(2, '0')}</span>
                  <h3 className="sf-service-title">{name}</h3>
                  <p className="sf-service-desc">{desc}</p>
                  <button 
                    onClick={(e) => { e.preventDefault(); setSelectedService(svc); setCurrentPage('service-details'); }}
                    className="sf-service-learn-more-btn"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <PublicPagination 
          currentPage={page} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      </div>
      <SilverFernContact setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default ServicesPage;
