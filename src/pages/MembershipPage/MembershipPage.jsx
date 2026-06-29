import React from 'react';
import SilverFernNavbar from '../../components/SilverFernNavbar/SilverFernNavbar';
import SilverFernContact from '../../components/SilverFernContact/SilverFernContact';
import '../ServicesPage/ServicesPage.css';

function MembershipPage({ setCurrentPage, members = [] }) {
  const defaultLeadershipMembers = [
    { name: 'John Doe', title: 'CEO & Founder', image: '/assets/a2.jpg' },
    { name: 'Jane Smith', title: 'COO & Co-Founder', image: '/assets/a1.png' },
    { name: 'Michael Lee', title: 'CTO', image: '/assets/a2.jpg' },
    { name: 'Sarah Brown', title: 'CFO', image: '/assets/a1.png' }
  ];

  const defaultFoundingMembers = [
    { name: 'Alex Johnson', title: 'Founding Member', image: '/assets/a2.jpg' },
    { name: 'Emily Davis', title: 'Founding Member', image: '/assets/a1.png' },
    { name: 'Chris Wilson', title: 'Founding Member', image: '/assets/a2.jpg' },
    { name: 'Jessica Taylor', title: 'Founding Member', image: '/assets/a1.png' },
    { name: 'Matthew Moore', title: 'Founding Member', image: '/assets/a2.jpg' },
    { name: 'Ashley Martin', title: 'Founding Member', image: '/assets/a1.png' },
    { name: 'Joshua White', title: 'Founding Member', image: '/assets/a2.jpg' },
    { name: 'Amanda Harris', title: 'Founding Member', image: '/assets/a1.png' },
    { name: 'David Clark', title: 'Founding Member', image: '/assets/a2.jpg' },
    { name: 'Megan Lewis', title: 'Founding Member', image: '/assets/a1.png' }
  ];

  const safeMembers = Array.isArray(members) ? members : [];
  const dbLeadership = safeMembers.filter(m => m.type === 'leadership');
  const dbFounding = safeMembers.filter(m => m.type === 'founding');

  const leadershipMembers = dbLeadership.length > 0 ? dbLeadership : defaultLeadershipMembers;
  const foundingMembers = dbFounding.length > 0 ? dbFounding : defaultFoundingMembers;

  return (
    <div className="silver-fern-app sf-membership-page-container">
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
              Members
            </div>
            <h2 className="sf-services-main-title">
              Meet Our <span>Leadership &amp; Founding</span> Members.
            </h2>
          </div>
          <div>
            <p className="sf-services-header-desc">
              Dedicated leaders and founding members committed to driving agricultural innovation, supporting farming communities, and building a sustainable future together.
            </p>
          </div>
        </div>
        
        {/* Leadership Team Grid */}
        <div style={{ marginTop: '4rem' }}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem', color: '#1f2937' }}>Leadership Team</h3>
          <div className="sf-member-grid-leadership">
            {leadershipMembers.map((member, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <img src={member.image || (idx % 2 === 0 ? '/assets/a2.jpg' : '/assets/a1.png')} alt={member.name} className="sf-member-img-leadership" />
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#1f2937' }}>{member.name}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280', fontWeight: '500' }}>{member.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Founding Members Grid */}
        <div style={{ marginTop: '4rem' }}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem', color: '#1f2937' }}>Founding Members</h3>
          <div className="sf-member-grid-founding">
            {foundingMembers.map((member, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <img src={member.image || (idx % 2 === 0 ? '/assets/a2.jpg' : '/assets/a1.png')} alt={member.name} className="sf-member-img-founding" />
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#1f2937' }}>{member.name}</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280', fontWeight: '500' }}>{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SilverFernContact setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default MembershipPage;
