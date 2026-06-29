import React, { useState } from 'react';
import SilverFernNavbar from '../../components/SilverFernNavbar/SilverFernNavbar';
import SilverFernContact from '../../components/SilverFernContact/SilverFernContact';
import PublicPagination from '../../components/PublicPagination/PublicPagination';

const DEFAULT_IMG = '/assets/a2.jpg';

// Safely resolve any image src — handles full URLs, /storage relative paths, or fallback
function getImageUrl(src) {
  if (!src) return DEFAULT_IMG;
  if (typeof src !== 'string') return DEFAULT_IMG;
  if (src.startsWith('http')) return src;
  if (src.startsWith('/storage')) return `http://localhost:8000${src}`;
  return src; // /assets/... or other relative path
}

// Get the image from whichever field exists (admin API uses 'image', public API uses 'featured_image')
function getArticleImage(article) {
  return getImageUrl(article.image || article.featured_image || null);
}

function BlogPage({ setCurrentPage, articles = [], setSelectedArticle }) {
  const safeArticles = Array.isArray(articles) ? articles : [];
  const publishedArticles = safeArticles.filter(a => a.status !== 'Draft');
  const featuredArticle = publishedArticles.length > 0 ? publishedArticles[0] : null;
  const recentArticles = publishedArticles.slice(1, 4);

  const [page, setPage] = useState(1);
  const blogsPerPage = 6;
  const totalPages = Math.ceil(publishedArticles.length / blogsPerPage);
  const paginatedBlogs = publishedArticles.slice((page - 1) * blogsPerPage, page * blogsPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadMore = (article) => {
    if (setSelectedArticle) setSelectedArticle(article);
    setCurrentPage('blog-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="silver-fern-app sf-blog-page-container">
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
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1f2937' }}>Blog &amp; News</h2>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', marginTop: '0.5rem' }}>Insights, Updates, And Stories From The Field</p>
        </div>

        {/* Featured Article */}
        {page === 1 && featuredArticle && (
          <div style={{ marginBottom: '4rem' }}>
            <img
              src={getArticleImage(featuredArticle)}
              alt={featuredArticle.title}
              style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '24px' }}
              onError={e => { e.target.src = DEFAULT_IMG; }}
            />
            <div style={{ marginTop: '1.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 600 }}>{featuredArticle.date}</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1f2937', marginTop: '0.5rem' }}>{featuredArticle.title}</h3>
              <button
                onClick={() => handleReadMore(featuredArticle)}
                style={{ background: '#111827', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', display: 'inline-block', marginTop: '1rem' }}
              >Read More →</button>
            </div>
          </div>
        )}

        {/* Our Articles */}
        {page === 1 && recentArticles.length > 0 && (
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937' }}>Our Articles</h3>
              <a href="#" style={{ color: '#1f2937', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>View All</a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
              <div>
                <img
                  src={getArticleImage(recentArticles[0])}
                  alt={recentArticles[0].title}
                  style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '16px' }}
                  onError={e => { e.target.src = DEFAULT_IMG; }}
                />
                <div style={{ marginTop: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600 }}>{recentArticles[0].date}</span>
                  <h4 style={{ fontSize: '1.25rem', marginTop: '0.5rem' }}>{recentArticles[0].title}</h4>
                  <button
                    onClick={() => handleReadMore(recentArticles[0])}
                    style={{ background: 'none', border: 'none', color: '#111', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', padding: 0, marginTop: 8 }}
                  >Read More →</button>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {recentArticles.slice(1).map((article, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
                    <img
                      src={getArticleImage(article)}
                      alt={article.title}
                      style={{ width: '120px', height: '100px', objectFit: 'cover', borderRadius: '12px', flexShrink: 0 }}
                      onError={e => { e.target.src = DEFAULT_IMG; }}
                    />
                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600 }}>{article.date}</span>
                      <h4 style={{ fontSize: '1rem', marginTop: '0.25rem', marginBottom: '0.5rem' }}>{article.title}</h4>
                      <button
                        onClick={() => handleReadMore(article)}
                        style={{ background: 'none', border: 'none', color: '#111', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem', padding: 0 }}
                      >Read More →</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Latest Blog */}
        {paginatedBlogs.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937', marginBottom: '1.5rem' }}>
              {page === 1 ? 'Latest Blog' : `All Articles — Page ${page}`}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              {paginatedBlogs.map((blog, idx) => (
                <div key={idx}>
                  <img
                    src={getArticleImage(blog)}
                    alt={blog.title}
                    style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '16px' }}
                    onError={e => { e.target.src = DEFAULT_IMG; }}
                  />
                  <div style={{ marginTop: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600 }}>{blog.date}</span>
                    <h4 style={{ fontSize: '1.1rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>{blog.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: '#4b5563', marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {blog.excerpt || 'Insights and updates on agricultural methodologies...'}
                    </p>
                    <button
                      onClick={() => handleReadMore(blog)}
                      style={{ background: 'none', border: 'none', color: '#111', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}
                    >Read More →</button>
                  </div>
                </div>
              ))}
            </div>
            <PublicPagination 
              currentPage={page} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          </div>
        )}

      </div>
      <SilverFernContact setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default BlogPage;
