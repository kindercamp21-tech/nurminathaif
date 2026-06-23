'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/adminAuth';
import { getAirlines, saveAirlines, Airline, defaultAirlines } from '@/data/airlines';

const emptyForm = {
  name: '',
  code: '',
  country: '',
  logo: '',
};

export default function AdminAirlinesPage() {
  const router = useRouter();
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/admin');
      return;
    }
    setAirlines(getAirlines());
  }, [router]);

  const saveAll = (updated: Airline[]) => {
    saveAirlines(updated);
    setAirlines(updated);
  };

  const openAdd = () => {
    setEditId(null);
    setForm({ ...emptyForm });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (airline: Airline) => {
    setEditId(airline.id);
    let logoVal = airline.logo;
    // If it's a data URL representing an SVG, let's decode it for editing convenience if they want to paste SVG code
    if (logoVal.startsWith('data:image/svg+xml;utf8,')) {
      logoVal = decodeURIComponent(logoVal.replace('data:image/svg+xml;utf8,', ''));
    }
    setForm({
      name: airline.name,
      code: airline.code,
      country: airline.country,
      logo: logoVal,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    if (!confirm('Apakah Anda yakin ingin menyetel ulang daftar maskapai ke data bawaan?')) return;
    saveAll(defaultAirlines);
  };

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Hapus maskapai "${name}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    saveAll(airlines.filter(a => a.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.code) {
      alert('Nama maskapai dan Kode IATA wajib diisi!');
      return;
    }

    setSaving(true);

    setTimeout(() => {
      let finalLogo = form.logo.trim();
      
      // If they pasted raw SVG code, encode it as a data URL
      if (finalLogo.startsWith('<svg')) {
        finalLogo = `data:image/svg+xml;utf8,${encodeURIComponent(finalLogo)}`;
      } else if (!finalLogo) {
        // Fallback simple SVG logo with airline initials
        const initials = form.name.substring(0, 2).toUpperCase();
        const fallbackSvg = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" width="120" height="40">
            <rect width="100%" height="100%" rx="8" fill="#475569"/>
            <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#FFF">${initials}</text>
          </svg>
        `.trim();
        finalLogo = `data:image/svg+xml;utf8,${encodeURIComponent(fallbackSvg)}`;
      }

      const itemData: Omit<Airline, 'id'> = {
        name: form.name,
        code: form.code.toUpperCase(),
        country: form.country || 'Internasional',
        logo: finalLogo,
      };

      if (editId) {
        const updated = airlines.map(a => (a.id === editId ? { ...a, ...itemData } : a));
        saveAll(updated);
      } else {
        const newAirline: Airline = {
          id: 'a_' + Date.now(),
          ...itemData,
        };
        saveAll([newAirline, ...airlines]);
      }

      setSaving(false);
      setShowForm(false);
      setEditId(null);
      setForm({ ...emptyForm });
    }, 400);
  };

  const filtered = airlines.filter(
    a =>
      !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.code.toLowerCase().includes(search.toLowerCase()) ||
      a.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '2.5rem', maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem', fontFamily: 'var(--font-secondary, sans-serif)' }}>
            Kelola Maskapai Penerbangan
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Kelola daftar maskapai beserta logo untuk digunakan di Paket Umroh.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleReset}
            style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Reset Bawaan
          </button>
          <button onClick={openAdd} style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#D4AF37', color: '#fff', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            + Tambah Maskapai
          </button>
        </div>
      </div>

      {/* ===================== FORM ===================== */}
      {showForm && (
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '2rem', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 2rem', borderBottom: '1px solid #f1f5f9', background: '#fafafa' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
              {editId ? '✏️ Edit Maskapai' : '➕ Tambah Maskapai Baru'}
            </h2>
            <button onClick={() => { setShowForm(false); setEditId(null); }} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.25rem', cursor: 'pointer' }}>✕</button>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Nama Maskapai *</label>
                <input required style={inputStyle} placeholder="Contoh: Saudia Airlines" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>

              <div>
                <label style={labelStyle}>Kode IATA (2 Karakter) *</label>
                <input required maxLength={2} style={inputStyle} placeholder="Contoh: SV, GA, EK" value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} />
              </div>

              <div>
                <label style={labelStyle}>Negara Asal</label>
                <input style={inputStyle} placeholder="Contoh: Arab Saudi, Indonesia" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Logo Maskapai (Kode SVG atau URL Gambar)</label>
                <textarea
                  rows={4}
                  style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '0.85rem', resize: 'vertical' }}
                  placeholder={'Tempelkan kode SVG di sini (mulai dengan <svg...) atau masukkan URL gambar (https://...)'}
                  value={form.logo}
                  onChange={e => setForm({ ...form, logo: e.target.value })}
                />
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '6px', display: 'block' }}>
                  Tips: Anda dapat menempelkan kode SVG mentah agar logo ter-render instan tanpa masalah CORS. Jika dikosongkan, logo inisial otomatis akan dibuat.
                </span>
              </div>
            </div>

            {/* Logo Preview */}
            {form.logo && (
              <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #e2e8f0' }}>
                <div style={labelStyle}>Pratinjau Logo:</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px', background: '#fff', borderRadius: '8px', border: '1px solid #f1f5f9', width: '150px' }}>
                  {form.logo.trim().startsWith('<svg') ? (
                    <div style={{ width: '120px', height: '40px' }} dangerouslySetInnerHTML={{ __html: form.logo }} />
                  ) : (
                    <img src={form.logo} alt="Preview" style={{ height: '36px', maxWidth: '130px', objectFit: 'contain' }} onError={e => { (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 30"><text x="10" y="20" fill="red">Err Image</text></svg>'; }} />
                  )}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#fff', color: '#475569', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                Batal
              </button>
              <button type="submit" disabled={saving} style={{ padding: '10px 24px', borderRadius: '10px', border: 'none', background: '#D4AF37', color: '#fff', fontSize: '0.875rem', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Menyimpan...' : editId ? 'Simpan Perubahan' : 'Tambah Maskapai'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div style={{ marginBottom: '1.25rem' }}>
        <input style={{ ...inputStyle, maxWidth: '360px' }} placeholder="🔍  Cari nama maskapai, kode, negara..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Grid List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {filtered.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', color: '#94a3b8' }}>
            Tidak ada maskapai ditemukan.
          </div>
        ) : (
          filtered.map(a => (
            <div key={a.id} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', transition: 'all 0.2s' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '64px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9', marginBottom: '1rem', overflow: 'hidden' }}>
                  {a.logo.startsWith('data:image/svg+xml;utf8,') ? (
                    <div style={{ width: '120px', height: '40px' }} dangerouslySetInnerHTML={{ __html: decodeURIComponent(a.logo.replace('data:image/svg+xml;utf8,', '')) }} />
                  ) : (
                    <img src={a.logo} alt={a.name} style={{ height: '36px', maxWidth: '130px', objectFit: 'contain' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  )}
                </div>

                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a', marginBottom: '4px' }}>{a.name}</div>
                <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
                  <span>Kode: <strong>{a.code}</strong></span>
                  <span>•</span>
                  <span>{a.country}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                <button onClick={() => openEdit(a)} style={{ flex: 1, padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.4)', background: 'rgba(212,175,55,0.08)', color: '#92711c', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(a.id, a.name)} style={{ flex: 1, padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.06)', color: '#dc2626', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}>
                  Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#0f172a', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };
