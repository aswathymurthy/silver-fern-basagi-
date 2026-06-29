import React from 'react';
import SilverFernNavbar from '../../components/SilverFernNavbar/SilverFernNavbar';
import SilverFernContact from '../../components/SilverFernContact/SilverFernContact';

const DEFAULT_IMG = '/assets/a2.jpg';

function getImageUrl(src) {
  if (!src) return DEFAULT_IMG;
  if (typeof src !== 'string') return DEFAULT_IMG;
  if (src.startsWith('http')) return src;
  if (src.startsWith('/storage')) return `http://localhost:8000${src}`;
  return src;
}

function getArticleImage(article) {
  return getImageUrl(article.image || article.featured_image || null);
}

export default function BlogDetailPage({ setCurrentPage, article }) {
  if (!article) {
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
        <div style={{ paddingTop: 160, textAlign: 'center', minHeight: '60vh' }}>
          <h2 style={{ color: '#1f2937', fontSize: '1.5rem' }}>Article not found.</h2>
          <button onClick={() => setCurrentPage('blog')} style={{
            marginTop: 24, padding: '10px 28px', background: '#1f2937', color: '#fff',
            borderRadius: 999, border: 'none', cursor: 'pointer', fontWeight: 700
          }}>← Back to Blog</button>
        </div>
        <SilverFernContact setCurrentPage={setCurrentPage} />
      </div>
    );
  }

  const imgSrc = getArticleImage(article);
  const publishDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : article.date || '';

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

      <div style={{ paddingTop: 130, paddingBottom: 80 }} className="sf-services-page-wrapper">
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
          
          {/* Back Button */}
          <button
            onClick={() => setCurrentPage('blog')}
            style={{
              background: 'none',
              border: 'none',
              color: '#4b5563',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '1rem',
              fontWeight: 700,
              marginBottom: 24,
              padding: 0,
              outline: 'none'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            &larr; Back to Blog
          </button>

          {/* Hero Image */}
          <div style={{ width: '100%', height: 420, overflow: 'hidden', borderRadius: '24px', marginBottom: '2.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
            <img
              src={imgSrc}
              alt={article.title}
              onError={e => { e.target.src = DEFAULT_IMG; }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Meta Tags */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
            {article.category && (
              <span style={{
                background: '#e8f5e9', color: '#2e7d32', fontSize: '0.8rem',
                fontWeight: 700, padding: '6px 16px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.05em'
              }}>{typeof article.category === 'string' ? article.category : article.category?.name}</span>
            )}
            {article.author && (
              <span style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 500 }}>✍️ By <strong>{article.author}</strong></span>
            )}
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#1f2937',
            lineHeight: 1.2, marginBottom: '1.5rem', fontFamily: 'Outfit, sans-serif'
          }}>{article.title}</h1>

          {/* Sub Description / Excerpt */}
          {(article.excerpt || article.short_description || article.sub_description || article.desc) && (
            <div style={{
              fontSize: '1.25rem', fontWeight: 600, color: '#166534', marginBottom: '2.5rem',
              borderLeft: '4px solid #16a34a', lineHeight: 1.6, backgroundColor: '#f0fdf4',
              padding: '1.2rem 1.5rem', borderRadius: '0 12px 12px 0', boxShadow: '0 2px 8px rgba(22, 163, 74, 0.08)'
            }}>
              {article.excerpt || article.short_description || article.sub_description || article.desc}
            </div>
          )}

          {/* Detailed Description / Content */}
          <div style={{ marginBottom: '2rem' }}>
            <div
              style={{
                fontSize: '1.15rem', color: '#4b5563', lineHeight: 1.85, whiteSpace: 'pre-wrap', fontFamily: 'Inter, system-ui, sans-serif'
              }}
              dangerouslySetInnerHTML={{ __html: (article.content || article.description || 'No detailed content available for this article.').replace(/\n/g, '<br />') }}
            />
          </div>
        </div>
      </div>

      <SilverFernContact setCurrentPage={setCurrentPage} />
    </div>
  );
}
