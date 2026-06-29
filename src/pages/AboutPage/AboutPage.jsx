import React from 'react';
import SilverFernNavbar from '../../components/SilverFernNavbar/SilverFernNavbar';
import SilverFernAbout from '../../components/SilverFernAbout/SilverFernAbout';
import SilverFernContact from '../../components/SilverFernContact/SilverFernContact';
import '../ServicesPage/ServicesPage.css';

function AboutPage({ setCurrentPage }) {
  return (
    <div className="silver-fern-app sf-services-page-container sf-about-page-container">
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
        <SilverFernAbout />
      </div>
      <SilverFernContact setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default AboutPage;
