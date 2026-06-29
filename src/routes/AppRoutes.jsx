import React, { useState, useEffect } from 'react';
import BasagiApp from '../pages/BasagiApp/BasagiApp';
import Home from '../pages/HomePage/Home';
import AdminPanel from '../pages/Dashboard/AdminPanel';
import AboutPage from '../pages/AboutPage/AboutPage';
import ServicesPage from '../pages/ServicesPage/ServicesPage';
import MembershipPage from '../pages/MembershipPage/MembershipPage';
import BlogPage from '../pages/BlogPage/BlogPage';
import BlogDetailPage from '../pages/BlogPage/BlogDetailPage';
import ContactPage from '../pages/ContactPage/ContactPage';
import GalleryPage from '../pages/GalleryPage/GalleryPage';
import ServiceDetailsPage from '../pages/ServiceDetailsPage/ServiceDetailsPage';
import FaqDetailPage from '../pages/FaqDetailPage/FaqDetailPage';

const INITIAL_ARTICLES = [
  { title: 'Sustainable Farming For A Better Future', author: 'Admin', date: 'Mar 14, 2026', status: 'Published', image: '/assets/a2.jpg' },
  { title: 'Top Trends Shaping Agriculture In 2026', author: 'Jane Doe', date: 'Feb 28, 2026', status: 'Draft', image: '/assets/a1.png' },
  { title: 'The Importance Of Value Addition In Agriculture', author: 'Admin', date: 'Mar 05, 2026', status: 'Published', image: '/assets/a2.jpg' }
];

const INITIAL_SERVICES = [
  { icon: '/assets/g6.png', name: 'Agricultural Production', desc: 'Supporting farmers with improved cultivation practices, production planning, and sustainable farming methods.', status: 'Active' },
  { icon: '/assets/g2.png', name: 'Procurement & Aggregation', desc: 'Facilitating the collection, grading, and aggregation of agricultural produce from member farmers.', status: 'Active' },
  { icon: '/assets/g3.png', name: 'Processing & Value Addition', desc: 'Supporting farmers with improved cultivation practices, production planning, and sustainable farming methods.', status: 'Active' },
  { icon: '/assets/g8.png', name: 'Marketing & Sales', desc: 'Supporting farmers with improved cultivation practices, production planning, and sustainable farming methods.', status: 'Active' }
];

export default function AppRoutes() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (window.location.port === '8000') {
      return 'admin';
    }
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    if (path === '' || path === 'home') {
      return 'silver-fern';
    }
    if (path === 'admin' || path.startsWith('admin/')) {
      return 'admin';
    }
    const validPages = ['basagi', 'admin', 'about', 'services', 'service-details', 'membership', 'gallery', 'blog', 'blog-detail', 'contact', 'faq-detail'];
    if (validPages.includes(path)) {
      return path;
    }
    return 'silver-fern';
  });
  const [selectedService, setSelectedService] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedFaq, setSelectedFaq] = useState(null);

  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
    let path = '/';
    if (pageName === 'silver-fern') path = '/';
    else if (pageName === 'basagi') path = '/basagi';
    else if (pageName === 'admin') path = '/admin';
    else if (pageName === 'about') path = '/about';
    else if (pageName === 'services') path = '/services';
    else if (pageName === 'service-details') path = '/service-details';
    else if (pageName === 'membership') path = '/membership';
    else if (pageName === 'gallery') path = '/gallery';
    else if (pageName === 'blog') path = '/blog';
    else if (pageName === 'blog-detail') path = '/blog-detail';
    else if (pageName === 'contact') path = '/contact';
    else if (pageName === 'faq-detail') path = '/faq-detail';

    window.history.pushState(null, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/|\/$/g, '');
      if (path === '' || path === 'home') {
        setCurrentPage('silver-fern');
      } else {
        const validPages = ['basagi', 'admin', 'about', 'services', 'service-details', 'membership', 'gallery', 'blog', 'blog-detail', 'contact', 'faq-detail'];
        if (validPages.includes(path)) {
          setCurrentPage(path);
        } else {
          setCurrentPage('silver-fern');
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dynamically update tab title + favicon based on active site
  useEffect(() => {
    const isBasagi = currentPage === 'basagi';

    // Update title
    document.title = isBasagi
      ? 'BASAGI Studio | Professional Media & Podcast Studio'
      : 'Silver Fern | Empowering Farmers & Enriching Communities';

    // Update favicon
    let link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = 'image/png';
    link.href = isBasagi ? '/assets/logo.png' : '/sf-logo.png';
  }, [currentPage]);
  
  // Shared state for Admin Panel and Frontend Pages
  const [articles, setArticles] = useState([]);
  const [news, setNews] = useState([]);
  const [services, setServices] = useState([]);
  const [basagiServices, setBasagiServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [sfGallery, setSfGallery] = useState([]);
  const [basagiGallery, setBasagiGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setArticles(data);
        }
      })
      .catch(err => {
        console.error('Error fetching blogs:', err);
      });

    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setNews(data);
        }
      })
      .catch(err => console.error('Error fetching news:', err));

    fetch('/api/services?type=silver-fern')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setServices(data);
        }
      })
      .catch(err => {
        console.error('Error fetching services:', err);
      });

    fetch('/api/services?type=basagi')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBasagiServices(data);
        }
      })
      .catch(err => console.error('Error fetching Basagi services:', err));

    fetch('/api/members')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMembers(data);
        }
      })
      .catch(err => console.error('Error fetching members:', err));

    fetch('/api/gallery?type=silver-fern')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSfGallery(data);
        }
      })
      .catch(err => console.error('Error fetching SF gallery:', err));

    fetch('/api/gallery?type=basagi')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBasagiGallery(data);
        }
      })
      .catch(err => console.error('Error fetching Basagi gallery:', err));

    fetch('/api/testimonials?platform=basagi')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTestimonials(data);
        }
      })
      .catch(err => console.error('Error fetching testimonials:', err));
  }, []);

  if (currentPage === 'admin') {
    return (
      <AdminPanel 
        onNavigateHome={() => setCurrentPage('silver-fern')} 
        articles={articles} 
        setArticles={setArticles} 
        news={news} 
        setNews={setNews} 
        services={services} 
        setServices={setServices} 
        basagiServices={basagiServices}
        setBasagiServices={setBasagiServices}
        categories={categories} 
        setCategories={setCategories}
        users={users} 
        setUsers={setUsers} 
        members={members} 
        setMembers={setMembers} 
        sfGallery={sfGallery}
        setSfGallery={setSfGallery}
        basagiGallery={basagiGallery}
        setBasagiGallery={setBasagiGallery}
        testimonials={testimonials}
        setTestimonials={setTestimonials}
        contacts={contacts}
        setContacts={setContacts}
      />
    );
  }

  if (currentPage === 'basagi') {
    return <BasagiApp gallery={basagiGallery} services={basagiServices} testimonials={testimonials} onSilverFernClick={() => navigateTo('silver-fern')} />;
  }

  if (currentPage === 'about') {
    return <AboutPage setCurrentPage={navigateTo} />;
  }

  if (currentPage === 'services') {
    return <ServicesPage setCurrentPage={navigateTo} services={services} setSelectedService={setSelectedService} />;
  }

  if (currentPage === 'service-details') {
    return <ServiceDetailsPage setCurrentPage={navigateTo} service={selectedService} />;
  }

  if (currentPage === 'membership') {
    return <MembershipPage setCurrentPage={navigateTo} members={members} />;
  }

  if (currentPage === 'blog') {
    return <BlogPage setCurrentPage={navigateTo} articles={articles} setSelectedArticle={setSelectedArticle} />;
  }

  if (currentPage === 'blog-detail') {
    return <BlogDetailPage setCurrentPage={navigateTo} article={selectedArticle} />;
  }

  if (currentPage === 'faq-detail') {
    return <FaqDetailPage setCurrentPage={navigateTo} faq={selectedFaq} />;
  }

  if (currentPage === 'contact') {
    return <ContactPage setCurrentPage={navigateTo} />;
  }

  if (currentPage === 'gallery') {
    return <GalleryPage setCurrentPage={navigateTo} gallery={sfGallery} />;
  }

  return <Home setCurrentPage={navigateTo} setSelectedService={setSelectedService} setSelectedArticle={setSelectedArticle} setSelectedFaq={setSelectedFaq} />;
}
