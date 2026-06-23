'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/adminAuth';

interface UserRequest {
  id: string;
  type: 'Assessment' | 'Contact';
  date: string;
  status: 'Pending' | 'Dihubungi' | 'Selesai';
  name: string;
  whatsapp: string;
  email: string;
  packageInterest: string;
  message: string;
}

const defaultRequests: UserRequest[] = [
  { id: 'req_demo_1', type: 'Contact', date: '23/06/2026, 10:15', status: 'Pending', name: 'Budi Santoso', whatsapp: '081234567890', email: 'budi@gmail.com', packageInterest: 'standard', message: 'Tolong kirimkan brosur detail untuk keberangkatan September 2026. Rencana berangkat 3 orang.' },
  { id: 'req_demo_2', type: 'Assessment', date: '23/06/2026, 09:42', status: 'Selesai', name: 'Tamu Personal Assessment', whatsapp: '085777888999', email: 'siti@yahoo.com', packageInterest: 'vip', message: 'Rekomendasi: Paket VIP 12 Hari. Budget VIP, Surabaya, Desember, Hotel ★5, Lansia (60+).' },
];

const statusConfig: Record<string, { label: string; bg: string; color: string }> = {
  Pending:   { label: 'Pending',    bg: 'rgba(239,68,68,0.1)',    color: '#dc2626' },
  Dihubungi: { label: 'Dihubungi', bg: 'rgba(99,102,241,0.1)',   color: '#4f46e5' },
  Selesai:   { label: 'Selesai',   bg: 'rgba(16,185,129,0.1)',   color: '#059669' },
};

export default function AdminRequestsPage() {
  const router = useRouter();
  const [reqs, setReqs] = useState<UserRequest[]>([]);
  const [filter, setFilter] = useState<'Semua' | 'Pending' | 'Dihubungi' | 'Selesai'>('Semua');
  const [expandId, setExpandId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) { router.replace('/admin'); return; }
    try {
      const stored = localStorage.getItem('nurmina_requests');
      if (stored) { setReqs(JSON.parse(stored)); }
      else {
        localStorage.setItem('nurmina_requests', JSON.stringify(defaultRequests));
        setReqs(defaultRequests);
      }
    } catch { setReqs(defaultRequests); }
  }, [router]);

  const save = (updated: UserRequest[]) => {
    localStorage.setItem('nurmina_requests', JSON.stringify(updated));
    setReqs(updated);
  };

  const updateStatus = (id: string, status: UserRequest['status']) => {
    save(reqs.map(r => r.id === id ? { ...r, status } : r));
  };

  const deleteReq = (id: string) => {
    if (!confirm('Hapus catatan permintaan ini?')) return;
    save(reqs.filter(r => r.id !== id));
    if (expandId === id) setExpandId(null);
  };

  const filtered = filter === 'Semua' ? reqs : reqs.filter(r => r.status === filter);
  const pendingCount = reqs.filter(r => r.status === 'Pending').length;

  return (
    <div style={{ padding: '2.5rem', maxWidth: '1000px' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem', fontFamily: 'var(--font-secondary, sans-serif)' }}>
          Permintaan Masuk
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          {reqs.length} total permintaan •{' '}
          <span style={{ color: '#dc2626', fontWeight: 600 }}>{pendingCount} menunggu tindakan</span>
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {(['Semua', 'Pending', 'Dihubungi', 'Selesai'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '8px 18px', borderRadius: '99px', border: 'none',
              background: filter === f ? '#0f172a' : '#f1f5f9',
              color: filter === f ? '#fff' : '#64748b',
              fontSize: '0.85rem', fontWeight: filter === f ? 700 : 500,
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
            }}
          >
            {f}
            {f === 'Pending' && pendingCount > 0 && (
              <span style={{ marginLeft: '6px', background: '#ef4444', color: '#fff', fontSize: '0.65rem', padding: '1px 6px', borderRadius: '99px', fontWeight: 700 }}>
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', color: '#94a3b8' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>💬</div>
          <div>Tidak ada permintaan {filter !== 'Semua' ? `berstatus ${filter}` : 'masuk'}</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map(req => {
            const sc = statusConfig[req.status];
            const expanded = expandId === req.id;
            return (
              <div key={req.id} style={{
                background: '#fff', borderRadius: '14px',
                border: '1px solid #f1f5f9', overflow: 'hidden',
                borderLeft: `4px solid ${sc.color}`,
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}>
                {/* Header row */}
                <div style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  {/* Type badge */}
                  <span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700, background: req.type === 'Assessment' ? 'rgba(99,102,241,0.1)' : '#f1f5f9', color: req.type === 'Assessment' ? '#4f46e5' : '#475569', flexShrink: 0 }}>
                    {req.type === 'Assessment' ? '🎯 Assessment' : '📞 Kontak'}
                  </span>

                  {/* Name + meta */}
                  <div style={{ flex: 1, minWidth: '120px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>{req.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '1px' }}>{req.date}</div>
                  </div>

                  {/* WA */}
                  {req.whatsapp !== '-' && (
                    <a
                      href={`https://wa.me/62${req.whatsapp.replace(/^0/, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ padding: '6px 12px', borderRadius: '8px', background: '#dcfce7', color: '#15803d', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}
                    >
                      WA: {req.whatsapp}
                    </a>
                  )}

                  {/* Status badge + selector */}
                  <span style={{ padding: '4px 10px', borderRadius: '99px', background: sc.bg, color: sc.color, fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    {sc.label}
                  </span>
                  <select
                    value={req.status}
                    onChange={e => updateStatus(req.id, e.target.value as UserRequest['status'])}
                    style={{ padding: '5px 8px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.78rem', color: '#475569', background: '#f8fafc', fontFamily: 'inherit', cursor: 'pointer' }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Dihubungi">Dihubungi</option>
                    <option value="Selesai">Selesai</option>
                  </select>

                  {/* Actions */}
                  <button onClick={() => setExpandId(expanded ? null : req.id)} style={{ padding: '5px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#475569', fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                    {expanded ? 'Sembunyikan' : 'Detail'}
                  </button>
                  <button onClick={() => deleteReq(req.id)} style={{ padding: '5px 12px', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.06)', color: '#dc2626', fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
                    Hapus
                  </button>
                </div>

                {/* Expanded detail */}
                {expanded && (
                  <div style={{ padding: '0 1.5rem 1.25rem', borderTop: '1px solid #f8fafc' }}>
                    <div style={{ paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {req.email !== '-' && (
                        <div style={{ fontSize: '0.85rem', color: '#475569' }}>📧 <strong>Email:</strong> {req.email}</div>
                      )}
                      {req.packageInterest && req.packageInterest !== 'general' && (
                        <div style={{ fontSize: '0.85rem', color: '#475569' }}>📦 <strong>Minat Paket:</strong> Kategori {req.packageInterest}</div>
                      )}
                      <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', fontSize: '0.875rem', color: '#475569', lineHeight: 1.7, marginTop: '4px' }}>
                        {req.message}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
