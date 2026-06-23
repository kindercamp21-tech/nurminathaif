'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { logout } from '@/lib/adminAuth';

const navItems = [
  { href: '/admin/dashboard', label: 'Ringkasan', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  )},
  { href: '/admin/packages', label: 'Paket Umroh', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M2 9.5V17c0 1.1.9 2 2 2h16a2 2 0 002-2V9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M22 6.5c0-1.1-.9-2-2-2H4a2 2 0 00-2 2V9.5h20V6.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M12 4.5V19M8 4.5l-2 5M16 4.5l2 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )},
  { href: '/admin/requests', label: 'Permintaan', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  { href: '/admin/blogs', label: 'Blog & Artikel', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )},
  { href: '/admin/airlines', label: 'Maskapai', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  { href: '/admin/hotels', label: 'Hotel', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M19 21V11c0-2.2-1.8-4-4-4H9c-2.2 0-4 1.8-4 4v10M3 21h18M9 11v3M15 11v3M12 11v3M9 18v3M15 18v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
];

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/admin');
  };

  return (
    <aside style={{
      width: '260px',
      minHeight: '100vh',
      background: '#0f172a',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      flexShrink: 0,
    }}>
      {/* Brand */}
      <div style={{
        padding: '1.75rem 1.5rem 1.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <img src="/images/Logo.svg" alt="Logo" width={56} height={28} style={{ objectFit: 'contain', marginBottom: '10px' }} />
        <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2 }}>NurminaThaifTour</div>
        <div style={{ color: 'rgba(212,175,55,0.7)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '2px' }}>
          Admin Panel
        </div>
      </div>

      {/* Section Label */}
      <div style={{ padding: '1.25rem 1.5rem 0.5rem' }}>
        <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          Menu Utama
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '0 0.75rem' }}>
        {navItems.map(item => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '11px 14px',
                borderRadius: '10px',
                marginBottom: '4px',
                textDecoration: 'none',
                color: active ? '#fff' : 'rgba(255,255,255,0.5)',
                background: active ? 'rgba(212,175,55,0.15)' : 'transparent',
                borderLeft: active ? '3px solid #D4AF37' : '3px solid transparent',
                fontWeight: active ? 600 : 400,
                fontSize: '0.9rem',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ opacity: active ? 1 : 0.6, color: active ? '#D4AF37' : 'currentColor' }}>
                {item.icon}
              </span>
              {item.label}
              {item.href === '/admin/requests' && (
                <span style={{
                  marginLeft: 'auto',
                  background: '#ef4444',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: '99px',
                }}>
                  !
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 0.75rem' }} />

      {/* Footer section */}
      <div style={{ padding: '1rem 0.75rem 1.5rem' }}>
        <Link
          href="/"
          target="_blank"
          style={{
            display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
            borderRadius: '10px', textDecoration: 'none', color: 'rgba(255,255,255,0.4)',
            fontSize: '0.85rem', marginBottom: '4px', transition: 'all 0.2s',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          Lihat Website
        </Link>

        <button
          onClick={handleLogout}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 14px', borderRadius: '10px', border: 'none',
            background: 'transparent', color: 'rgba(239,68,68,0.7)',
            fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left',
            fontFamily: 'inherit', transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
            e.currentTarget.style.color = '#ef4444';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'rgba(239,68,68,0.7)';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Keluar
        </button>
      </div>
    </aside>
  );
}
