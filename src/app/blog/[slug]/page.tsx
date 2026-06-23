'use client';

import { use, useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getBlogBySlug, BlogPost } from '@/data/blogs';

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetched = getBlogBySlug(slug);
    setBlog(fetched || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>Loading...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!blog) {
    return notFound();
  }

  // A simple formatter for mock markdown content
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} style={{ height: '1.25rem' }} />;
      
      if (trimmed.startsWith('# ')) {
        return (
          <h1 
            key={idx} 
            style={{ 
              fontFamily: 'var(--font-secondary)', 
              fontSize: '2rem', 
              fontWeight: 800, 
              color: 'var(--gray-900)', 
              marginTop: '2rem', 
              marginBottom: '1rem' 
            }}
          >
            {trimmed.substring(2)}
          </h1>
        );
      }
      
      if (trimmed.startsWith('## ')) {
        return (
          <h2 
            key={idx} 
            style={{ 
              fontFamily: 'var(--font-secondary)', 
              fontSize: '1.4rem', 
              fontWeight: 700, 
              color: 'var(--gray-900)', 
              marginTop: '1.75rem', 
              marginBottom: '0.75rem' 
            }}
          >
            {trimmed.substring(3)}
          </h2>
        );
      }
      
      if (trimmed.startsWith('- ')) {
        return (
          <li 
            key={idx} 
            style={{ 
              fontSize: '1rem', 
              lineHeight: 1.8, 
              color: 'var(--gray-700)', 
              marginLeft: '1.5rem', 
              marginBottom: '0.5rem' 
            }}
          >
            {trimmed.substring(2)}
          </li>
        );
      }

      return (
        <p 
          key={idx} 
          style={{ 
            fontSize: '1rem', 
            lineHeight: 1.8, 
            color: 'var(--gray-700)', 
            marginBottom: '1rem' 
          }}
        >
          {trimmed}
        </p>
      );
    });
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px', minHeight: '100vh', background: '#fff' }}>
        
        {/* Breadcrumb */}
        <div style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-100)', padding: '12px 0' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--gray-400)' }}>
              <Link href="/" style={{ color: 'var(--gray-400)' }}>Home</Link>
              <span>›</span>
              <Link href="/blog" style={{ color: 'var(--gray-400)' }}>Blog</Link>
              <span>›</span>
              <span style={{ color: 'var(--gray-700)', fontWeight: 500 }}>Detail Artikel</span>
            </nav>
          </div>
        </div>

        {/* Content Section */}
        <article className="container" style={{ maxWidth: '800px', padding: '3rem 1.5rem' }}>
          
          {/* Category & Metadata */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '1.25rem' }}>
            <span style={{
              background: 'var(--primary-50)',
              color: 'var(--primary-700)',
              padding: '4px 14px',
              borderRadius: '99px',
              fontSize: '0.8rem',
              fontWeight: 700
            }}>
              {blog.category}
            </span>
            <span style={{ fontSize: '0.875rem', color: 'var(--gray-400)' }}>{blog.date}</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--gray-400)' }}>•</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--gray-400)' }}>{blog.readTime}</span>
          </div>

          {/* Title */}
          <h1 style={{ 
            fontFamily: 'var(--font-secondary)', 
            fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', 
            fontWeight: 800, 
            color: 'var(--gray-900)', 
            lineHeight: 1.25, 
            marginBottom: '1.5rem' 
          }}>
            {blog.title}
          </h1>

          {/* Author */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--gray-100)', paddingBottom: '2rem', marginBottom: '2.5rem' }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary-500), var(--primary-700))',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '1rem'
            }}>
              {blog.author[0]}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--gray-900)', fontSize: '0.95rem' }}>{blog.author}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>Kontributor Edukasi Nurmina</div>
            </div>
          </div>

          {/* Featured Image */}
          <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', aspectRatio: '16/9', marginBottom: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
            <img 
              src={blog.image} 
              alt={blog.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Content Body */}
          <div className="blog-body" style={{ marginBottom: '4rem' }}>
            {renderContent(blog.content)}
          </div>

          {/* Bottom Call to Action */}
          <div style={{ 
            background: 'linear-gradient(135deg, var(--primary-50) 0%, #fff 100%)', 
            border: '1px solid rgba(212,175,55,0.25)', 
            borderRadius: 'var(--radius-xl)', 
            padding: '2.5rem',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontFamily: 'var(--font-secondary)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '0.75rem' }}>
              Ingin Menyesuaikan Perjalanan Umroh Anda?
            </h3>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.925rem', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 1.5rem' }}>
              Kami membantu Anda memilih dan merancang akomodasi, durasi, serta tiket penerbangan sesuai preferensi pribadi Anda secara gratis.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/assessment" className="btn btn-primary">
                🎯 Mulai Penilaian Personal
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Hubungi Advisor (WA)
              </Link>
            </div>
          </div>

        </article>

      </main>
      <Footer />
    </>
  );
}
