'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated } from '@/lib/adminAuth';
import { getPackages } from '@/data/packages';
import { getBlogs } from '@/data/blogs';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [pkgCount, setPkgCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [reqCount, setReqCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated()) { router.replace('/admin'); return; }
    setPkgCount(getPackages().length);
    setBlogCount(getBlogs().length);
    try {
      const reqs = JSON.parse(localStorage.getItem('nurmina_requests') || '[]');
      setReqCount(reqs.length);
      setPendingCount(reqs.filter((r: any) => r.status === 'Pending').length);
    } catch {}
  }, [router]);

  const stats = [
    { label: 'Total Paket', value: pkgCount, sub: 'Paket Umroh aktif', color: '#D4AF37', bg: 'rgba(212,175,55,0.1)', icon: PkgIcon, href: '/admin/packages' },
    { label: 'Permintaan Masuk', value: reqCount, sub: `${pendingCount} menunggu tindakan`, color: '#6366f1', bg: 'rgba(99,102,241,0.1)', icon: MsgIcon, href: '/admin/requests' },
    { label: 'Pending', value: pendingCount, sub: 'Belum dihubungi', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', icon: AlertIcon, href: '/admin/requests' },
    { label: 'Artikel Blog', value: blogCount, sub: 'Dipublikasikan', color: '#10b981', bg: 'rgba(16,185,129,0.1)', icon: BlogIcon, href: '/admin/blogs' },
  ];

  return (
    <div style={{ padding: '2.5rem', maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', fontFamily: 'var(--font-secondary, sans-serif)' }}>
          Selamat Datang 👋
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
          Berikut ringkasan aktivitas platform NurminaThaifTour hari ini.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {stats.map((s) => (
          <Link key={s.label} href={s.href} style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#fff', borderRadius: '16px', padding: '1.5rem',
              border: '1px solid #f1f5f9', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              transition: 'all 0.2s', cursor: 'pointer',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ width: 44, height: 44, background: s.bg, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
                  <s.icon />
                </div>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1, marginBottom: '0.35rem', fontFamily: 'var(--font-secondary, sans-serif)' }}>
                {s.value}
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a', marginBottom: '2px' }}>{s.label}</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{s.sub}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ background: '#fff', borderRadius: '16px', padding: '1.75rem', border: '1px solid #f1f5f9', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem' }}>Aksi Cepat</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {[
            { label: '+ Tambah Paket Baru', href: '/admin/packages', color: '#D4AF37', bg: 'rgba(212,175,55,0.1)' },
            { label: '+ Tulis Artikel', href: '/admin/blogs', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
            { label: 'Lihat Permintaan Pending', href: '/admin/requests', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
          ].map(a => (
            <Link key={a.label} href={a.href} style={{
              padding: '10px 20px', borderRadius: '10px', fontWeight: 600,
              fontSize: '0.875rem', textDecoration: 'none', background: a.bg, color: a.color,
              transition: 'opacity 0.2s',
            }}>
              {a.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Info */}
      <div style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.02) 100%)', borderRadius: '16px', padding: '1.75rem', border: '1px solid rgba(212,175,55,0.2)' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>📌 Petunjuk Singkat</h3>
        <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', lineHeight: 1.9, margin: 0 }}>
          <li>Paket yang ditambahkan akan langsung tampil di halaman <strong>/packages</strong> (tersimpan di localStorage browser).</li>
          <li>Permintaan konsultasi dari form <strong>Kontak</strong> dan <strong>Penilaian Personal</strong> terekam otomatis.</li>
          <li>Artikel blog baru akan tampil di halaman <strong>/blog</strong>.</li>
          <li>Gunakan tombol <strong>Edit</strong> untuk mengubah data yang sudah ada.</li>
        </ul>
      </div>
    </div>
  );
}

function PkgIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M2 9.5V17c0 1.1.9 2 2 2h16a2 2 0 002-2V9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M22 6.5c0-1.1-.9-2-2-2H4a2 2 0 00-2 2V9.5h20V6.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
}
function MsgIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function AlertIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M12 7v5M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
}
function BlogIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
}
