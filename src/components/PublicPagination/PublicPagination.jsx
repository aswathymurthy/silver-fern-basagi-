import React from 'react';

export default function PublicPagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      gap: '8px', 
      marginTop: '3.5rem',
      flexWrap: 'wrap'
    }}>
      <button 
        disabled={currentPage === 1} 
        onClick={() => onPageChange(currentPage - 1)}
        style={{
          padding: '8px 16px',
          borderRadius: '8px',
          border: '1px solid #166534',
          background: 'transparent',
          color: '#166534',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          opacity: currentPage === 1 ? 0.4 : 1,
          fontWeight: 600,
          transition: 'all 0.2s',
          fontSize: '0.9rem'
        }}
      >
        ← Previous
      </button>
      
      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            border: p === currentPage ? 'none' : '1px solid #166534',
            background: p === currentPage ? '#166534' : 'transparent',
            color: p === currentPage ? '#fff' : '#166534',
            cursor: 'pointer',
            fontWeight: 700,
            transition: 'all 0.2s',
            fontSize: '0.95rem'
          }}
        >
          {p}
        </button>
      ))}
      
      <button 
        disabled={currentPage === totalPages} 
        onClick={() => onPageChange(currentPage + 1)}
        style={{
          padding: '8px 16px',
          borderRadius: '8px',
          border: '1px solid #166534',
          background: 'transparent',
          color: '#166534',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          opacity: currentPage === totalPages ? 0.4 : 1,
          fontWeight: 600,
          transition: 'all 0.2s',
          fontSize: '0.9rem'
        }}
      >
        Next →
      </button>
    </div>
  );
}
