'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HambergerMenu, CloseCircle, Send2 } from 'iconsax-react';

const navLinks = [
  { label: 'Paket', href: '/packages' },
  { label: 'Sesuaikan', href: '/assessment' },
  { label: 'Cerita', href: '/stories' },
  { label: 'Blog', href: '/blog' },
  { label: 'Tentang', href: '/about' },
  { label: 'Kontak', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isTransparent = isHome && !scrolled && !menuOpen;

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: isTransparent ? 'transparent' : 'rgba(255,255,255,0.97)',
        backdropFilter: isTransparent ? 'none' : 'blur(16px)',
        boxShadow: isTransparent ? 'none' : '0 1px 20px rgba(0,0,0,0.07)',
        borderBottom: isTransparent ? 'none' : '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img src="/images/Logo.svg" alt="NurminaThaifTour Logo" width={60} height={30} style={{ objectFit: 'contain' }} />
          <div>
            <div style={{
              fontWeight: 700,
              fontSize: '1rem',
              color: isTransparent ? '#fff' : 'var(--gray-900)',
              lineHeight: 1.1,
            }}>NurminaThaif</div>
            <div style={{
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.09em',
              color: isTransparent ? 'rgba(255,255,255,0.65)' : 'var(--primary-500)',
              textTransform: 'uppercase',
            }}>Tour & Travel</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {navLinks.map(link => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: isTransparent ? 'rgba(255,255,255,0.88)' : (active ? 'var(--primary-600)' : 'var(--gray-600)'),
                  transition: 'color 0.2s',
                  position: 'relative',
                  paddingBottom: '2px',
                  borderBottom: active ? '2px solid var(--primary-500)' : '2px solid transparent',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="desktop-nav">
          <Link href="/assessment" className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Send2 size={14} color="currentColor" /> Temukan Paket Saya
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="mobile-nav"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {menuOpen
            ? <CloseCircle size={26} color={isTransparent ? '#fff' : 'var(--gray-700)'} />
            : <HambergerMenu size={26} color={isTransparent ? '#fff' : 'var(--gray-700)'} />
          }
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: '#fff',
          borderTop: '1px solid var(--gray-100)',
          padding: '0.75rem 0',
          animation: 'slideDown 0.3s ease',
        }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column' }}>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '14px 0',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: pathname === link.href ? 'var(--primary-600)' : 'var(--gray-700)',
                  borderBottom: '1px solid var(--gray-100)',
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ paddingTop: '14px', paddingBottom: '6px' }}>
              <Link href="/assessment" className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Send2 size={16} color="currentColor" /> Temukan Paket Saya
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
