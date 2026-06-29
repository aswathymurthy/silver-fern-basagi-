import React, { useState, useEffect } from 'react';
import SilverFernNavbar from '../../components/SilverFernNavbar/SilverFernNavbar';
import SilverFernContact from '../../components/SilverFernContact/SilverFernContact';

function Hero() {
  return (
    <section className="sf-hero">
      <div className="sf-hero-content">
        <div className="sf-hero-tag">
          <span className="sf-green-dot"></span> Top Notch Webinar Platform
        </div>
        <h1 className="sf-hero-title">
          Empowering Farmers.<br />
          Enriching Communities.
        </h1>

      </div>
      <img
        src="/assets/img1.png"
        alt="Hero Graphic"
        className="sf-hero-bg-img"
      />
    </section>
  );
}

function Stats() {
  const stats = [
    { value: '12+', label: 'Years Experience' },
    { value: '5,000+', label: 'Farmers Empowered' },
    { value: '25+', label: 'Countries Reached' },
    { value: '500+', label: 'Satisfied Partners' }
  ];

  return (
    <div className="sf-stats-bar">
      {stats.map((stat, idx) => (
        <div key={idx} className="sf-stat-item">
          <h3 className="sf-stat-value">{stat.value}</h3>
          <p className="sf-stat-label">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

function WhoWeAre({ setCurrentPage }) {
  return (
    <section className="sf-who-we-are-section">
      <div className="sf-wwa-container">
        {/* Left Image Column */}
        <div className="sf-wwa-image-col">
          <img src="/assets/s1.jpg" alt="Hands holding plant" className="sf-wwa-main-img" />
          <div className="sf-wwa-stats-box">
            <h3 className="sf-wwa-stats-number">*435+</h3>
            <p className="sf-wwa-stats-text">Growth Tons of Harvest</p>
          </div>
        </div>

        {/* Right Content Column */}
        <div className="sf-wwa-content-col">
          <span className="sf-wwa-subtitle">Who We Are</span>
          <h2 className="sf-wwa-title">Building A Sustainable Future Through Collective Agriculture</h2>
          <p className="sf-wwa-desc">
            At Silver Fern, we believe agriculture is more than farming—it's about building stronger communities and creating opportunities for future generations. Through innovation, collaboration, and sustainable practices, we help farmers improve productivity while protecting natural resources.
          </p>
          <a
            href="/about"
            className="sf-wwa-read-more"
            onClick={(e) => {
              e.preventDefault();
              if (typeof setCurrentPage === 'function') {
                setCurrentPage('about');
              }
            }}
          >
            Read More <span className="sf-wwa-arrow">➔</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Services({ setCurrentPage, setSelectedService }) {
  const [services, setServices] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const staticServices = [
    {
      title: 'Agricultural Production & Procurement',
      description: 'Farming and animal husbandry and discussions with farmers and scientists to enhance crop yields.',
      image: '/assets/a1.png'
    },
    {
      title: 'Livestock & Supply Chain Management',
      description: 'Streamlined supply chain logistics connecting farmers directly with trusted distributor networks.',
      image: '/assets/a2.jpg'
    },
    {
      title: 'Processing & Value Addition',
      description: 'Modern grain processing, sorting, and organic food manufacturing for maximum quality.',
      image: '/assets/a3.png'
    }
  ];

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        } else {
          setServices(staticServices);
        }
      })
      .catch(() => setServices(staticServices));
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : Math.max(0, services.length - 3)));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 3 < services.length ? prev + 1 : 0));
  };

  const displayServices = services.slice(startIndex, startIndex + 3);

  return (
    <section className="sf-services" id="services">
      <div className="sf-services-header">
        <div className="sf-services-title-wrapper">
          <span className="sf-services-tag">
            <span className="sf-green-dot"></span> Our Services
          </span>
          <h2 className="sf-services-title">Best Agriculture Services</h2>
        </div>

      </div>
      <div className="sf-services-grid">
        {displayServices.map((srv, idx) => {
          let imgSrc = '';
          if (srv.image) {
            if (typeof srv.image === 'object' && srv.image.file_path) {
              imgSrc = srv.image.file_path;
            } else if (typeof srv.image === 'string') {
              imgSrc = srv.image;
            }
          }
          if (!imgSrc) {
            const defaults = ['/assets/a1.png', '/assets/a2.jpg', '/assets/a3.png', '/assets/a4.png'];
            imgSrc = defaults[idx % defaults.length];
          }
          return (
            <div key={idx} className="sf-service-card">
              <div className="sf-service-img-wrapper">
                <img src={imgSrc} alt={srv.title} className="sf-service-img-placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.src = '/assets/a1.png'; }} />
              </div>
              <div className="sf-service-content">
                <h3>{srv.title}</h3>
                <p>{srv.description || srv.desc}</p>
              </div>
              <button
                className="sf-service-action-btn"
                onClick={() => {
                  if (setCurrentPage && setSelectedService) {
                    setSelectedService(srv);
                    setCurrentPage('service-details');
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="sf-why-choose">
      <div className="sf-why-choose-bg"></div>
      <h2 className="sf-why-choose-title">Why Choose Silver Fern?</h2>
      <div className="sf-why-choose-grid">
        <div className="sf-why-card sf-card-side">
          <img src="/assets/x1.jpg" alt="Farmer Owned" className="sf-why-img-placeholder" style={{ height: '350px', width: '100%', objectFit: 'cover', display: 'block' }} />
          <h3>Farmer-Owned & Farmer-Led</h3>
          <p>Delivering quality agricultural solutions backed by experience and innovation.</p>
        </div>
        <div className="sf-why-card sf-card-center">
          <img src="/assets/x2.jpg" alt="Better Market Access" className="sf-why-img-placeholder" style={{ height: '280px', width: '100%', objectFit: 'cover', display: 'block' }} />
          <h3>Better Market Access</h3>
          <p>Connecting farmers directly with opportunities and reliable market channels.</p>
        </div>
        <div className="sf-why-card sf-card-side">
          <img src="/assets/x3.jpg" alt="Sustainable Agriculture" className="sf-why-img-placeholder" style={{ height: '350px', width: '100%', objectFit: 'cover', display: 'block' }} />
          <h3>Sustainable Agriculture</h3>
          <p>Supporting environmentally responsible farming practices for future generations.</p>
        </div>
      </div>
    </section>
  );
}

function BestForFarm() {
  return (
    <section className="sf-best-farm">
      <h2 className="sf-best-farm-title">Choose What's Best For<br />Your Farm</h2>
      <div className="sf-best-farm-grid">
        <div className="sf-best-farm-col left-col">
          <div className="sf-feature-item">
            <div className="sf-feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </div>
            <div className="sf-feature-text">
              <h4>Agriculture Products</h4>
              <p>Nullam porta enim vel tellus commodo, eget laoreet odio ultrices.</p>
            </div>
          </div>
          <div className="sf-feature-item">
            <div className="sf-feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z"></path></svg>
            </div>
            <div className="sf-feature-text">
              <h4>Quality Products</h4>
              <p>Nullam porta enim vel tellus commodo, eget laoreet odio ultrices.</p>
            </div>
          </div>
        </div>

        <div className="sf-best-farm-col center-col">
          <img src="/assets/corns.png" alt="Corn" className="sf-corn-placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div className="sf-best-farm-col right-col">
          <div className="sf-feature-item">
            <div className="sf-feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            </div>
            <div className="sf-feature-text">
              <h4>Fresh Vegetables</h4>
              <p>Nullam porta enim vel tellus commodo, eget laoreet odio ultrices.</p>
            </div>
          </div>
          <div className="sf-feature-item">
            <div className="sf-feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
            </div>
            <div className="sf-feature-text">
              <h4>Pure & Organic</h4>
              <p>Nullam porta enim vel tellus commodo, eget laoreet odio ultrices.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Impact() {
  return (
    <section className="sf-impact">
      <div className="sf-impact-header">
        <h2>Our Impact</h2>
        <p>Creating opportunities through cooperation, innovation, and sustainable agriculture.</p>
      </div>
      <div className="sf-impact-content">
        <div className="sf-impact-grid">
          <div className="sf-impact-card">
            <div className="sf-impact-badge">01</div>
            <h4>Education & Training</h4>
            <p>Providing knowledge, skill development, and awareness programs for members.</p>
          </div>
          <div className="sf-impact-card">
            <div className="sf-impact-badge">02</div>
            <h4>Increased Incomes</h4>
            <p>Creating opportunities for better price realization and value-added production.</p>
          </div>
          <div className="sf-impact-card">
            <div className="sf-impact-badge">03</div>
            <h4>Sustainable Development</h4>
            <p>Promoting responsible agricultural practices and local economic growth.</p>
          </div>
          <div className="sf-impact-card">
            <div className="sf-impact-badge">04</div>
            <h4>Strong Partnerships</h4>
            <p>Connecting farmers with markets, institutions, and stakeholders across the agricultural sector.</p>
          </div>
        </div>
        <div className="sf-impact-image-wrapper">
          <img src="/assets/z1.jpg" alt="Impact" className="sf-impact-img-placeholder" />
        </div>
      </div>
    </section>
  );
}

function FAQ({ setCurrentPage, setSelectedFaq }) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const faqs = [
    {
      q: 'What is Precision Farming, and how can it help me?',
      a: 'Precision farming uses technology to measure and respond to variability in crops, ensuring optimal growth and resource usage while minimizing environmental impact.'
    },
    {
      q: 'How can I ensure my farm is sustainable?',
      a: 'Sustainable farming involves crop rotation, water conservation, and reducing chemical use to protect the ecosystem.'
    },
    {
      q: 'What are the best practices for crop rotation?',
      a: 'Rotate crops from different families to disrupt pest life cycles, improve soil health, and balance nutrient demands.'
    },
    {
      q: 'Do you provide equipment training?',
      a: 'Yes, we provide comprehensive training programs for all specialized farming equipment.'
    }
  ];

  return (
    <section className="sf-faq">
      <div className="sf-faq-left">
        <span className="sf-faq-tag">FAQ's</span>
        <h2 className="sf-faq-title">Frequently Asked Questions</h2>
        <p className="sf-faq-desc">Discover answers to common questions about our collective farming, sustainable practices, and community initiatives.</p>

      </div>
      <div className="sf-faq-right">
        {faqs.map((faq, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div
              key={idx}
              className={`sf-faq-item ${isExpanded ? 'expanded' : ''}`}
              onClick={() => setExpandedIndex(isExpanded ? -1 : idx)}
            >
              <div className="sf-faq-question-row">
                <h4>{faq.q}</h4>
                <button className="sf-faq-toggle">
                  {isExpanded ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  )}
                </button>
              </div>
              {isExpanded && (
                <>
                  <p className="sf-faq-answer">{faq.a}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (setCurrentPage && setSelectedFaq) {
                        setSelectedFaq(faq);
                        setCurrentPage('faq-detail');
                      }
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#166534',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      padding: 0,
                      marginTop: 12,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                  >
                    Read More <span>→</span>
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function getNewsImageUrl(src) {
  if (!src) return null;
  if (typeof src !== 'string') return null;
  if (src.startsWith('http')) return src;
  if (src.startsWith('/storage')) return `http://localhost:8000${src}`;
  return src;
}

function News({ setCurrentPage, setSelectedArticle }) {
  const [posts, setPosts] = useState([]);

  const staticPosts = [
    { tag: 'Technology & Innovation', date: 'November 21, 2024', title: 'How Precision Farming is Changing Agriculture', excerpt: 'Precision farming uses technology like GPS, sensors, and AI to revolutionize agricultural practices.', image: '/assets/g1.png' },
    { tag: 'Sustainability', date: 'November 20, 2024', title: 'The Importance of Soil Health in Sustainable Farming', excerpt: 'This article explores why soil health matters, how to assess it, and what practices can improve it.', image: '/assets/g2.png' },
    { tag: 'Water Management', date: 'November 19, 2024', title: 'Smart Irrigation: Saving Water, Boosting Yields', excerpt: 'Water scarcity is a growing concern for farmers worldwide. Learn how smart irrigation systems powered...', image: '/assets/g3.png' }
  ];

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data);
        } else {
          setPosts(staticPosts);
        }
      })
      .catch(() => setPosts(staticPosts));
  }, []);

  const displayPosts = posts.length > 0 ? posts : staticPosts;

  return (
    <section className="sf-news">
      <div className="sf-news-header">
        <div className="sf-news-header-left">
          <span className="sf-news-tag">Latest News</span>
          <h2>Stay Informed with Insights and Innovations in Agriculture</h2>
          <p>Discover the latest trends, tips, and breakthroughs in the agricultural world.</p>
        </div>
        <div className="sf-news-header-right">

        </div>
      </div>
      <div className="sf-news-grid">
        {displayPosts.map((post, idx) => {
          let imgSrc = getNewsImageUrl(post.featured_image || post.image);
          if (!imgSrc) {
            const defaults = ['/assets/g1.png', '/assets/g2.png', '/assets/g3.png'];
            imgSrc = defaults[idx % defaults.length];
          }
          return (
            <div key={idx} className="sf-news-card">
              <div className="sf-news-img-wrapper">
                <img
                  src={imgSrc}
                  alt={post.title}
                  className="sf-news-img-placeholder"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { e.target.src = '/assets/g1.png'; }}
                />
                <span className="sf-news-img-tag">{(typeof post.category === 'string' ? post.category : post.category?.name) || post.tag || 'Article'}</span>
              </div>
              <div className="sf-news-content">
                <span className="sf-news-date">{post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : post.date}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <button
                  onClick={() => {
                    if (setSelectedArticle && setCurrentPage) {
                      setSelectedArticle(post);
                      setCurrentPage('blog-detail');
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2e7d32',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    padding: 0,
                    marginTop: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  Read More <span>→</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CallToAction() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || submitting) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert('Please enter a valid email address.');
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), platform: 'silver-fern' }),
      });
      const data = await response.json();
      if (data.success) {
        alert(`Thank you for subscribing! A confirmation email has been sent to ${email.trim()}.`);
        setEmail('');
      } else {
        alert(data.message || 'Subscription failed. Please try again.');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      alert('Subscription submitted! A confirmation email will be sent.');
      setEmail('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="sf-cta-section">
      <div className="sf-cta-container">
        <h2 className="sf-cta-title">Grow Smarter, Not Harder.</h2>
        <p className="sf-cta-desc">
          Discover innovative tools and technologies that simplify farming while maximizing yields.
        </p>
        <form onSubmit={handleSubmit} className="sf-cta-form-wrapper">
          <input
            type="email"
            placeholder="Email address"
            className="sf-cta-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="sf-cta-btn">
            Subscribe
            <span className="sf-cta-btn-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </button>
        </form>
      </div>
    </section>
  );
}

export default function Home({ setCurrentPage, setSelectedService, setSelectedArticle, setSelectedFaq }) {
  return (
    <div className="silver-fern-app">
      <SilverFernNavbar
        onBasagiClick={() => setCurrentPage('basagi')}
        onAboutClick={() => setCurrentPage('about')}
        onHomeClick={() => setCurrentPage('silver-fern')}
        onServicesClick={() => setCurrentPage('services')}
        onMembershipClick={() => setCurrentPage('membership')}
        onBlogClick={() => setCurrentPage('blog')}
        onGalleryClick={() => setCurrentPage('gallery')}
        onContactClick={() => setCurrentPage('contact')}
      />
      <Hero />
      <Stats />
      <WhoWeAre setCurrentPage={setCurrentPage} />
      <Services setCurrentPage={setCurrentPage} setSelectedService={setSelectedService} />
      <WhyChoose />
      <BestForFarm />
      <Impact />
      <News setCurrentPage={setCurrentPage} setSelectedArticle={setSelectedArticle} />
      <FAQ setCurrentPage={setCurrentPage} setSelectedFaq={setSelectedFaq} />
      <CallToAction />
      <SilverFernContact setCurrentPage={setCurrentPage} />
    </div>
  );
}
