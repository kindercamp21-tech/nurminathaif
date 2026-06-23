'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getBlogs, BlogPost } from '@/data/blogs';

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  useEffect(() => {
    setBlogs(getBlogs());
  }, []);

  const categories = ['Semua', 'Panduan', 'Tips & Trik', 'Informasi'];

  const filteredBlogs = selectedCategory === 'Semua' 
    ? blogs 
    : blogs.filter(b => b.category === selectedCategory);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--gray-50)' }}>
        
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, var(--gray-900) 0%, var(--primary-900) 100%)',
          color: '#fff',
          padding: '4.5rem 0 3.5rem',
          textAlign: 'center'
        }}>
          <div className="container">
            <span className="badge badge-warning" style={{ marginBottom: '1rem', background: 'rgba(212,175,55,0.2)', color: 'var(--primary-200)' }}>
              📚 Pusat Pengetahuan & Artikel
            </span>
            <h1 className="text-display" style={{ color: '#fff', marginBottom: '1.25rem' }}>
              Blog & Edukasi Umroh
            </h1>
            <p style={{ maxWidth: '580px', margin: '0 auto', color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Temukan tips, panduan ibadah, regulasi terbaru, serta wawasan mendalam seputar perjalanan Umroh Anda ke Tanah Suci.
            </p>
          </div>
        </section>

        {/* Filter & Listing */}
        <section className="section">
          <div className="container">
            
            {/* Categories filter */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '10px', 
              marginBottom: '3rem',
              flexWrap: 'wrap'
            }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '99px',
                    border: selectedCategory === cat ? '2px solid var(--primary-500)' : '1px solid var(--gray-200)',
                    background: selectedCategory === cat ? 'var(--primary-50)' : '#fff',
                    color: selectedCategory === cat ? 'var(--primary-700)' : 'var(--gray-600)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'var(--font-primary)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            {filteredBlogs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#fff', borderRadius: 'var(--radius-xl)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
                <h3 style={{ fontFamily: 'var(--font-secondary)', fontSize: '1.25rem', color: 'var(--gray-800)', marginBottom: '0.75rem' }}>
                  Belum ada artikel
                </h3>
                <p style={{ color: 'var(--gray-500)' }}>Silakan tambahkan artikel baru melalui Dashboard Admin.</p>
              </div>
            ) : (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                gap: '2.5rem' 
              }}>
                {filteredBlogs.map(blog => (
                  <article 
                    key={blog.id} 
                    className="card"
                    style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      height: '100%', 
                      overflow: 'hidden',
                      background: '#fff'
                    }}
                  >
                    {/* Image */}
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative', background: 'var(--gray-100)' }}>
                      <img 
                        src={blog.image || 'https://images.unsplash.com/photo-1591604329371-e4a5c21af0d3?w=800'} 
                        alt={blog.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'var(--primary-500)',
                        color: '#fff',
                        padding: '3px 12px',
                        borderRadius: '99px',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}>
                        {blog.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: 'var(--gray-400)', marginBottom: '10px' }}>
                        <span>{blog.date}</span>
                        <span>•</span>
                        <span>{blog.readTime}</span>
                      </div>
                      <h2 style={{ 
                        fontFamily: 'var(--font-secondary)', 
                        fontSize: '1.2rem', 
                        fontWeight: 700, 
                        color: 'var(--gray-900)', 
                        marginBottom: '0.75rem',
                        lineHeight: 1.4,
                        minHeight: '2.8em',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {blog.title}
                      </h2>
                      <p style={{ 
                        color: 'var(--gray-500)', 
                        fontSize: '0.875rem', 
                        lineHeight: 1.6, 
                        marginBottom: '1.5rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        flex: 1
                      }}>
                        {blog.excerpt}
                      </p>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--gray-100)', paddingTop: '1rem', marginTop: 'auto' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-700)' }}>
                          Oleh {blog.author}
                        </span>
                        <Link 
                          href={`/blog/${blog.slug}`} 
                          style={{ 
                            fontSize: '0.85rem', 
                            fontWeight: 700, 
                            color: 'var(--primary-600)',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          Baca Selengkapnya →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
