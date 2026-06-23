'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/adminAuth';
import { getHotels, saveHotels, Hotel, defaultHotels } from '@/data/hotels';
import ImageUpload from '@/components/ui/ImageUpload';

const emptyForm = {
  name: '',
  city: 'Makkah' as 'Makkah' | 'Madinah',
  rating: '4',
  image: '',
  description: '',
  address: '',
};

export default function AdminHotelsPage() {
  const router = useRouter();
  const [hotels, setHotels] = useState<Hotel[]>([]);
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
    setHotels(getHotels());
  }, [router]);

  const saveAll = (updated: Hotel[]) => {
    saveHotels(updated);
    setHotels(updated);
  };

  const openAdd = () => {
    setEditId(null);
    setForm({ ...emptyForm });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (hotel: Hotel) => {
    setEditId(hotel.id);
    setForm({
      name: hotel.name,
      city: hotel.city,
      rating: String(hotel.rating),
      image: hotel.image,
      description: hotel.description,
      address: hotel.address,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    if (!confirm('Apakah Anda yakin ingin menyetel ulang daftar hotel ke data bawaan?')) return;
    saveAll(defaultHotels);
  };

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Hapus hotel "${name}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    saveAll(hotels.filter(h => h.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.image) {
      alert('Nama hotel dan URL Gambar wajib diisi!');
      return;
    }

    setSaving(true);

    setTimeout(() => {
      const defaultImg = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop';
      
      const itemData: Omit<Hotel, 'id'> = {
        name: form.name,
        city: form.city,
        rating: parseInt(form.rating) || 4,
        image: form.image.trim() || defaultImg,
        description: form.description || 'Hotel nyaman dengan pelayanan terbaik selama ibadah.',
        address: form.address || `${form.city}, Arab Saudi`,
      };

      if (editId) {
        const updated = hotels.map(h => (h.id === editId ? { ...h, ...itemData } : h));
        saveAll(updated);
      } else {
        const newHotel: Hotel = {
          id: 'h_' + Date.now(),
          ...itemData,
        };
        saveAll([newHotel, ...hotels]);
      }

      setSaving(false);
      setShowForm(false);
      setEditId(null);
      setForm({ ...emptyForm });
    }, 400);
  };

  const filtered = hotels.filter(
    h =>
      !search ||
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.city.toLowerCase().includes(search.toLowerCase()) ||
      h.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '2.5rem', maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem', fontFamily: 'var(--font-secondary, sans-serif)' }}>
            Kelola Akomodasi Hotel
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Kelola daftar hotel di Makkah dan Madinah untuk dihubungkan ke Paket Umroh.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleReset}
            style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Reset Bawaan
          </button>
          <button onClick={openAdd} style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#D4AF37', color: '#fff', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            + Tambah Hotel
          </button>
        </div>
      </div>

      {/* ===================== FORM ===================== */}
      {showForm && (
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '2rem', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 2rem', borderBottom: '1px solid #f1f5f9', background: '#fafafa' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
              {editId ? '✏️ Edit Hotel' : '➕ Tambah Hotel Baru'}
            </h2>
            <button onClick={() => { setShowForm(false); setEditId(null); }} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.25rem', cursor: 'pointer' }}>✕</button>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Nama Hotel *</label>
                <input required style={inputStyle} placeholder="Contoh: Swissotel Al-Maqam Makkah" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>

              <div>
                <label style={labelStyle}>Kota Lokasi *</label>
                <select style={{ ...inputStyle, appearance: 'auto' }} value={form.city} onChange={e => setForm({ ...form, city: e.target.value as 'Makkah' | 'Madinah' })}>
                  <option value="Makkah">Makkah</option>
                  <option value="Madinah">Madinah</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Peringkat Bintang *</label>
                <select style={{ ...inputStyle, appearance: 'auto' }} value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })}>
                  <option value="3">★★★ Bintang 3</option>
                  <option value="4">★★★★ Bintang 4</option>
                  <option value="5">★★★★★ Bintang 5</option>
                </select>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <ImageUpload
                  label="Foto Hotel *"
                  currentImage={form.image}
                  folder="hotels"
                  onUpload={(url) => setForm({ ...form, image: url })}
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Alamat Lengkap</label>
                <input style={inputStyle} placeholder="Contoh: Abraj Al Bait Complex, Ibrahim Al Khalil St, Makkah" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Deskripsi Hotel</label>
                <textarea rows={4} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Tuliskan deskripsi singkat mengenai fasilitas hotel, jarak tempuh ke Masjidil Haram/Masjid Nabawi..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#fff', color: '#475569', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                Batal
              </button>
              <button type="submit" disabled={saving} style={{ padding: '10px 24px', borderRadius: '10px', border: 'none', background: '#D4AF37', color: '#fff', fontSize: '0.875rem', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Menyimpan...' : editId ? 'Simpan Perubahan' : 'Tambah Hotel'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div style={{ marginBottom: '1.25rem' }}>
        <input style={{ ...inputStyle, maxWidth: '360px' }} placeholder="🔍  Cari nama hotel, kota, alamat..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Grid List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filtered.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', color: '#94a3b8' }}>
            Tidak ada hotel ditemukan.
          </div>
        ) : (
          filtered.map(h => (
            <div key={h.id} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', transition: 'all 0.2s' }}>
              <div>
                <div style={{ height: '180px', overflow: 'hidden', background: '#f1f5f9', position: 'relative' }}>
                  <img src={h.image} alt={h.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'; }} />
                  <span style={{ position: 'absolute', top: '12px', left: '12px', background: h.city === 'Makkah' ? '#78350f' : '#065f46', color: '#fff', fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: '99px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {h.city}
                  </span>
                </div>
                
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a', lineHeight: 1.3 }}>{h.name}</div>
                  </div>
                  <div style={{ color: '#FBBF24', fontSize: '0.85rem', marginBottom: '8px' }}>
                    {'★'.repeat(h.rating)}
                    <span style={{ color: '#cbd5e1', marginLeft: '4px' }}>{'★'.repeat(5 - h.rating)}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                    <span style={{ flexShrink: 0 }}>📍</span>
                    <span>{h.address}</span>
                  </p>
                  <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {h.description}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #f1f5f9', padding: '1rem 1.25rem 1.25rem' }}>
                <button onClick={() => openEdit(h)} style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.4)', background: 'rgba(212,175,55,0.08)', color: '#92711c', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(h.id, h.name)} style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.06)', color: '#dc2626', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}>
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
