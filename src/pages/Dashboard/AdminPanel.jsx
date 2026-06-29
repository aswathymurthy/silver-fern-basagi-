import React, { useState, useEffect, useRef } from 'react';
import '../../assets/styles/admin.css';

// ─── Helpers ────────────────────────────────────────────────────────────────

function Badge({ status }) {
  const s = (status || '').toLowerCase();
  const cls =
    s === 'published' || s === 'active'
      ? 'badge-success'
      : s === 'draft' || s === 'inactive'
      ? 'badge-warning'
      : 'badge-info';
  return (
    <span className={`admin-badge ${cls}`}>
      {status || '—'}
    </span>
  );
}

// ─── Shared View Modal ───────────────────────────────────────────────────────

function ViewModal({ title, onClose, children }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(5, 7, 15, 0.88)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', animation: 'fadeIn 0.2s ease'
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#0f1322',
        border: '1px solid #2a3449',
        borderRadius: 18,
        maxWidth: 640, width: '100%',
        boxShadow: '0 24px 80px rgba(0,0,0,0.85)',
        animation: 'slideDown 0.25s ease',
        maxHeight: '85vh',
        display: 'flex', flexDirection: 'column',
        color: '#f8fafc',
        overflow: 'hidden'
      }}>
        {/* Sticky Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 28px', borderBottom: '1px solid #2a3449',
          background: '#111628', flexShrink: 0
        }}>
          <h3 style={{ margin: 0, fontFamily: 'Outfit, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#ffffff' }}>{title}</h3>
          <button type="button" onClick={onClose} style={{
            background: 'rgba(255,255,255,0.1)', border: '1px solid #2a3449',
            color: '#fff', borderRadius: 8, width: 36, height: 36,
            cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.background = '#ef4444'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          title="Close / Go Back"
          >✕</button>
        </div>

        {/* Scrollable Content Body */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>

        {/* Sticky Footer */}
        <div style={{
          padding: '16px 28px', borderTop: '1px solid #2a3449',
          background: '#111628', display: 'flex', justifyContent: 'flex-end', flexShrink: 0
        }}>
          <button type="button" onClick={onClose} style={{
            background: 'var(--admin-accent)', color: '#05070f', border: 'none',
            borderRadius: 20, padding: '8px 24px', fontWeight: 700, fontSize: '0.88rem',
            cursor: 'pointer', transition: 'all 0.2s ease'
          }}>
            ← Close / Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

function ViewField({ label, value, mono }) {
  if (!value && value !== 0) return null;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: '0.95rem', color: 'var(--admin-text)', lineHeight: '1.55', fontFamily: mono ? 'monospace' : 'inherit', wordBreak: 'break-word' }}>{value}</div>
    </div>
  );
}

// ─── Shared Pagination ───────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 10;

function Pagination({ page, totalPages, onPage }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const btnBase = {
    padding: '5px 12px', borderRadius: 6, border: '1px solid var(--admin-border)',
    background: 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem'
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
      <button onClick={() => onPage(Math.max(1, page - 1))} disabled={page === 1}
        style={{ ...btnBase, opacity: page === 1 ? 0.4 : 1 }}>Prev</button>
      {pages.map(p => (
        <button key={p} onClick={() => onPage(p)} style={{
          ...btnBase,
          border: p === page ? '1px solid var(--admin-accent)' : '1px solid var(--admin-border)',
          background: p === page ? 'var(--admin-accent)' : 'transparent',
          color: p === page ? '#05050a' : '#fff', minWidth: 34
        }}>{p}</button>
      ))}
      <button onClick={() => onPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
        style={{ ...btnBase, opacity: page === totalPages ? 0.4 : 1 }}>Next</button>
      <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.78rem', marginLeft: 4 }}>Page {page} / {totalPages}</span>
    </div>
  );
}

// ─── Dashboard Overview ──────────────────────────────────────────────────────

function DashboardTab({
  platform,
  articles = [],
  news = [],
  services = [],
  basagiServices = [],
  users = [],
  members = [],
  sfGallery = [],
  basagiGallery = [],
  testimonials = [],
  bookings = [],
  contacts = [],
  onNavigate
}) {
  const safeArticles = Array.isArray(articles) ? articles : [];
  const safeNews = Array.isArray(news) ? news : [];
  const safeServices = Array.isArray(services) ? services : [];
  const safeBasagiServices = Array.isArray(basagiServices) ? basagiServices : [];
  const safeUsers = Array.isArray(users) ? users : [];
  const safeMembers = Array.isArray(members) ? members : [];
  const safeSfGallery = Array.isArray(sfGallery) ? sfGallery : [];
  const safeBasagiGallery = Array.isArray(basagiGallery) ? basagiGallery : [];
  const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];
  const safeBookings = Array.isArray(bookings) ? bookings : [];
  const safeContacts = Array.isArray(contacts) ? contacts : [];

  let stats = [];

  if (platform === 'silver-fern') {
    stats = [
      { label: 'Blog Articles', value: safeArticles.length, trend: 'Published articles', tab: 'blog' },
      { label: 'News Items', value: safeNews.length, trend: 'News bulletins', tab: 'news' },
      { label: 'Services', value: safeServices.length, trend: 'Active agricultural services', tab: 'services' },
      { label: 'Gallery Images', value: safeSfGallery.length, trend: 'Silver Fern photos', tab: 'sf-gallery' },
      { label: 'Members', value: safeMembers.length, trend: 'Registered members', tab: 'members' },
      { label: 'Users', value: safeUsers.length, trend: `${safeUsers.filter(u => (u.status || '').toLowerCase() === 'active').length} active admin users`, tab: 'users' },
      { label: 'Contact Messages', value: safeContacts.length, trend: 'Form submissions', tab: 'contacts' },
    ];
  } else {
    stats = [
      { label: 'Services', value: safeBasagiServices.length, trend: 'Basagi media services', tab: 'services' },
      { label: 'Gallery Images', value: safeBasagiGallery.length, trend: 'Basagi photos', tab: 'basagi-gallery' },
      { label: 'Testimonials', value: safeTestimonials.length, trend: 'Customer reviews', tab: 'testimonials' },
      { label: 'Bookings', value: safeBookings.length, trend: 'Studio sessions', tab: 'bookings' },
      { label: 'Users', value: safeUsers.length, trend: `${safeUsers.filter(u => (u.status || '').toLowerCase() === 'active').length} active admin users`, tab: 'users' },
      { label: 'Contact Messages', value: safeContacts.length, trend: 'Form submissions', tab: 'contacts' },
    ];
  }

  return (
    <div className="admin-dashboard">
      <div>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: 800, margin: '0 0 8px' }}>
          Welcome back
        </h2>
        <p style={{ color: 'var(--admin-text-muted)', margin: 0 }}>
          <strong>Here's what's happening on your {platform === 'silver-fern' ? 'Silver Fern' : 'Basagi'} platform today.</strong>
        </p>
      </div>
      <div className="admin-stats-grid">
        {stats.map((s, i) => (
          <div className="admin-stat-card" key={i}>
            <div className="admin-stat-header">
              <h4>{s.label}</h4>
              {s.tab && onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate(s.tab)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid var(--admin-border)',
                    color: 'var(--admin-accent)',
                    padding: '3px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'var(--admin-accent)'; e.currentTarget.style.color = '#05070f'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = 'var(--admin-accent)'; }}
                >
                  View
                </button>
              )}
            </div>
            <p>{s.value}</p>
            <div className="admin-stat-trend trend-up">↑ {s.trend}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Blog / News Tab ─────────────────────────────────────────────────────────

function BlogTab({ items, setItems, categories, type }) {
  const safeItems = Array.isArray(items) ? items : [];
  const safeCategories = Array.isArray(categories) ? categories : [];

  const [form, setForm] = useState(null); // null = list view; obj = edit/create form
  const [saving, setSaving] = useState(false);
  const fileRef = useRef();

  const emptyForm = {
    id: null, title: '', excerpt: '', content: '', status: 'draft',
    category_id: '', type, image: null, imagePreview: ''
  };

  const openCreate = () => setForm({ ...emptyForm });
  const openEdit = (item) => setForm({
    id: item.id,
    title: item.title || '',
    excerpt: item.excerpt || '',
    content: item.content || '',
    status: item.status || 'draft',
    category_id: item.category_id || '',
    type,
    image: null,
    imagePreview: item.image || item.featured_image || ''
  });

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('excerpt', form.excerpt);
    fd.append('content', form.content);
    fd.append('status', form.status);
    fd.append('category_id', form.category_id || '');
    fd.append('type', form.type);
    if (form.image) fd.append('image', form.image);

    try {
      if (form.id) {
        fd.append('_method', 'PUT');
        const res = await fetch(`/api/admin/blog/${form.id}`, { method: 'POST', body: fd });
        if (res.ok) {
          const data = await res.json();
          const updatedItem = data.post || data;
          setItems(safeItems.map(i => i.id === form.id ? { ...i, ...updatedItem } : i));
        }
      } else {
        const res = await fetch('/api/admin/blog', { method: 'POST', body: fd });
        if (res.ok) {
          const data = await res.json();
          const createdItem = data.post || data;
          setItems([createdItem, ...safeItems]);
        }
      }
      setForm(null);
      window.location.reload();
    } catch (e) {
      console.error('Failed to save blog post:', e);
    }
    setSaving(false);
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    try {
      await fetch(`/api/admin/blog/${item.id}`, { method: 'DELETE' });
      setItems(safeItems.filter(i => i.id !== item.id));
      window.location.reload();
    } catch (e) {
      console.error('Failed to delete:', e);
    }
  };

  const handleDeleteAll = async () => {
    if (safeItems.length === 0) return;
    if (!window.confirm(`Delete ALL ${safeItems.length} items? This cannot be undone.`)) return;
    try {
      await Promise.all(safeItems.map(i => fetch(`/api/admin/blog/${i.id}`, { method: 'DELETE' })));
      setItems([]);
      setPage(1);
      window.location.reload();
    } catch (e) { console.error('Failed to delete all:', e); }
  };

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(safeItems.length / ITEMS_PER_PAGE);
  const pagedItems = safeItems.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const [viewItem, setViewItem] = useState(null);

  if (form !== null) {
    return (
      <div className="admin-panel-card" style={{ maxWidth: 700, animation: 'fadeIn 0.3s ease' }}>
        <div className="admin-panel-header">
          <h3>{form.id ? 'Edit Post' : 'New Post'}</h3>
          <button className="admin-btn-outline" onClick={() => setForm(null)}>← Back</button>
        </div>

        <div className="admin-form-group">
          <label>Title</label>
          <input className="admin-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Post title..." />
        </div>
        <div className="admin-form-group">
          <label>Sub Description</label>
          <textarea className="admin-input" rows={3} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} placeholder="Enter sub description / summary..." style={{ resize: 'vertical' }} />
        </div>
        <div className="admin-form-group">
          <label>Detailed Description</label>
          <textarea className="admin-input" rows={6} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Enter full detailed article content..." style={{ resize: 'vertical' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="admin-form-group">
            <label>Status</label>
            <select className="admin-input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label>Category</label>
            <select className="admin-input" value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })}>
              <option value="">— Select —</option>
              {safeCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>
        <div className="admin-form-group">
          <label>Featured Image</label>
          <input type="file" accept="image/*" ref={fileRef} style={{ display: 'none' }}
             onChange={e => {
               const f = e.target.files[0];
               if (f) setForm({ ...form, image: f, imagePreview: URL.createObjectURL(f) });
             }} />
          {form.imagePreview && (
            <img src={form.imagePreview} alt="preview" style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 10, marginBottom: 8 }} />
          )}
          <button className="admin-btn-outline" onClick={() => fileRef.current.click()}>
            {form.imagePreview ? 'Change Image' : 'Upload Image'}
          </button>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : form.id ? 'Update' : 'Create'}
          </button>
          <button className="admin-btn-outline" onClick={() => setForm(null)}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel-card" style={{ animation: 'fadeIn 0.3s ease' }}>
      {viewItem && (
        <ViewModal title={`${type === 'blog' ? 'Blog Article' : 'News'} Details`} onClose={() => setViewItem(null)}>
          {(viewItem.image || viewItem.featured_image) && (
            <div style={{ width: '100%', backgroundColor: '#090c15', borderRadius: 12, overflow: 'hidden', marginBottom: 16, border: '1px solid #2a3449', display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: 320 }}>
              <img src={viewItem.image || viewItem.featured_image} alt="" style={{ maxWidth: '100%', maxHeight: 320, objectFit: 'contain', display: 'block' }} />
            </div>
          )}
          <h4 style={{ margin: '0 0 16px 0', fontSize: '1.35rem', color: '#10b981', fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}>{viewItem.title}</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px', marginBottom: 16, background: '#182032', padding: '16px', borderRadius: 12, border: '1px solid #2a3449' }}>
            <ViewField label="Category" value={viewItem.category_name || viewItem.category || '—'} />
            <ViewField label="Status" value={viewItem.status} />
            <ViewField label="Author" value={viewItem.author || 'Admin User'} />
            <ViewField label="Date" value={viewItem.date || (viewItem.created_at ? new Date(viewItem.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—')} />
          </div>
          {(viewItem.excerpt || viewItem.description) && (
            <div style={{ marginBottom: 16, background: '#182032', padding: '16px', borderRadius: 12, border: '1px solid #2a3449' }}>
              <ViewField label="Sub Description" value={viewItem.excerpt || viewItem.description} />
            </div>
          )}
          {viewItem.content && (
            <div style={{ background: '#182032', padding: '16px', borderRadius: 12, border: '1px solid #2a3449' }}>
              <ViewField label="Detailed Description" value={viewItem.content} />
            </div>
          )}
        </ViewModal>
      )}
      <div className="admin-panel-header">
        <h3>{type === 'blog' ? 'Blog Articles' : 'News'}</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          {safeItems.length > 0 && (
            <button className="admin-btn-danger" onClick={handleDeleteAll}>Delete All</button>
          )}
          <button className="admin-btn-primary" onClick={openCreate}>+ New {type === 'blog' ? 'Article' : 'News'}</button>
        </div>
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: 70 }}>Image</th>
              <th>Title</th>
              <th>Sub Description</th>
              <th>Status</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {safeItems.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--admin-text-muted)', padding: 40 }}>No posts yet. Click "+ New" to add one.</td></tr>
            )}
            {pagedItems.map((item, i) => (
              <tr key={item.id || i}>
                <td>
                  {(item.image || item.featured_image) ? (
                    <img src={item.image || item.featured_image} alt="" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8 }} />
                  ) : <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>No img</span>}
                </td>
                <td><strong>{item.title}</strong></td>
                <td><small style={{ color: 'var(--admin-text-muted)' }}>{(item.excerpt || item.description || '—').slice(0, 70)}</small></td>
                <td><Badge status={item.status} /></td>
                <td style={{ color: 'var(--admin-text-muted)' }}>{item.category_name || item.category || '—'}</td>
                <td>
                  <div className="admin-actions-cell">
                    <button className="admin-btn-icon" title="View details" onClick={() => setViewItem(item)} style={{ color: '#60a5fa' }}>View</button>
                    <button className="admin-btn-icon" title="Edit" onClick={() => openEdit(item)}>Edit</button>
                    <button className="admin-btn-icon" title="Delete" onClick={() => handleDelete(item)} style={{ color: '#ef4444' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages} onPage={setPage} />
    </div>
  );
}

// ─── Services Tab ─────────────────────────────────────────────────────────────

function ServicesTab({ services, setServices, platform }) {
  const safeServices = Array.isArray(services) ? services : [];
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef();

  const emptyForm = { id: null, title: '', short_description: '', description: '', status: 'active', image: null, imagePreview: '', type: platform };

  const openCreate = () => setForm({ ...emptyForm });
  const openEdit = (svc) => setForm({
    id: svc.id, title: svc.title || svc.name || '',
    short_description: svc.short_description || svc.desc || '',
    description: svc.description || '',
    status: svc.status || 'active', image: null,
    imagePreview: svc.icon || svc.image_url || '',
    type: svc.type || platform
  });

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    
    const fd = new FormData();
    fd.append('name', form.title);
    fd.append('title', form.title);
    fd.append('desc', form.short_description);
    fd.append('short_description', form.short_description);
    fd.append('description', form.description);
    fd.append('status', form.status);
    fd.append('type', form.type || platform);
    if (form.image) fd.append('image', form.image);

    try {
      if (form.id) {
        fd.append('_method', 'PUT');
        const res = await fetch(`/api/admin/services/${form.id}`, { method: 'POST', body: fd });
        if (res.ok) {
          const data = await res.json();
          const updatedSvc = data.service || data;
          setServices(safeServices.map(s => s.id === form.id ? { ...s, ...updatedSvc } : s));
        }
      } else {
        const res = await fetch('/api/admin/services', { method: 'POST', body: fd });
        if (res.ok) {
          const data = await res.json();
          const createdSvc = data.service || data;
          setServices([createdSvc, ...safeServices]);
        }
      }
      setForm(null);
      window.location.reload();
    } catch (e) {
      console.error('Failed to save service:', e);
    }
    setSaving(false);
  };

  const handleDelete = async (svc) => {
    if (!window.confirm(`Delete "${svc.title || svc.name}"?`)) return;
    try {
      await fetch(`/api/admin/services/${svc.id}`, { method: 'DELETE' });
      setServices(safeServices.filter(s => s.id !== svc.id));
      window.location.reload();
    } catch (e) {
      console.error('Failed to delete:', e);
    }
  };

  const handleDeleteAll = async () => {
    if (safeServices.length === 0) return;
    if (!window.confirm(`Delete ALL ${safeServices.length} services? This cannot be undone.`)) return;
    try {
      await Promise.all(safeServices.map(s => fetch(`/api/admin/services/${s.id}`, { method: 'DELETE' })));
      setServices([]);
      setPage(1);
      window.location.reload();
    } catch (e) { console.error('Failed to delete all:', e); }
  };

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(safeServices.length / ITEMS_PER_PAGE);
  const pagedServices = safeServices.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const [viewItem, setViewItem] = useState(null);

  if (form !== null) {
    return (
      <div className="admin-panel-card" style={{ maxWidth: 700, animation: 'fadeIn 0.3s ease' }}>
        <div className="admin-panel-header">
          <h3>{form.id ? 'Edit Service' : 'New Service'}</h3>
          <button className="admin-btn-outline" onClick={() => setForm(null)}>← Back</button>
        </div>
        <div className="admin-form-group">
          <label>Title</label>
          <input className="admin-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Service name..." />
        </div>
        <div className="admin-form-group">
          <label>Sub Description</label>
          <textarea className="admin-input" rows={3} value={form.short_description} onChange={e => setForm({ ...form, short_description: e.target.value })} placeholder="Enter sub description..." style={{ resize: 'vertical' }} />
        </div>
        <div className="admin-form-group">
          <label>Detailed Description</label>
          <textarea className="admin-input" rows={5} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Enter detailed description for inner page..." style={{ resize: 'vertical' }} />
        </div>
        <div className="admin-form-group">
          <label>Status</label>
          <select className="admin-input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="admin-form-group">
          <label>Service Icon / Image</label>
          <input type="file" accept="image/*" ref={fileRef} style={{ display: 'none' }}
            onChange={e => {
              const f = e.target.files[0];
              if (f) setForm({ ...form, image: f, imagePreview: URL.createObjectURL(f) });
            }} />
          {form.imagePreview && (
            <img src={form.imagePreview} alt="preview" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 10, marginBottom: 8 }} />
          )}
          <br />
          <button className="admin-btn-outline" onClick={() => fileRef.current.click()}>
            {form.imagePreview ? 'Change Image' : 'Upload Image'}
          </button>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : form.id ? 'Update' : 'Create'}
          </button>
          <button className="admin-btn-outline" onClick={() => setForm(null)}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel-card" style={{ animation: 'fadeIn 0.3s ease' }}>
      {viewItem && (
        <ViewModal title="Service Details" onClose={() => setViewItem(null)}>
          {(viewItem.icon || viewItem.image_url) && (
            <div style={{ width: '100%', backgroundColor: '#090c15', borderRadius: 12, overflow: 'hidden', marginBottom: 16, border: '1px solid #2a3449', display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: 200, padding: 12 }}>
              <img src={viewItem.icon || viewItem.image_url} alt="" style={{ maxWidth: '100%', maxHeight: 180, objectFit: 'contain', display: 'block' }} />
            </div>
          )}
          <h4 style={{ margin: '0 0 12px 0', fontSize: '1.2rem', color: 'var(--admin-accent)' }}>{viewItem.title || viewItem.name}</h4>
          <ViewField label="Status" value={viewItem.status} />
          <ViewField label="Sub Description" value={viewItem.short_description || viewItem.desc} />
          <ViewField label="Detailed Description" value={viewItem.description || 'No detailed description provided.'} />
        </ViewModal>
      )}
      <div className="admin-panel-header">
        <h3>Services</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          {safeServices.length > 0 && (
            <button className="admin-btn-danger" onClick={handleDeleteAll}>Delete All</button>
          )}
          <button className="admin-btn-primary" onClick={openCreate}>+ New Service</button>
        </div>
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Name</th>
              <th>Sub Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {safeServices.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--admin-text-muted)', padding: 40 }}>No services yet.</td></tr>
            )}
            {pagedServices.map((svc, i) => (
              <tr key={svc.id || i}>
                <td>
                  {(svc.icon || svc.image_url) ? (
                    <img src={svc.icon || svc.image_url} alt="" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 8 }} />
                  ) : <span style={{ fontSize: '1rem', color: 'var(--admin-text-muted)' }}>No image</span>}
                </td>
                <td><strong>{svc.title || svc.name}</strong></td>
                <td><small style={{ color: 'var(--admin-text-muted)' }}>{(svc.short_description || svc.desc || '—').slice(0, 70)}</small></td>
                <td><Badge status={svc.status} /></td>
                <td>
                  <div className="admin-actions-cell">
                    <button className="admin-btn-icon" title="View details" onClick={() => setViewItem(svc)} style={{ color: '#60a5fa' }}>View</button>
                    <button className="admin-btn-icon" title="Edit" onClick={() => openEdit(svc)}>Edit</button>
                    <button className="admin-btn-icon" title="Delete" onClick={() => handleDelete(svc)} style={{ color: '#ef4444' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages} onPage={setPage} />
    </div>
  );
}

// ─── Gallery Tab ──────────────────────────────────────────────────────────────

function GalleryTab({ items = [], setItems, platform }) {
  const safeItems = Array.isArray(items) ? items.filter(Boolean) : [];
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileRef = useRef();
  const [page, setPage] = useState(1);
  const [viewItem, setViewItem] = useState(null);

  const emptyForm = {
    id: null, platform, image: null, imagePreview: '',
    title: '', caption: '', status: 'Active'
  };

  const openCreate = () => { setErrorMsg(''); setForm({ ...emptyForm }); };
  const openEdit = (item) => {
    setErrorMsg('');
    setForm({
      id: item.id,
      platform,
      image: null,
      imagePreview: item.image_url || item.file_path || '',
      title: item.title || '',
      caption: item.caption || '',
      status: item.status || 'Active',
    });
  };

  const handleSave = async () => {
    setErrorMsg('');
    if (!form.imagePreview) { setErrorMsg('Please upload an image.'); return; }
    
    // Client-side image limit validation
    if (form.status === 'Active') {
      const activeCount = safeItems.filter(i => (i.status === 'Active' || i.status === 'active') && i.id !== form.id).length;
      if (activeCount >= 4) {
        setErrorMsg('Only 4 active images are allowed in the gallery. Please deactivate another image first.');
        return;
      }
    }
    
    setSaving(true);
    const fd = new FormData();
    fd.append('title', form.title || '');
    fd.append('caption', form.caption || '');
    fd.append('status', form.status || 'Active');
    fd.append('type', platform);
    if (form.image) fd.append('image', form.image);

    try {
      if (form.id) {
        fd.append('_method', 'PUT');
        const res = await fetch(`/api/admin/gallery/${form.id}`, { method: 'POST', body: fd });
        if (res.ok) {
          const updated = await res.json();
          setItems(safeItems.map(i => i.id === form.id ? { ...i, ...updated } : i));
        } else {
          setErrorMsg('Failed to update. Please try again.');
          setSaving(false); return;
        }
      } else {
        const res = await fetch('/api/admin/gallery', { method: 'POST', body: fd });
        if (res.ok) {
          const created = await res.json();
          setItems([created, ...safeItems]);
        } else {
          setErrorMsg('Failed to add image. Please try again.');
          setSaving(false); return;
        }
      }
      setForm(null);
      window.location.reload();
    } catch (e) {
      console.error('Failed to save gallery item:', e);
      setErrorMsg('An unexpected error occurred.');
    }
    setSaving(false);
  };

  const handleToggleStatus = async (item) => {
    const newStatus = item.status === 'Active' ? 'Inactive' : 'Active';
    if (newStatus === 'Active') {
      const activeCount = safeItems.filter(i => (i.status === 'Active' || i.status === 'active') && i.id !== item.id).length;
      if (activeCount >= 4) {
        alert('Only 4 active images are allowed in the gallery. Please deactivate another image first.');
        return;
      }
    }
    try {
      const fd = new FormData();
      fd.append('status', newStatus);
      fd.append('type', platform);
      fd.append('_method', 'PUT');
      const res = await fetch(`/api/admin/gallery/${item.id}`, { method: 'POST', body: fd });
      if (res.ok) {
        const updated = await res.json();
        setItems(safeItems.map(i => i.id === item.id ? { ...i, ...updated } : i));
        window.location.reload();
      } else {
        const errData = await res.json();
        alert(errData.message || 'Failed to update status.');
      }
    } catch (e) {
      console.error(e);
      alert('An unexpected error occurred.');
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Remove this image?`)) return;
    try {
      await fetch(`/api/admin/gallery/${item.id}`, { method: 'DELETE' });
      setItems(safeItems.filter(i => i.id !== item.id));
      window.location.reload();
    } catch (e) {
      console.error('Failed to delete:', e);
    }
  };

  const handleDeleteAll = async () => {
    if (safeItems.length === 0) return;
    if (!window.confirm(`Delete ALL ${safeItems.length} gallery images? This cannot be undone.`)) return;
    try {
      await Promise.all(safeItems.map(i => fetch(`/api/admin/gallery/${i.id}`, { method: 'DELETE' })));
      setItems([]);
      setPage(1);
      window.location.reload();
    } catch (e) {
      console.error('Failed to delete all:', e);
    }
  };

  const totalPages = Math.ceil(safeItems.length / ITEMS_PER_PAGE);
  const pagedItems = safeItems.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // ── Edit / Add Form ──
  if (form !== null) {
    return (
      <div className="admin-panel-card" style={{ maxWidth: 680, animation: 'fadeIn 0.3s ease' }}>
        <div className="admin-panel-header">
          <h3>{form.id ? '✏️ Edit Gallery Image' : '🖼 Add New Image'}</h3>
          <button className="admin-btn-outline" onClick={() => setForm(null)}>← Back</button>
        </div>

        {errorMsg && (
          <div style={{
            background: 'rgba(239,68,68,0.12)', border: '1px solid #ef4444',
            color: '#ef4444', padding: '10px 16px', borderRadius: 8,
            marginBottom: 16, fontSize: '0.88rem', fontWeight: 600
          }}>{errorMsg}</div>
        )}

        {/* Image Upload */}
        <div className="admin-form-group">
          <label>Image {!form.id && <span style={{ color: '#ef4444' }}>*</span>}</label>
          <input type="file" accept="image/*" ref={fileRef} style={{ display: 'none' }}
            onChange={e => {
              const f = e.target.files[0];
              if (f) setForm({ ...form, image: f, imagePreview: URL.createObjectURL(f) });
            }} />
          {form.imagePreview ? (
            <div style={{ position: 'relative', marginBottom: 12 }}>
              <img src={form.imagePreview} alt="preview"
                style={{ width: '100%', maxHeight: 280, objectFit: 'cover', borderRadius: 12, display: 'block' }} />
              <button onClick={() => fileRef.current.click()} style={{
                position: 'absolute', bottom: 10, right: 10,
                background: 'rgba(0,0,0,0.7)', color: '#fff', border: 'none',
                borderRadius: 8, padding: '6px 16px', cursor: 'pointer', fontWeight: 700,
                fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 6
              }}>
                🔄 Change Image
              </button>
            </div>
          ) : (
            <div onClick={() => fileRef.current.click()} style={{
              border: '2px dashed var(--admin-border)', borderRadius: 12, padding: '60px 20px',
              textAlign: 'center', cursor: 'pointer', color: 'var(--admin-text-muted)',
              transition: 'border-color 0.2s, background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--admin-accent)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--admin-border)'}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>📸</div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: '1rem' }}>Click to upload image</p>
              <p style={{ margin: '6px 0 0', fontSize: '0.83rem' }}>PNG, JPG, WebP · Max 10MB</p>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="admin-form-group">
          <label>Title <span style={{ color: 'var(--admin-text-muted)', fontWeight: 400 }}>(optional)</span></label>
          <input
            className="admin-input"
            type="text"
            placeholder="e.g. Studio Recording Session"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Caption */}
        <div className="admin-form-group">
          <label>Caption <span style={{ color: 'var(--admin-text-muted)', fontWeight: 400 }}>(optional)</span></label>
          <textarea
            className="admin-input"
            rows={3}
            placeholder="Describe this image..."
            value={form.caption}
            style={{ resize: 'vertical', minHeight: 80 }}
            onChange={e => setForm({ ...form, caption: e.target.value })}
          />
        </div>

        {/* Status */}
        <div className="admin-form-group">
          <label>Status</label>
          <select
            className="admin-input"
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button className="admin-btn-primary" onClick={handleSave} disabled={saving || !form.imagePreview}>
            {saving ? 'Saving...' : form.id ? '✓ Update Image' : '+ Add to Gallery'}
          </button>
          <button className="admin-btn-outline" onClick={() => setForm(null)}>Cancel</button>
        </div>
      </div>
    );
  }

  // ── Gallery Grid View ──
  return (
    <div className="admin-panel-card" style={{ animation: 'fadeIn 0.3s ease' }}>
      {viewItem && (
        <ViewModal title="Gallery Image Details" onClose={() => setViewItem(null)}>
          <img
            src={viewItem.image_url || viewItem.file_path || viewItem.image?.file_path || ''}
            alt={viewItem.title || ''}
            style={{ width: '100%', maxHeight: 300, objectFit: 'contain', borderRadius: 12, marginBottom: 16, border: '1px solid var(--admin-border)', background: '#000' }}
          />
          <h4 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', color: 'var(--admin-accent)' }}>{viewItem.title || 'Untitled'}</h4>
          <ViewField label="Caption" value={viewItem.caption || 'No caption'} />
          <ViewField label="Status" value={viewItem.status} />
        </ViewModal>
      )}
      <div className="admin-panel-header">
        <div>
          <h3>{platform === 'silver-fern' ? 'Silver Fern' : 'Basagi'} Gallery</h3>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.83rem', margin: '4px 0 0' }}>
            {safeItems.length} image{safeItems.length !== 1 ? 's' : ''} uploaded
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {safeItems.length > 0 && (
            <button className="admin-btn-danger" onClick={handleDeleteAll}>Delete All</button>
          )}
          <button className="admin-btn-primary" onClick={openCreate}>+ Add Image</button>
        </div>
      </div>

      {safeItems.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px 20px', color: 'var(--admin-text-muted)',
          border: '2px dashed var(--admin-border)', borderRadius: 16, marginTop: 8
        }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>🖼</div>
          <p style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 4px' }}>No images yet</p>
          <p style={{ fontSize: '0.85rem', margin: 0 }}>Click "+ Add Image" to upload your first gallery photo</p>
        </div>
      ) : (
        <>
          {/* Grid of cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 16, marginTop: 8
          }}>
            {pagedItems.map((item, idx) => (
              <div key={item.id || idx} style={{
                position: 'relative', borderRadius: 12, overflow: 'hidden',
                border: '1px solid var(--admin-border)',
                background: 'rgba(255,255,255,0.03)',
                aspectRatio: '1 / 1',
                transition: 'box-shadow 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.querySelector('.gallery-card-actions').style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.querySelector('.gallery-card-actions').style.opacity = '0'}
              >
                {/* Thumbnail */}
                <img
                  src={item.image_url || item.file_path || item.image?.file_path || ''}
                  alt={item.title || 'Gallery image'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={e => { e.target.src = '/assets/u1.png'; }}
                />

                {/* Status badge */}
                {item.status && (
                  <span style={{
                    position: 'absolute', top: 8, left: 8,
                    background: item.status === 'Active' ? '#16a34a' : '#6b7280',
                    color: '#fff', fontSize: '0.65rem', fontWeight: 700,
                    padding: '2px 8px', borderRadius: 20, textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>{item.status}</span>
                )}

                {/* Hover action overlay */}
                <div className="gallery-card-actions" style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0.6)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: 10, opacity: 0,
                  transition: 'opacity 0.25s ease'
                }}>
                  {item.title && (
                    <p style={{
                      color: '#fff', fontSize: '0.78rem', fontWeight: 600,
                      margin: '0 0 4px', textAlign: 'center', padding: '0 12px',
                      maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                    }}>{item.title}</p>
                  )}
                  <button
                    onClick={() => handleToggleStatus(item)}
                    style={{
                      background: item.status === 'Active' ? 'rgba(107,114,128,0.3)' : '#16a34a',
                      color: '#fff',
                      border: 'none', borderRadius: 8, padding: '7px 20px',
                      fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem', width: '80%'
                    }}
                  >
                    🔄 {item.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => setViewItem(item)}
                    style={{
                      background: 'rgba(96,165,250,0.2)', color: '#60a5fa',
                      border: '1px solid rgba(96,165,250,0.4)',
                      borderRadius: 8, padding: '7px 20px',
                      fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem', width: '80%'
                    }}
                  >👁 View</button>
                  <button
                    onClick={() => openEdit(item)}
                    style={{
                      background: 'var(--admin-accent)', color: '#05050a',
                      border: 'none', borderRadius: 8, padding: '7px 20px',
                      fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem', width: '80%'
                    }}
                  >✏️ Edit</button>
                  <button
                    onClick={() => handleDelete(item)}
                    style={{
                      background: 'rgba(239,68,68,0.15)', color: '#ef4444',
                      border: '1px solid rgba(239,68,68,0.4)',
                      borderRadius: 8, padding: '7px 20px',
                      fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem', width: '80%'
                    }}
                  >🗑 Delete</button>
                </div>
              </div>
            ))}
          </div>

          <Pagination page={page} totalPages={totalPages} onPage={setPage} />
        </>
      )}
    </div>
  );
}

// ─── Users Tab ────────────────────────────────────────────────────────────────

function UsersTab({ users, setUsers }) {
  const safeUsers = Array.isArray(users) ? users : [];
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const emptyForm = { id: null, name: '', email: '', password: '', role: 'Member', status: 'Active' };
  const openCreate = () => { setErrorMsg(''); setForm({ ...emptyForm }); };
  const openEdit = (u) => { setErrorMsg(''); setForm({ id: u.id, name: u.name || '', email: u.email || '', password: '', role: u.role || 'Member', status: u.status || 'Active' }); };

  const handleSave = async () => {
    setErrorMsg('');
    if (!form.name || !form.name.trim()) {
      setErrorMsg('Full Name is required.');
      return;
    }
    const nameRegex = /^[a-zA-Z\s]{2,100}$/;
    if (!nameRegex.test(form.name.trim())) {
      setErrorMsg('Full Name must contain only letters and spaces (min 2 characters).');
      return;
    }
    if (!form.email || !form.email.trim()) {
      setErrorMsg('Email address is required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!form.id && (!form.password || form.password.length < 6)) {
      setErrorMsg('Password is required and must be at least 6 characters.');
      return;
    }
    if (form.password && form.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    setSaving(true);
    const body = { name: form.name.trim(), email: form.email.trim(), role: form.role.toLowerCase(), status: form.status.toLowerCase() };
    if (form.password) body.password = form.password;

    try {
      if (form.id) {
        const res = await fetch(`/api/admin/users/${form.id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(body)
        });
        if (res.ok) {
          const data = await res.json();
          const actualUser = data.user || data;
          setUsers(safeUsers.map(u => u.id === form.id ? { ...u, ...actualUser } : u));
          setForm(null);
          window.location.reload();
        } else {
          const errData = await res.json();
          setErrorMsg(errData.message || 'Failed to update user.');
        }
      } else {
        const res = await fetch('/api/admin/users', {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(body)
        });
        if (res.ok) {
          const data = await res.json();
          const actualUser = data.user || data;
          setUsers([actualUser, ...safeUsers]);
          setForm(null);
          window.location.reload();
        } else {
          const errData = await res.json();
          setErrorMsg(errData.message || 'Failed to create user.');
        }
      }
    } catch (e) {
      console.error(e);
      setErrorMsg('Connection error.');
    }
    setSaving(false);
  };

  const handleDelete = async (u) => {
    if (!window.confirm(`Delete user "${u.name}"?`)) return;
    try {
      await fetch(`/api/admin/users/${u.id}`, { method: 'DELETE' });
      setUsers(safeUsers.filter(x => x.id !== u.id));
      window.location.reload();
    } catch (e) { console.error(e); }
  };

  const handleDeleteAll = async () => {
    if (safeUsers.length === 0) return;
    if (!window.confirm(`Delete ALL ${safeUsers.length} users? This cannot be undone.`)) return;
    try {
      await Promise.all(safeUsers.map(u => fetch(`/api/admin/users/${u.id}`, { method: 'DELETE' })));
      setUsers([]);
      setPage(1);
      window.location.reload();
    } catch (e) { console.error('Failed to delete all:', e); }
  };

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(safeUsers.length / ITEMS_PER_PAGE);
  const pagedUsers = safeUsers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const [viewUser, setViewUser] = useState(null);

  if (form !== null) {
    return (
      <div className="admin-panel-card" style={{ maxWidth: 600, animation: 'fadeIn 0.3s ease' }}>
        <div className="admin-panel-header">
          <h3>{form.id ? 'Edit User' : 'New User'}</h3>
          <button className="admin-btn-outline" onClick={() => setForm(null)}>← Back</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="admin-form-group">
            <label>Full Name</label>
            <input className="admin-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" />
          </div>
          <div className="admin-form-group">
            <label>Email</label>
            <input className="admin-input" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@example.com" />
          </div>
          <div className="admin-form-group">
            <label>Password {form.id && <span style={{ fontWeight: 400, color: 'var(--admin-text-muted)' }}>(leave blank to keep)</span>}</label>
            <input className="admin-input" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
          </div>
          <div className="admin-form-group">
            <label>Role</label>
            <select className="admin-input" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
              <option>Admin</option>
              <option>Member</option>
              <option>Editor</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label>Status</label>
            <select className="admin-input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
        {errorMsg && (
          <div style={{ color: '#ef4444', fontSize: '0.88rem', fontWeight: 600, marginBottom: 12 }}>
            ⚠️ {errorMsg}
          </div>
        )}
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : form.id ? 'Update' : 'Create User'}
          </button>
          <button className="admin-btn-outline" onClick={() => { setForm(null); setErrorMsg(''); }}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel-card" style={{ animation: 'fadeIn 0.3s ease' }}>
      {viewUser && (
        <ViewModal title="User Details" onClose={() => setViewUser(null)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--admin-border)' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--admin-accent), #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', fontWeight: 800, color: '#05050a', flexShrink: 0
            }}>{(viewUser.name || 'U')[0].toUpperCase()}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{viewUser.name}</div>
              <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.88rem' }}>{viewUser.email}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
            <ViewField label="Role" value={viewUser.role || 'Member'} />
            <ViewField label="Status" value={viewUser.status || 'Active'} />
            <ViewField label="User ID" value={`#${viewUser.id}`} mono />
            <ViewField label="Created" value={viewUser.created_at ? new Date(viewUser.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'} />
          </div>
        </ViewModal>
      )}
      <div className="admin-panel-header">
        <h3>Users</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          {safeUsers.length > 0 && (
            <button className="admin-btn-danger" onClick={handleDeleteAll}>Delete All</button>
          )}
          <button className="admin-btn-primary" onClick={openCreate}>+ New User</button>
        </div>
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {safeUsers.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--admin-text-muted)', padding: 40 }}>No users found.</td></tr>
            )}
            {pagedUsers.map((u, i) => (
              <tr key={u.id || i}>
                <td><strong>{u.name}</strong></td>
                <td style={{ color: 'var(--admin-text-muted)' }}>{u.email}</td>
                <td><Badge status={u.role || 'Member'} /></td>
                <td><Badge status={u.status || 'Active'} /></td>
                <td>
                  <div className="admin-actions-cell">
                    <button className="admin-btn-icon" title="View details" onClick={() => setViewUser(u)} style={{ color: '#60a5fa' }}>View</button>
                    <button className="admin-btn-icon" onClick={() => openEdit(u)}>Edit</button>
                    <button className="admin-btn-icon" onClick={() => handleDelete(u)} style={{ color: '#ef4444' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages} onPage={setPage} />
    </div>
  );
}

// ─── Members Tab ──────────────────────────────────────────────────────────────

function MembersTab({ members, setMembers }) {
  const safeMembers = Array.isArray(members) ? members : [];
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileRef = useRef();

  const emptyForm = { id: null, name: '', title: '', type: 'leadership', order: '', image: '', imagePreview: '' };
  const openCreate = () => { setErrorMsg(''); setForm({ ...emptyForm }); };
  const openEdit = (m) => {
    setErrorMsg('');
    setForm({
      id: m.id,
      name: m.name || '',
      title: m.title || '',
      type: m.type || 'leadership',
      order: m.order || '',
      image: '',
      imagePreview: m.image || ''
    });
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleSave = async () => {
    setErrorMsg('');
    if (!form.name || !form.name.trim()) {
      setErrorMsg('Full Name is required.');
      return;
    }
    const nameRegex = /^[a-zA-Z\s]{2,100}$/;
    if (!nameRegex.test(form.name.trim())) {
      setErrorMsg('Full Name must contain only letters and spaces (min 2 characters).');
      return;
    }
    if (!form.title || !form.title.trim()) {
      setErrorMsg('Title / Position is required.');
      return;
    }

    // Client-side duplicate check
    const duplicate = safeMembers.find(m => 
      m.id !== form.id && 
      m.title.trim().toLowerCase() === form.title.trim().toLowerCase()
    );
    if (duplicate) {
      setErrorMsg(`The position "${form.title.trim()}" is already assigned to ${duplicate.name}.`);
      return;
    }

    setSaving(true);

    const body = {
      name: form.name.trim(),
      title: form.title.trim(),
      type: form.type,
    };
    if (form.order) body.order = parseInt(form.order, 10);
    if (form.image) body.image = form.image; // Base64 string

    try {
      if (form.id) {
        const res = await fetch(`/api/admin/members/${form.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(body)
        });
        if (res.ok) {
          const data = await res.json();
          const actualMember = data.member || data;
          setMembers(safeMembers.map(m => m.id === form.id ? { ...m, ...actualMember } : m));
          setForm(null);
          window.location.reload();
        } else {
          const errData = await res.json();
          setErrorMsg(errData.message || (errData.errors && Object.values(errData.errors)[0] && Object.values(errData.errors)[0][0]) || 'Failed to update member.');
        }
      } else {
        const res = await fetch('/api/admin/members', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(body)
        });
        if (res.ok) {
          const data = await res.json();
          const actualMember = data.member || data;
          setMembers([actualMember, ...safeMembers]);
          setForm(null);
          window.location.reload();
        } else {
          const errData = await res.json();
          setErrorMsg(errData.message || (errData.errors && Object.values(errData.errors)[0] && Object.values(errData.errors)[0][0]) || 'Failed to create member.');
        }
      }
    } catch (e) {
      console.error(e);
      setErrorMsg('An unexpected network error occurred.');
    }
    setSaving(false);
  };

  const handleDelete = async (m) => {
    if (!window.confirm(`Remove member "${m.name}"?`)) return;
    try {
      await fetch(`/api/admin/members/${m.id}`, { method: 'DELETE' });
      setMembers(safeMembers.filter(x => x.id !== m.id));
      window.location.reload();
    } catch (e) { console.error(e); }
  };

  const handleDeleteAll = async () => {
    if (safeMembers.length === 0) return;
    if (!window.confirm(`Delete ALL ${safeMembers.length} members? This cannot be undone.`)) return;
    try {
      await Promise.all(safeMembers.map(m => fetch(`/api/admin/members/${m.id}`, { method: 'DELETE' })));
      setMembers([]);
      setPage(1);
      window.location.reload();
    } catch (e) { console.error('Failed to delete all:', e); }
  };

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(safeMembers.length / ITEMS_PER_PAGE);
  const pagedMembers = safeMembers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const [viewItem, setViewItem] = useState(null);

  if (form !== null) {
    return (
      <div className="admin-panel-card" style={{ maxWidth: 600, animation: 'fadeIn 0.3s ease' }}>
        <div className="admin-panel-header">
          <h3>{form.id ? 'Edit Member' : 'New Member'}</h3>
          <button className="admin-btn-outline" onClick={() => setForm(null)}>← Back</button>
        </div>

        <div className="admin-form-group">
          <label>Photo</label>
          <input type="file" accept="image/*" ref={fileRef} style={{ display: 'none' }}
            onChange={async (e) => {
              const f = e.target.files[0];
              if (f) {
                const b64 = await getBase64(f);
                setForm({ ...form, image: b64, imagePreview: URL.createObjectURL(f) });
              }
            }} />
          {form.imagePreview ? (
            <div style={{ position: 'relative', marginBottom: 12 }}>
              <img src={form.imagePreview} alt="preview"
                style={{ width: '100%', maxHeight: 260, objectFit: 'cover', borderRadius: 12, display: 'block' }} />
              <button onClick={() => fileRef.current.click()} style={{
                position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.6)',
                color: '#fff', border: 'none', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontWeight: 600
              }}>Change</button>
            </div>
          ) : (
            <div onClick={() => fileRef.current.click()} style={{
              border: '2px dashed var(--admin-border)', borderRadius: 12, padding: '60px 20px',
              textAlign: 'center', cursor: 'pointer', color: 'var(--admin-text-muted)',
              transition: 'border-color 0.2s'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>+</div>
              <p style={{ margin: 0, fontWeight: 600 }}>Click to upload member photo</p>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>PNG, JPG, WebP supported</p>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="admin-form-group">
            <label>Full Name</label>
            <input className="admin-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" required />
          </div>
          <div className="admin-form-group">
            <label>Title / Position</label>
            <input className="admin-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="CEO & Founder" required />
          </div>
          <div className="admin-form-group">
            <label>Type</label>
            <select className="admin-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option value="leadership">Leadership Team</option>
              <option value="founding">Founding Member</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label>Display Order (optional)</label>
            <input className="admin-input" type="number" value={form.order} onChange={e => setForm({ ...form, order: e.target.value })} placeholder="e.g. 1" />
          </div>
        </div>
        
        {errorMsg && (
          <div style={{ color: '#ef4444', fontSize: '0.88rem', fontWeight: 600, marginBottom: 12 }}>
            ⚠️ {errorMsg}
          </div>
        )}
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : form.id ? 'Update' : 'Create Member'}
          </button>
          <button className="admin-btn-outline" onClick={() => { setForm(null); setErrorMsg(''); }}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel-card" style={{ animation: 'fadeIn 0.3s ease' }}>
      {viewItem && (
        <ViewModal title="Member Details" onClose={() => setViewItem(null)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--admin-border)' }}>
            <img
              src={viewItem.image || '/assets/a1.png'}
              alt={viewItem.name}
              style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--admin-accent)' }}
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.2rem', color: '#fff' }}>{viewItem.name}</div>
              <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>{viewItem.title || 'No title'}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
            <ViewField label="Type" value={viewItem.type || 'Leadership'} />
            <ViewField label="Display Order" value={viewItem.order || '0'} />
          </div>
        </ViewModal>
      )}
      <div className="admin-panel-header">
        <h3>Members</h3>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>{safeMembers.length} registered</span>
          {safeMembers.length > 0 && (
            <button className="admin-btn-danger" onClick={handleDeleteAll}>Delete All</button>
          )}
          <button className="admin-btn-primary" onClick={openCreate}>+ Add Member</button>
        </div>
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '100px' }}>Photo</th>
              <th>Name</th>
              <th>Title / Position</th>
              <th>Type</th>
              <th>Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {safeMembers.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--admin-text-muted)', padding: 40 }}>No members registered yet.</td></tr>
            )}
            {pagedMembers.map((m, i) => (
              <tr key={m.id || i}>
                <td>
                  <img
                    src={m.image || (i % 2 === 0 ? '/assets/a2.jpg' : '/assets/a1.png')}
                    alt={m.name}
                    style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }}
                  />
                </td>
                <td><strong>{m.name}</strong></td>
                <td style={{ color: 'var(--admin-text-muted)' }}>{m.title || '—'}</td>
                <td>
                  <span className="admin-badge badge-info" style={{ textTransform: 'capitalize' }}>
                    {m.type || 'leadership'}
                  </span>
                </td>
                <td>{m.order || '—'}</td>
                <td>
                  <div className="admin-actions-cell">
                    <button className="admin-btn-icon" title="View details" onClick={() => setViewItem(m)} style={{ color: '#60a5fa' }}>View</button>
                    <button className="admin-btn-icon" title="Edit" onClick={() => openEdit(m)}>Edit</button>
                    <button className="admin-btn-icon" title="Delete" onClick={() => handleDelete(m)} style={{ color: '#ef4444' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages} onPage={setPage} />
    </div>
  );
}

// ─── Testimonials Tab ─────────────────────────────────────────────────────────

function TestimonialsTab({ testimonials, setTestimonials, platform }) {
  const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileRef = useRef();

  const emptyForm = { id: null, name: '', role: '', text: '', platform, order: '', image: '', imagePreview: '' };
  const openCreate = () => { setErrorMsg(''); setForm({ ...emptyForm }); };
  const openEdit = (t) => {
    setErrorMsg('');
    setForm({
      id: t.id,
      name: t.name || '',
      role: t.role || '',
      text: t.text || '',
      platform,
      order: t.order || '',
      image: '',
      imagePreview: t.image || ''
    });
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleSave = async () => {
    setErrorMsg('');
    if (!form.name || !form.name.trim()) {
      setErrorMsg('Name is required.');
      return;
    }
    const nameRegex = /^[a-zA-Z\s]{2,100}$/;
    if (!nameRegex.test(form.name.trim())) {
      setErrorMsg('Name must contain only letters and spaces (min 2 characters).');
      return;
    }
    if (!form.text || !form.text.trim()) {
      setErrorMsg('Testimonial text is required.');
      return;
    }
    setSaving(true);

    const body = {
      name: form.name.trim(),
      role: form.role,
      text: form.text.trim(),
      platform,
    };
    if (form.order) body.order = parseInt(form.order, 10);
    if (form.image) body.image = form.image; // Base64 string

    try {
      if (form.id) {
        const res = await fetch(`/api/admin/testimonials/${form.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(body)
        });
        if (res.ok) {
          const data = await res.json();
          const actualTestimonial = data.testimonial || data;
          setTestimonials(safeTestimonials.map(t => t.id === form.id ? { ...t, ...actualTestimonial } : t));
        }
      } else {
        const res = await fetch('/api/admin/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(body)
        });
        if (res.ok) {
          const data = await res.json();
          const actualTestimonial = data.testimonial || data;
          setTestimonials([actualTestimonial, ...safeTestimonials]);
        }
      }
      setForm(null);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  const handleDelete = async (t) => {
    if (!window.confirm(`Remove testimonial from "${t.name}"?`)) return;
    try {
      await fetch(`/api/admin/testimonials/${t.id}`, { method: 'DELETE' });
      setTestimonials(safeTestimonials.filter(x => x.id !== t.id));
      window.location.reload();
    } catch (e) { console.error(e); }
  };

  const handleDeleteAll = async () => {
    if (safeTestimonials.length === 0) return;
    if (!window.confirm(`Delete ALL ${safeTestimonials.length} testimonials? This cannot be undone.`)) return;
    try {
      await Promise.all(safeTestimonials.map(t => fetch(`/api/admin/testimonials/${t.id}`, { method: 'DELETE' })));
      setTestimonials([]);
      setPage(1);
      window.location.reload();
    } catch (e) { console.error('Failed to delete all:', e); }
  };

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(safeTestimonials.length / ITEMS_PER_PAGE);
  const pagedTestimonials = safeTestimonials.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const [viewItem, setViewItem] = useState(null);

  if (form !== null) {
    return (
      <div className="admin-panel-card" style={{ maxWidth: 600, animation: 'fadeIn 0.3s ease' }}>
        <div className="admin-panel-header">
          <h3>{form.id ? 'Edit Testimonial' : 'New Testimonial'}</h3>
          <button className="admin-btn-outline" onClick={() => setForm(null)}>← Back</button>
        </div>

        <div className="admin-form-group">
          <label>Photo</label>
          <input type="file" accept="image/*" ref={fileRef} style={{ display: 'none' }}
            onChange={async (e) => {
              const f = e.target.files[0];
              if (f) {
                const b64 = await getBase64(f);
                setForm({ ...form, image: b64, imagePreview: URL.createObjectURL(f) });
              }
            }} />
          {form.imagePreview ? (
            <div style={{ position: 'relative', marginBottom: 12 }}>
              <img src={form.imagePreview} alt="preview"
                style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '50%', display: 'block' }} />
              <button onClick={() => fileRef.current.click()} style={{
                position: 'absolute', bottom: 0, right: 0, background: 'rgba(0,0,0,0.6)',
                color: '#fff', border: 'none', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: '0.75rem'
              }}>Change</button>
            </div>
          ) : (
            <div onClick={() => fileRef.current.click()} style={{
              border: '2px dashed var(--admin-border)', borderRadius: 12, padding: '30px 20px',
              textAlign: 'center', cursor: 'pointer', color: 'var(--admin-text-muted)',
              transition: 'border-color 0.2s', width: 'fit-content'
            }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: '0.85rem' }}>+ Photo</p>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="admin-form-group">
            <label>Name</label>
            <input className="admin-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Client Name" required />
          </div>
          <div className="admin-form-group">
            <label>Role / Position</label>
            <input className="admin-input" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Co-Founder, Creative Director" />
          </div>
        </div>

        <div className="admin-form-group">
          <label>Display Order (optional)</label>
          <input className="admin-input" type="number" value={form.order} onChange={e => setForm({ ...form, order: e.target.value })} placeholder="e.g. 1" />
        </div>

        <div className="admin-form-group">
          <label>Testimonial Text</label>
          <textarea className="admin-input" rows={4} value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} placeholder="Write the client testimonial here..." required style={{ resize: 'vertical' }} />
        </div>
        
        {errorMsg && (
          <div style={{ color: '#ef4444', fontSize: '0.88rem', fontWeight: 600, marginBottom: 12 }}>
            ⚠️ {errorMsg}
          </div>
        )}
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : form.id ? 'Update' : 'Create Testimonial'}
          </button>
          <button className="admin-btn-outline" onClick={() => { setForm(null); setErrorMsg(''); }}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel-card" style={{ animation: 'fadeIn 0.3s ease' }}>
      {viewItem && (
        <ViewModal title="Testimonial Details" onClose={() => setViewItem(null)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--admin-border)' }}>
            <img
              src={viewItem.image || '/assets/a1.png'}
              alt={viewItem.name}
              style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--admin-accent)' }}
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.15rem', color: '#fff' }}>{viewItem.name}</div>
              <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.88rem' }}>{viewItem.role || 'Client'}</div>
            </div>
          </div>
          <ViewField label="Display Order" value={viewItem.order || '0'} />
          <ViewField label="Testimonial Text" value={viewItem.text} />
        </ViewModal>
      )}
      <div className="admin-panel-header">
        <h3>Testimonials</h3>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>{safeTestimonials.length} total</span>
          {safeTestimonials.length > 0 && (
            <button className="admin-btn-danger" onClick={handleDeleteAll}>Delete All</button>
          )}
          <button className="admin-btn-primary" onClick={openCreate}>+ Add Testimonial</button>
        </div>
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>Photo</th>
              <th>Name</th>
              <th>Role</th>
              <th>Text</th>
              <th>Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {safeTestimonials.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--admin-text-muted)', padding: 40 }}>No testimonials found.</td></tr>
            )}
            {pagedTestimonials.map((t, i) => (
              <tr key={t.id || i}>
                <td>
                  <img
                    src={t.image || '/assets/a1.png'}
                    alt={t.name}
                    style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '50%' }}
                    onError={e => { e.target.src = '/assets/a1.png'; }}
                  />
                </td>
                <td><strong>{t.name}</strong></td>
                <td style={{ color: 'var(--admin-text-muted)' }}>{t.role || '—'}</td>
                <td style={{ color: 'var(--admin-text-muted)', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {t.text}
                </td>
                <td>{t.order || '—'}</td>
                <td>
                  <div className="admin-actions-cell">
                    <button className="admin-btn-icon" title="View details" onClick={() => setViewItem(t)} style={{ color: '#60a5fa' }}>View</button>
                    <button className="admin-btn-icon" title="Edit" onClick={() => openEdit(t)}>Edit</button>
                    <button className="admin-btn-icon" title="Delete" onClick={() => handleDelete(t)} style={{ color: '#ef4444' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages} onPage={setPage} />
    </div>
  );
}

// ─── Contacts Tab ─────────────────────────────────────────────────────────────

function ContactsTab({ contacts, setContacts, platform }) {
  const safeContacts = Array.isArray(contacts) ? contacts : [];
  const [selectedMsg, setSelectedMsg] = React.useState(null);
  const [viewMsg, setViewMsg] = React.useState(null);
  const [marking, setMarking] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const totalPages = Math.ceil(safeContacts.length / ITEMS_PER_PAGE);
  const pagedContacts = safeContacts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const [infoWebsiteName, setInfoWebsiteName] = React.useState('');
  const [infoEmail, setInfoEmail] = React.useState('');
  const [infoPhone, setInfoPhone] = React.useState('');
  const [infoAddress, setInfoAddress] = React.useState('');
  const [infoBrandDesc, setInfoBrandDesc] = React.useState('');
  const [infoMapUrl, setInfoMapUrl] = React.useState('');
  const [loadingInfo, setLoadingInfo] = React.useState(false);
  const [savingInfo, setSavingInfo] = React.useState(false);
  const [infoStatus, setInfoStatus] = React.useState({ type: '', message: '' });

  React.useEffect(() => {
    const fetchContactInfo = async () => {
      setLoadingInfo(true);
      setInfoStatus({ type: '', message: '' });
      try {
        const res = await fetch(`/api/admin/contact-info?platform=${platform}`);
        if (res.ok) {
          const data = await res.json();
          setInfoWebsiteName(data.website_name || '');
          setInfoEmail(data.email || '');
          setInfoPhone(data.phone || '');
          setInfoAddress(data.address || '');
          setInfoBrandDesc(data.brand_desc || '');
          setInfoMapUrl(data.map_url || '');
        }
      } catch (err) {
        console.error('Error fetching contact info:', err);
      } finally {
        setLoadingInfo(false);
      }
    };
    fetchContactInfo();
  }, [platform]);

  const handleSaveInfo = async (e) => {
    e.preventDefault();
    setInfoStatus({ type: '', message: '' });

    if (infoEmail && infoEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(infoEmail.trim())) {
        setInfoStatus({ type: 'error', message: 'Please enter a valid email address.' });
        return;
      }
    }

    if (infoPhone && infoPhone.trim()) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(infoPhone.trim())) {
        setInfoStatus({ type: 'error', message: 'Phone number must be exactly 10 digits.' });
        return;
      }
    }

    setSavingInfo(true);
    try {
      const res = await fetch('/api/admin/contact-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          platform,
          website_name: infoWebsiteName,
          email: infoEmail,
          phone: infoPhone,
          address: infoAddress,
          brand_desc: infoBrandDesc,
          map_url: infoMapUrl
        })
      });
      if (res.ok) {
        setInfoStatus({ type: 'success', message: 'Contact details updated!' });
      } else {
        const errData = await res.json();
        setInfoStatus({ type: 'error', message: errData.message || 'Failed to update.' });
      }
    } catch (err) {
      console.error('Error saving contact info:', err);
      setInfoStatus({ type: 'error', message: 'Connection error.' });
    } finally {
      setSavingInfo(false);
    }
  };

  const handleToggleRead = async (msg) => {
    if (marking) return;
    setMarking(true);
    try {
      const res = await fetch(`/api/admin/contacts/${msg.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ is_read: !msg.is_read })
      });
      if (res.ok) {
        const data = await res.json();
        const updatedContact = data.contact || data;
        setContacts(safeContacts.map(c => c.id === msg.id ? { ...c, ...updatedContact } : c));
      }
    } catch (e) {
      console.error(e);
    }
    setMarking(false);
  };

  const handleDelete = async (msg) => {
    if (!window.confirm(`Delete message from "${msg.name}"?`)) return;
    setDeletingId(msg.id);
    try {
      const res = await fetch(`/api/admin/contacts/${msg.id}`, { method: 'DELETE' });
      if (res.ok) {
        setContacts(safeContacts.filter(c => c.id !== msg.id));
      }
    } catch (e) {
      console.error(e);
    }
    setDeletingId(null);
  };

  const handleDeleteAll = async () => {
    if (safeContacts.length === 0) return;
    if (!window.confirm(`Delete ALL ${safeContacts.length} messages for ${platform === 'silver-fern' ? 'Silver Fern' : 'Basagi'}? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/contacts/all`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ platform })
      });
      if (res.ok) {
        setContacts([]);
        setPage(1);
      }
    } catch (e) {
      console.error('Failed to delete all:', e);
    }
  };

  const isBasagi = platform === 'basagi';

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: isBasagi ? '1fr' : '320px 1fr', 
      gap: '24px', 
      alignItems: 'start', 
      animation: 'fadeIn 0.3s ease',
      maxWidth: isBasagi ? '600px' : 'none',
      margin: isBasagi ? '0 auto' : '0'
    }}>
      {/* Contact Details Form Card */}
      <div className="admin-panel-card" style={{ padding: '24px' }}>
        <h3 style={{ marginBottom: '20px' }}>Contact Details</h3>
        {loadingInfo ? (
          <div style={{ textAlign: 'center', padding: '20px', color: 'var(--admin-text-muted)' }}>Loading info...</div>
        ) : (
          <form onSubmit={handleSaveInfo} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label>Website Name</label>
              <input 
                className="admin-input" 
                type="text" 
                value={infoWebsiteName} 
                onChange={e => setInfoWebsiteName(e.target.value)} 
                placeholder="Website Name" 
              />
            </div>
            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label>Email Address</label>
              <input 
                className="admin-input" 
                type="email" 
                value={infoEmail} 
                onChange={e => setInfoEmail(e.target.value)} 
                placeholder="info@silverfern.com" 
              />
            </div>
            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label>Phone Number</label>
              <input 
                className="admin-input" 
                type="text" 
                value={infoPhone} 
                onChange={e => setInfoPhone(e.target.value)} 
                placeholder="+91 123 456 7890" 
              />
            </div>
            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label>Address</label>
              <textarea 
                className="admin-input" 
                rows={3} 
                value={infoAddress} 
                onChange={e => setInfoAddress(e.target.value)} 
                placeholder="123 Green Road, Kerala, India" 
                style={{ resize: 'vertical' }} 
              />
            </div>
            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label>Brand Description</label>
              <textarea 
                className="admin-input" 
                rows={3} 
                value={infoBrandDesc} 
                onChange={e => setInfoBrandDesc(e.target.value)} 
                placeholder="Brand description for the footer..." 
                style={{ resize: 'vertical' }} 
              />
            </div>
            {!isBasagi && (
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label>Google Maps Embed URL</label>
                <textarea 
                  className="admin-input" 
                  rows={3} 
                  value={infoMapUrl} 
                  onChange={e => setInfoMapUrl(e.target.value)} 
                  placeholder="https://www.google.com/maps/embed?pb=..." 
                  style={{ resize: 'vertical' }} 
                />
              </div>
            )}
            {infoStatus.message && (
              <div style={{ 
                fontSize: '0.85rem', 
                fontWeight: 600, 
                color: infoStatus.type === 'success' ? '#22c55e' : '#ef4444',
                marginTop: '4px'
              }}>
                {infoStatus.type === 'success' ? '✅' : '⚠️'} {infoStatus.message}
              </div>
            )}
            <button className="admin-btn-primary" type="submit" disabled={savingInfo} style={{ width: '100%', marginTop: '8px' }}>
              {savingInfo ? 'Saving...' : 'Save Contact Details'}
            </button>
          </form>
        )}
      </div>

          {viewMsg && (
        <ViewModal title="Contact Message" onClose={() => setViewMsg(null)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--admin-border)' }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.3rem', fontWeight: 800, color: '#fff', flexShrink: 0
            }}>{(viewMsg.name || 'C')[0].toUpperCase()}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{viewMsg.name}</div>
              <span style={{
                fontSize: '0.7rem', fontWeight: 700, padding: '2px 10px', borderRadius: 20,
                background: viewMsg.is_read ? 'rgba(107,114,128,0.2)' : 'rgba(34,197,94,0.15)',
                color: viewMsg.is_read ? '#9ca3af' : '#22c55e', marginTop: 4, display: 'inline-block'
              }}>{viewMsg.is_read ? 'Read' : 'Unread'}</span>
            </div>
          </div>
          <ViewField label="Email" value={viewMsg.email} />
          {viewMsg.phone && <ViewField label="Phone" value={viewMsg.phone} />}
          {viewMsg.subject && <ViewField label="Subject" value={viewMsg.subject} />}
          <ViewField label="Date" value={viewMsg.date} />
          <div style={{ marginTop: 4 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>Message</div>
            <div style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid var(--admin-border)',
              borderRadius: 10, padding: '14px 16px', lineHeight: '1.7',
              fontSize: '0.95rem', whiteSpace: 'pre-wrap', color: 'var(--admin-text)'
            }}>{viewMsg.message}</div>
          </div>
        </ViewModal>
      )}

      {/* Contact Messages Card */}
      {!isBasagi && (
        <div className="admin-panel-card" style={{ padding: 0 }}>
          <div className="admin-panel-header" style={{ padding: '24px 24px 0 24px' }}>
            <h3>Contact Messages</h3>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>{safeContacts.length} total messages</span>
              {safeContacts.length > 0 && (
                <button className="admin-btn-danger" onClick={handleDeleteAll}>Delete All</button>
              )}
            </div>
          </div>

          {selectedMsg ? (
            <div className="admin-panel-card" style={{ margin: '20px 24px 0 24px', border: '1px solid var(--admin-border)', background: 'rgba(255,255,255,0.02)', animation: 'slideDown 0.25s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <span className={`admin-badge ${selectedMsg.is_read ? 'badge-secondary' : 'badge-success'}`} style={{ marginBottom: 8, display: 'inline-block' }}>
                    {selectedMsg.is_read ? 'Read' : 'New / Unread'}
                  </span>
                  <h4 style={{ margin: 0, fontSize: '1.25rem' }}>From: {selectedMsg.name}</h4>
                  <p style={{ margin: '4px 0 0', color: 'var(--admin-text-muted)' }}>Email: <a href={`mailto:${selectedMsg.email}`} style={{ color: 'var(--admin-primary)', textDecoration: 'none' }}>{selectedMsg.email}</a></p>
                  {selectedMsg.phone && <p style={{ margin: '4px 0 0', color: 'var(--admin-text-muted)' }}>Phone: {selectedMsg.phone}</p>}
                </div>
                <button className="admin-btn-outline" onClick={() => setSelectedMsg(null)}>Close Message</button>
              </div>

              <div style={{ borderTop: '1px solid var(--admin-border)', paddingTop: 16 }}>
                <h5 style={{ margin: '0 0 8px', color: 'var(--admin-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>Message</h5>
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '1rem', color: 'var(--admin-text)' }}>
                  {selectedMsg.message}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 24, borderTop: '1px solid var(--admin-border)', paddingTop: 16 }}>
                <button 
                  className="admin-btn-primary" 
                  onClick={() => {
                    handleToggleRead(selectedMsg);
                    setSelectedMsg({ ...selectedMsg, is_read: !selectedMsg.is_read });
                  }}
                  disabled={marking}
                >
                  {selectedMsg.is_read ? 'Mark Unread' : 'Mark Read'}
                </button>
                <button 
                  className="admin-btn-danger" 
                  onClick={() => {
                    handleDelete(selectedMsg);
                    setSelectedMsg(null);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ) : null}

          <div className="admin-table-container" style={{ padding: '0 24px 24px 24px', marginTop: 20 }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '150px' }}>Sender</th>
                  <th style={{ width: '180px' }}>Contact Info</th>
                  <th>Message Preview</th>
                  <th style={{ width: '120px' }}>Date</th>
                  <th style={{ width: '100px' }}>Status</th>
                  <th style={{ width: '150px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {safeContacts.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', color: 'var(--admin-text-muted)', padding: 40 }}>
                      No contact messages received yet.
                    </td>
                  </tr>
                )}
                {pagedContacts.map((msg, i) => (
                  <tr key={msg.id || i} style={{ fontWeight: msg.is_read ? 'normal' : '600', backgroundColor: msg.is_read ? 'transparent' : 'rgba(22, 101, 52, 0.05)' }}>
                    <td>
                      <strong>{msg.name}</strong>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem' }}>{msg.email}</div>
                      {msg.phone && <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>{msg.phone}</div>}
                    </td>
                    <td>
                      <div 
                        onClick={() => setSelectedMsg(msg)}
                        style={{ 
                          color: 'var(--admin-text)', 
                          cursor: 'pointer', 
                          maxWidth: '350px', 
                          whiteSpace: 'nowrap', 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis',
                          textDecoration: 'underline'
                        }}
                        title="Click to view full message"
                      >
                        {msg.message}
                      </div>
                    </td>
                    <td style={{ color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>{msg.date}</td>
                    <td>
                      <span className={`admin-badge ${msg.is_read ? 'badge-secondary' : 'badge-success'}`}>
                        {msg.is_read ? 'Read' : 'Unread'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions-cell">
                        <button
                          className="admin-btn-icon"
                          onClick={() => setViewMsg(msg)}
                          style={{ color: '#60a5fa' }}
                        >View</button>
                        <button 
                          className="admin-btn-icon" 
                          onClick={() => handleToggleRead(msg)} 
                          disabled={marking}
                          style={{ color: 'var(--admin-primary)' }}
                        >
                          {msg.is_read ? 'Unread' : 'Read'}
                        </button>
                        <button 
                          className="admin-btn-icon" 
                          onClick={() => handleDelete(msg)} 
                          disabled={deletingId === msg.id}
                          style={{ color: '#ef4444' }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} totalPages={totalPages} onPage={setPage} />
        </div>
      )}
    </div>
  );
}

// ─── Bookings Tab ─────────────────────────────────────────────────────────────

function BookingsTab({ bookings, setBookings, platform }) {
  const safeBookings = Array.isArray(bookings) ? bookings : [];
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [viewBooking, setViewBooking] = useState(null);
  const [page, setPage] = useState(1);

  const handleUpdateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        const data = await res.json();
        const updatedBooking = data.booking || data;
        setBookings(safeBookings.map(b => b.id === id ? { ...b, ...updatedBooking } : b));
      }
    } catch (e) {
      console.error('Failed to update booking status:', e);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id, clientName) => {
    if (!window.confirm(`Delete booking for "${clientName}"?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBookings(safeBookings.filter(b => b.id !== id));
      }
    } catch (e) {
      console.error('Failed to delete booking:', e);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteAll = async () => {
    if (safeBookings.length === 0) return;
    if (!window.confirm(`Delete ALL ${safeBookings.length} bookings? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/bookings/all`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ platform })
      });
      if (res.ok) {
        setBookings([]);
        setPage(1);
      }
    } catch (e) {
      console.error('Failed to delete all bookings:', e);
    }
  };

  const totalPages = Math.ceil(safeBookings.length / ITEMS_PER_PAGE);
  const pagedBookings = safeBookings.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const getStatusBadgeClass = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'confirmed') return 'badge-success';
    if (s === 'cancelled') return 'badge-danger';
    return 'badge-warning';
  };

  return (
    <div className="admin-panel-card" style={{ padding: 0, animation: 'fadeIn 0.3s ease' }}>
      {viewBooking && (
        <ViewModal title="Booking Details" onClose={() => setViewBooking(null)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--admin-border)' }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.3rem', fontWeight: 800, color: '#fff', flexShrink: 0
            }}>{(viewBooking.name || 'B')[0].toUpperCase()}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{viewBooking.name}</div>
              <span style={{
                fontSize: '0.7rem', fontWeight: 700, padding: '2px 10px', borderRadius: 20,
                background: viewBooking.status === 'confirmed' ? 'rgba(34,197,94,0.15)' : viewBooking.status === 'cancelled' ? 'rgba(239,68,68,0.15)' : 'rgba(234,179,8,0.15)',
                color: viewBooking.status === 'confirmed' ? '#22c55e' : viewBooking.status === 'cancelled' ? '#ef4444' : '#eab308',
                marginTop: 4, display: 'inline-block', textTransform: 'capitalize'
              }}>{viewBooking.status || 'Pending'}</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
            <ViewField label="Email" value={viewBooking.email} />
            <ViewField label="Phone" value={viewBooking.phone || '—'} />
            <ViewField label="Service" value={viewBooking.service_name || '—'} />
            <ViewField label="Booking ID" value={`#${viewBooking.id}`} mono />
            <ViewField label="Date" value={viewBooking.booking_date || '—'} />
            <ViewField label="Time" value={viewBooking.booking_time || '—'} />
          </div>
          {viewBooking.notes && <ViewField label="Notes" value={viewBooking.notes} />}
        </ViewModal>
      )}
      <div className="admin-panel-header" style={{ padding: '24px 24px 0 24px' }}>
        <h3>Bookings</h3>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>{safeBookings.length} total bookings</span>
          {safeBookings.length > 0 && (
            <button className="admin-btn-danger" onClick={handleDeleteAll}>Delete All</button>
          )}
        </div>
      </div>

      <div className="admin-table-container" style={{ padding: '0 24px 24px 24px', marginTop: 20 }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '180px' }}>Client</th>
              <th style={{ width: '200px' }}>Contact Info</th>
              <th>Service</th>
              <th style={{ width: '140px' }}>Date</th>
              <th style={{ width: '120px' }}>Time</th>
              <th style={{ width: '100px' }}>Status</th>
              <th style={{ width: '200px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {safeBookings.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', color: 'var(--admin-text-muted)', padding: 40 }}>
                  No bookings received yet.
                </td>
              </tr>
            )}
            {pagedBookings.map((b, i) => (
              <tr key={b.id || i}>
                <td>
                  <strong>{b.name}</strong>
                </td>
                <td>
                  <div style={{ fontSize: '0.85rem' }}>{b.email}</div>
                  {b.phone && <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>{b.phone}</div>}
                </td>
                <td>{b.service_name}</td>
                <td>{b.booking_date}</td>
                <td>{b.booking_time}</td>
                <td>
                  <span className={`admin-badge ${getStatusBadgeClass(b.status)}`}>
                    {b.status || 'Pending'}
                  </span>
                </td>
                <td>
                  <div className="admin-actions-cell" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button
                      className="admin-btn-icon"
                      onClick={() => setViewBooking(b)}
                      style={{ color: '#60a5fa' }}
                    >View</button>
                    {b.status !== 'confirmed' && (
                      <button 
                        className="admin-btn-icon" 
                        onClick={() => handleUpdateStatus(b.id, 'confirmed')} 
                        disabled={updatingId === b.id}
                        style={{ color: '#22c55e' }}
                      >
                        Confirm
                      </button>
                    )}
                    {b.status !== 'cancelled' && (
                      <button 
                        className="admin-btn-icon" 
                        onClick={() => handleUpdateStatus(b.id, 'cancelled')} 
                        disabled={updatingId === b.id}
                        style={{ color: '#eab308' }}
                      >
                        Cancel
                      </button>
                    )}
                    {b.status !== 'pending' && (
                      <button 
                        className="admin-btn-icon" 
                        onClick={() => handleUpdateStatus(b.id, 'pending')} 
                        disabled={updatingId === b.id}
                        style={{ color: 'var(--admin-primary)' }}
                      >
                        Reset
                      </button>
                    )}
                    <button 
                      className="admin-btn-icon" 
                      onClick={() => handleDelete(b.id, b.name)} 
                      disabled={deletingId === b.id}
                      style={{ color: '#ef4444' }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages} onPage={setPage} />
    </div>
  );
}

// ─── NAV CONFIG ───────────────────────────────────────────────────────────────

const SF_TABS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'blog', label: 'Blog' },
  { key: 'news', label: 'News' },
  { key: 'services', label: 'Services' },
  { key: 'sf-gallery', label: 'Gallery' },
  { key: 'users', label: 'Users' },
  { key: 'members', label: 'Members' },
  { key: 'contacts', label: 'Contacts' },
];

const BASAGI_TABS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'services', label: 'Services' },
  { key: 'basagi-gallery', label: 'Gallery' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'users', label: 'Users' },
  { key: 'contacts', label: 'Contacts' },
  { key: 'bookings', label: 'Bookings' },
];

// ─── Main AdminPanel ──────────────────────────────────────────────────────────

function AdminPanel({
  onNavigateHome,
  articles, setArticles,
  news, setNews,
  services, setServices,
  basagiServices = [], setBasagiServices,
  categories = [], setCategories,
  users = [], setUsers,
  members = [], setMembers,
  sfGallery = [], setSfGallery,
  basagiGallery = [], setBasagiGallery,
  testimonials = [], setTestimonials,
  contacts = [], setContacts
}) {
  const [activePlatform, setActivePlatform] = useState(() => {
    try {
      return localStorage.getItem('admin_active_platform') || 'silver-fern';
    } catch (e) {
      console.warn('localStorage access failed:', e);
      return 'silver-fern';
    }
  });
  const [activeTab, setActiveTab] = useState(() => {
    try {
      return localStorage.getItem('admin_active_tab') || 'dashboard';
    } catch (e) {
      console.warn('localStorage access failed:', e);
      return 'dashboard';
    }
  });
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Helper to load all admin-only datasets
  const loadAdminData = () => {
    fetch('/api/admin/blog?type=blog')
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error('Error fetching admin blogs:', err));

    fetch('/api/admin/blog?type=news')
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(err => console.error('Error fetching admin news:', err));

    fetch('/api/admin/services?type=silver-fern')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error('Error fetching admin services:', err));

    fetch('/api/admin/services?type=basagi')
      .then(res => res.json())
      .then(data => setBasagiServices(data))
      .catch(err => console.error('Error fetching admin Basagi services:', err));

    if (typeof setCategories === 'function') {
      fetch('/api/admin/blog-categories')
        .then(res => res.json())
        .then(data => setCategories(data))
        .catch(err => console.error('Error fetching admin categories:', err));
    }

    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching admin users:', err));

    fetch('/api/admin/members')
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(err => console.error('Error fetching admin members:', err));

    fetch('/api/admin/gallery?type=silver-fern')
      .then(res => res.json())
      .then(data => setSfGallery(data))
      .catch(err => console.error('Error fetching admin SF gallery:', err));

    fetch('/api/admin/gallery?type=basagi')
      .then(res => res.json())
      .then(data => setBasagiGallery(data))
      .catch(err => console.error('Error fetching admin Basagi gallery:', err));

    fetch('/api/admin/testimonials?platform=basagi')
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.error('Error fetching admin Basagi testimonials:', err));

    fetch('/api/admin/bookings?platform=basagi')
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error('Error fetching admin bookings:', err));
  };

  // Check if user is already logged in on mount
  useEffect(() => {
    fetch('/api/admin/check-auth')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setUser(data.user);
        }
        setCheckedAuth(true);
      })
      .catch(err => {
        console.error('Auth check failed:', err);
        setCheckedAuth(true);
      });
  }, []);

  // Fetch admin data whenever user successfully authenticates
  useEffect(() => {
    if (user) {
      loadAdminData();
    }
  }, [user]);

  // Fetch contact messages whenever user authenticates or platform changes
  useEffect(() => {
    if (user) {
      fetch(`/api/admin/contacts?platform=${activePlatform}`)
        .then(res => res.json())
        .then(data => setContacts(data))
        .catch(err => console.error('Error fetching admin contacts:', err));
    }
  }, [user, activePlatform]);

  // Fetch bookings whenever user authenticates or platform changes
  useEffect(() => {
    if (user && activePlatform === 'basagi') {
      fetch('/api/admin/bookings?platform=basagi')
        .then(res => res.json())
        .then(data => setBookings(data))
        .catch(err => console.error('Error fetching admin bookings:', err));
    }
  }, [user, activePlatform]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok && data.authenticated) {
        setUser(data.user);
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      console.error('Login request failed:', err);
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout failed:', err);
    }
    setUser(null);
  };

  const handlePlatformSwitch = (platform) => {
    setActivePlatform(platform);
    try {
      localStorage.setItem('admin_active_platform', platform);
    } catch (e) {
      console.warn('localStorage write failed:', e);
    }
    setActiveTab('dashboard');
    try {
      localStorage.setItem('admin_active_tab', 'dashboard');
    } catch (e) {
      console.warn('localStorage write failed:', e);
    }
  };

  const handleTabSwitch = (tabKey) => {
    setActiveTab(tabKey);
    try {
      localStorage.setItem('admin_active_tab', tabKey);
    } catch (e) {
      console.warn('localStorage write failed:', e);
    }
  };

  const tabs = activePlatform === 'silver-fern' ? SF_TABS : BASAGI_TABS;

  const tabLabels = {
    dashboard: activePlatform === 'silver-fern' ? 'Dashboard' : 'Basagi Dashboard',
    blog: 'Blog Articles',
    news: 'News',
    services: 'Services',
    'sf-gallery': 'SF Gallery',
    'basagi-gallery': 'Basagi Gallery',
    testimonials: 'Testimonials',
    users: 'Users',
    members: 'Members',
    contacts: activePlatform === 'silver-fern' ? 'Contact Messages' : 'Contact Details',
    bookings: 'Bookings',
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardTab
            platform={activePlatform}
            articles={articles}
            news={news}
            services={services}
            basagiServices={basagiServices}
            users={users}
            members={members}
            sfGallery={sfGallery}
            basagiGallery={basagiGallery}
            testimonials={testimonials}
            bookings={bookings}
            contacts={contacts}
            onNavigate={handleTabSwitch}
          />
        );
      case 'blog':
        return <BlogTab items={articles} setItems={setArticles} categories={categories} type="blog" />;
      case 'news':
        return <BlogTab items={news} setItems={setNews} categories={categories} type="news" />;
      case 'services':
        if (activePlatform === 'silver-fern') {
          return <ServicesTab services={services} setServices={setServices} platform="silver-fern" />;
        } else {
          return <ServicesTab services={basagiServices} setServices={setBasagiServices} platform="basagi" />;
        }
      case 'sf-gallery':
        return <GalleryTab items={sfGallery} setItems={setSfGallery} platform="silver-fern" />;
      case 'basagi-gallery':
        return <GalleryTab items={basagiGallery} setItems={setBasagiGallery} platform="basagi" />;
      case 'users':
        return <UsersTab users={users} setUsers={setUsers} />;
      case 'members':
        return <MembersTab members={members} setMembers={setMembers} />;
      case 'testimonials':
        return <TestimonialsTab testimonials={testimonials} setTestimonials={setTestimonials} platform="basagi" />;
      case 'contacts':
        return <ContactsTab contacts={contacts} setContacts={setContacts} platform={activePlatform} />;
      case 'bookings':
        return <BookingsTab bookings={bookings} setBookings={setBookings} platform={activePlatform} />;
      default:
        return null;
    }
  };

  if (!checkedAuth) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0b1f13', color: '#fff', fontFamily: 'Outfit, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem', animation: 'spin 1s linear infinite' }}>🔄</div>
          <p>Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-glow" />
        <div className="admin-login-card">
          <div className="admin-login-brand">
            <img src="/sf-logo.png" alt="Silver Fern" style={{ height: '60px', width: 'auto', objectFit: 'contain', marginBottom: '12px' }} />
            <h2>Silver Fern <span>Admin</span></h2>
          </div>
          <p>Please log in to manage your platforms</p>

          {error && <div className="admin-login-error">⚠️ {error}</div>}

          <form className="admin-login-form" onSubmit={handleLogin}>
            <div className="admin-form-group">
              <label>Email Address</label>
              <input
                className="admin-login-input"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="admin-form-group">
              <label>Password</label>
              <input
                className="admin-login-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="admin-login-btn" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>

        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">


        <div className="admin-platform-switcher">
          <button
            className={`platform-btn ${activePlatform === 'silver-fern' ? 'active' : ''}`}
            onClick={() => handlePlatformSwitch('silver-fern')}
          >
            Silver Fern
          </button>
          <button
            className={`platform-btn ${activePlatform === 'basagi' ? 'active' : ''}`}
            onClick={() => handlePlatformSwitch('basagi')}
          >
            Basagi
          </button>
        </div>

        <nav className="admin-nav">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`admin-nav-item ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => handleTabSwitch(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

      </aside>

      {/* Main Content */}
      <div className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-header-title">
            <h3>{tabLabels[activeTab] || 'Admin Panel'}</h3>
          </div>
          <div className="admin-header-actions">
            <div className="admin-user-profile" style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'default' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="admin-avatar">{user.name ? user.name[0].toUpperCase() : 'A'}</div>
                <span>{user.name || 'Admin'}</span>
              </div>
              <button 
                onClick={handleLogout} 
                className="admin-btn-outline" 
                style={{ padding: '6px 12px', fontSize: '0.8rem', borderColor: '#ef4444', color: '#ef4444', background: 'transparent' }}
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="admin-content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
