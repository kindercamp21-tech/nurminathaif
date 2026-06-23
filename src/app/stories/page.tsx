'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { stories, Story } from '@/data/stories';

const typeLabel: Record<string, string> = {
  economy: 'Ekonomi',
  standard: 'Standar',
  premium: 'Premium',
  vip: 'VIP',
};

const badgeColor: Record<string, { bg: string; text: string }> = {
  economy: { bg: 'var(--gray-100)', text: 'var(--gray-600)' },
  standard: { bg: 'var(--primary-50)', text: 'var(--primary-700)' },
  premium: { bg: 'var(--primary-100)', text: 'var(--primary-800)' },
  vip: { bg: 'linear-gradient(135deg, var(--primary-200), var(--primary-100))', text: 'var(--primary-900)' },
};

export default function StoriesPage() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [votes, setVotes] = useState<Record<string, number>>(
    stories.reduce((acc, story) => ({ ...acc, [story.id]: story.helpfulVotes }), {})
  );
  const [votedList, setVotedList] = useState<Record<string, boolean>>({});

  const handleVote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (votedList[id]) return; // already voted
    setVotes(prev => ({ ...prev, [id]: prev[id] + 1 }));
    setVotedList(prev => ({ ...prev, [id]: true }));
  };

  const filteredStories = activeTab === 'all' 
    ? stories 
    : stories.filter(s => s.packageType === activeTab);

  const featuredStory = stories.find(s => s.featured) || stories[0];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--gray-50)' }}>
        
        {/* ===== HERO SECTION ===== */}
        <section style={{
          background: 'linear-gradient(135deg, var(--primary-900) 0%, var(--gray-900) 100%)',
          color: '#fff',
          padding: '4.5rem 0 3.5rem',
          textAlign: 'center',
        }}>
          <div className="container">
            <span className="badge badge-warning" style={{ marginBottom: '1rem', background: 'rgba(212,175,55,0.2)', color: 'var(--primary-200)' }}>
              💬 Kumpulan Cerita Nyata
            </span>
            <h1 className="text-display" style={{ color: '#fff', marginBottom: '1.25rem' }}>
              Kisah Inspiratif Jamaah Kami
            </h1>
            <p style={{ maxWidth: '580px', margin: '0 auto', color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Cerita jujur dan transparan dari para jamaah yang telah mempercayakan bimbingan dan perjalanan ibadah Umroh mereka kepada NurminaThaifTour.
            </p>
          </div>
        </section>

        {/* ===== FEATURED STORY SPOTLIGHT ===== */}
        <section className="section-sm">
          <div className="container">
            <div className="section-label">⭐ Pilihan Editor</div>
            <h2 className="section-title" style={{ marginBottom: '2rem' }}>Kisah Sorotan</h2>
            
            <div className="card" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: 0,
              background: '#fff',
              border: '1px solid var(--gray-100)'
            }}>
              {/* Left Image Side */}
              <div style={{ position: 'relative', minHeight: '300px' }}>
                <img 
                  src={featuredStory.images[0] || 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&auto=format&fit=crop'} 
                  alt="Makkah" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' 
                }} />
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <img 
                    src={featuredStory.photo} 
                    alt={featuredStory.name} 
                    style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid var(--primary-300)', objectFit: 'cover' }} 
                  />
                  <div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>{featuredStory.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>{featuredStory.location}</div>
                  </div>
                </div>
              </div>

              {/* Right Content Side */}
              <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ 
                    padding: '4px 12px', 
                    borderRadius: '99px', 
                    fontSize: '0.75rem', 
                    fontWeight: 700, 
                    background: badgeColor[featuredStory.packageType].bg, 
                    color: badgeColor[featuredStory.packageType].text 
                  }}>
                    Paket {typeLabel[featuredStory.packageType]}
                  </span>
                  <span style={{ color: 'var(--gray-400)', fontSize: '0.75rem' }}>
                    📅 {featuredStory.travelDate}
                  </span>
                </div>
                
                <div style={{ color: '#FBBF24', fontSize: '1rem', marginBottom: '12px' }}>
                  {'★'.repeat(featuredStory.rating)}
                </div>

                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '1rem', lineHeight: 1.4 }}>
                  &ldquo;{featuredStory.excerpt}&rdquo;
                </h3>

                <p style={{ color: 'var(--gray-600)', fontSize: '0.925rem', lineHeight: 1.7, marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {featuredStory.content}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', flexWrap: 'wrap', gap: '1rem' }}>
                  <button 
                    onClick={() => setSelectedStory(featuredStory)}
                    className="btn btn-primary"
                  >
                    Baca Selengkapnya
                  </button>
                  <button 
                    onClick={(e) => handleVote(featuredStory.id, e)}
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '6px', 
                      fontSize: '0.8rem', 
                      color: votedList[featuredStory.id] ? 'var(--primary-600)' : 'var(--gray-500)',
                      fontWeight: 600,
                      background: votedList[featuredStory.id] ? 'var(--primary-50)' : 'var(--gray-100)',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      cursor: votedList[featuredStory.id] ? 'default' : 'pointer'
                    }}
                  >
                    👍 Membantu ({votes[featuredStory.id]})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== STORY LIST SECTION ===== */}
        <section className="section-sm" style={{ background: '#fff', borderTop: '1px solid var(--gray-100)' }}>
          <div className="container">
            {/* Filter Tabs */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '8px', 
              marginBottom: '3rem', 
              overflowX: 'auto',
              paddingBottom: '8px'
            }}>
              {[
                { id: 'all', label: 'Semua Paket' },
                { id: 'vip', label: 'VIP' },
                { id: 'premium', label: 'Premium' },
                { id: 'standard', label: 'Standar' },
                { id: 'economy', label: 'Ekonomi' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '99px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    background: activeTab === tab.id ? 'var(--primary-500)' : 'var(--gray-50)',
                    color: activeTab === tab.id ? '#fff' : 'var(--gray-600)',
                    border: activeTab === tab.id ? '1px solid var(--primary-500)' : '1px solid var(--gray-200)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Stories Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
              gap: '2rem' 
            }}>
              {filteredStories.map(story => (
                <div 
                  key={story.id} 
                  className="card" 
                  onClick={() => setSelectedStory(story)}
                  style={{ 
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    border: '1px solid var(--gray-100)'
                  }}
                >
                  {story.images && story.images.length > 0 && (
                    <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={story.images[0]}
                        alt="Perjalanan Umroh"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
                      <img 
                        src={story.photo} 
                        alt={story.name} 
                        style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-200)' }} 
                      />
                      <div>
                        <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--gray-900)' }}>{story.name}</h4>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{story.location} • {story.travelDate}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ 
                        padding: '2px 8px', 
                        borderRadius: '99px', 
                        fontSize: '0.65rem', 
                        fontWeight: 700, 
                        background: badgeColor[story.packageType].bg, 
                        color: badgeColor[story.packageType].text 
                      }}>
                        {typeLabel[story.packageType]}
                      </span>
                      <div style={{ color: '#FBBF24', fontSize: '0.85rem' }}>
                        {'★'.repeat(story.rating)}
                      </div>
                    </div>

                    <p style={{ 
                      fontSize: '0.9rem', 
                      color: 'var(--gray-600)', 
                      lineHeight: 1.7, 
                      fontStyle: 'italic',
                      marginBottom: '1.5rem',
                      flex: 1
                    }}>
                      &ldquo;{story.excerpt}&rdquo;
                    </p>

                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--gray-50)',
                      fontSize: '0.75rem',
                      color: 'var(--gray-400)'
                    }}>
                      <span>Paket: {story.packageUsed.split(' ').slice(0, 3).join(' ')}...</span>
                      <button
                        onClick={(e) => handleVote(story.id, e)}
                        style={{
                          background: votedList[story.id] ? 'var(--primary-50)' : 'var(--gray-50)',
                          color: votedList[story.id] ? 'var(--primary-700)' : 'var(--gray-500)',
                          border: 'none',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontWeight: 600,
                          cursor: votedList[story.id] ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        👍 {votes[story.id]}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {filteredStories.length === 0 && (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--gray-400)' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🤲</span>
                <p>Belum ada cerita untuk kategori paket ini.</p>
              </div>
            )}
          </div>
        </section>

        {/* ===== DETAILED STORY MODAL ===== */}
        {selectedStory && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            backdropFilter: 'blur(4px)',
          }} onClick={() => setSelectedStory(null)}>
            
            <div style={{
              background: '#fff',
              borderRadius: 'var(--radius-xl)',
              maxWidth: '650px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-2xl)',
              animation: 'scaleIn 0.3s ease forwards',
            }} onClick={e => e.stopPropagation()}>
              
              {/* Modal header image */}
              {selectedStory.images.length > 0 ? (
                <div style={{ height: '240px', position: 'relative' }}>
                  <img 
                    src={selectedStory.images[0]} 
                    alt="Tanah Suci" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent)' }} />
                  <button 
                    onClick={() => setSelectedStory(null)}
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'rgba(0,0,0,0.5)',
                      color: '#fff',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    ×
                  </button>
                  <h2 style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '24px',
                    color: '#fff',
                    fontFamily: 'var(--font-secondary)',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    paddingRight: '24px'
                  }}>
                    {selectedStory.packageUsed}
                  </h2>
                </div>
              ) : (
                <div style={{ 
                  padding: '1.5rem 2rem 0.5rem', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  borderBottom: '1px solid var(--gray-100)'
                }}>
                  <h2 style={{ fontFamily: 'var(--font-secondary)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--gray-900)' }}>
                    {selectedStory.packageUsed}
                  </h2>
                  <button 
                    onClick={() => setSelectedStory(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '24px',
                      color: 'var(--gray-400)',
                      cursor: 'pointer',
                    }}
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Modal Body */}
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                  <img 
                    src={selectedStory.photo} 
                    alt={selectedStory.name} 
                    style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-300)' }} 
                  />
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--gray-900)' }}>{selectedStory.name}</h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>{selectedStory.location} • Keberangkatan {selectedStory.travelDate}</div>
                  </div>
                  
                  <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '99px', 
                      fontSize: '0.7rem', 
                      fontWeight: 700, 
                      background: badgeColor[selectedStory.packageType].bg, 
                      color: badgeColor[selectedStory.packageType].text 
                    }}>
                      Kategori {typeLabel[selectedStory.packageType]}
                    </span>
                    <div style={{ color: '#FBBF24', fontSize: '0.9rem', marginTop: '6px' }}>
                      {'★'.repeat(selectedStory.rating)}
                    </div>
                  </div>
                </div>

                <blockquote style={{ 
                  borderLeft: '4px solid var(--primary-300)', 
                  paddingLeft: '1rem', 
                  margin: '0 0 1.5rem 0', 
                  fontStyle: 'italic', 
                  color: 'var(--gray-600)',
                  fontSize: '1rem',
                  lineHeight: 1.6
                }}>
                  &ldquo;{selectedStory.excerpt}&rdquo;
                </blockquote>

                <div style={{ color: 'var(--gray-700)', fontSize: '0.95rem', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                  {selectedStory.content}
                </div>

                {/* Additional gallery if exists */}
                {selectedStory.images.length > 1 && (
                  <div style={{ marginTop: '2rem' }}>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--gray-700)', marginBottom: '0.75rem' }}>Dokumentasi Perjalanan</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '8px' }}>
                      {selectedStory.images.map((img, i) => (
                        <img 
                          key={i} 
                          src={img} 
                          alt="Dokumentasi" 
                          style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '6px' }} 
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer buttons inside modal */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginTop: '2.5rem', 
                  paddingTop: '1.5rem', 
                  borderTop: '1px solid var(--gray-100)' 
                }}>
                  <button 
                    onClick={(e) => {
                      handleVote(selectedStory.id, e);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: votedList[selectedStory.id] ? 'var(--primary-50)' : 'var(--gray-100)',
                      color: votedList[selectedStory.id] ? 'var(--primary-700)' : 'var(--gray-600)',
                      padding: '10px 20px',
                      borderRadius: '10px',
                      fontWeight: 600,
                      cursor: votedList[selectedStory.id] ? 'default' : 'pointer'
                    }}
                  >
                    👍 Kisah Ini Membantu ({votes[selectedStory.id]})
                  </button>
                  
                  <button 
                    onClick={() => setSelectedStory(null)}
                    className="btn btn-secondary"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}
