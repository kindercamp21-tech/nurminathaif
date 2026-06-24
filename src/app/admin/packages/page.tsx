'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated } from '@/lib/adminAuth';
import { getPackages, Package, formatPrice, packages as defaultPackages } from '@/data/packages';
import { getAirlines, Airline } from '@/data/airlines';
import { getHotels, Hotel } from '@/data/hotels';
import ImageUpload from '@/components/ui/ImageUpload';
import MultipleImageUpload from '@/components/ui/MultipleImageUpload';

const emptyForm = {
  name: '', type: 'standard', provider: '', price: '', originalPrice: '',
  duration: '9', durationMakkah: '5', durationMadinah: '4',
  departureCity: 'Jakarta', departureDates: 'September 2026, Oktober 2026',
  hotelRating: '4', hotelMakkah: '', hotelMadinah: '',
  airline: '', airlineLogo: '',
  flight: 'direct' as 'direct' | 'transit',
  groupSize: '40', availableSlots: '20', popularTag: '',
  image: '', images: '',
  description: '', features: '', inclusions: '', exclusions: '',
  providerRating: '4.8', providerReviews: '5',
  itinerary: [] as { day: number; title: string; activities: string }[],
};

const typeLabels: Record<string, string> = { economy: 'Ekonomi', standard: 'Standar', premium: 'Premium', vip: 'VIP' };
const typeBadge: Record<string, { bg: string; color: string }> = {
  economy: { bg: '#f0fdf4', color: '#15803d' },
  standard: { bg: '#eff6ff', color: '#1d4ed8' },
  premium: { bg: '#fef3c7', color: '#b45309' },
  vip: { bg: 'rgba(212,175,55,0.1)', color: '#92711c' },
};

export default function AdminPackagesPage() {
  const router = useRouter();
  const [pkgs, setPkgs] = useState<Package[]>([]);
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<'basic' | 'details' | 'content' | 'itinerary'>('basic');

  useEffect(() => {
    if (!isAuthenticated()) { router.replace('/admin'); return; }
    setPkgs(getPackages());
    setAirlines(getAirlines());
    setHotels(getHotels());
  }, [router]);

  const saveAll = (updated: Package[]) => {
    localStorage.setItem('nurmina_packages', JSON.stringify(updated));
    setPkgs(updated);
  };

  const openAdd = () => {
    setEditId(null);
    const defaultAir = airlines[0] || { name: '', logo: '' };
    setForm({
      ...emptyForm,
      airline: defaultAir.name,
      airlineLogo: defaultAir.logo,
    });
    setShowForm(true);
    setActiveSection('basic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (pkg: Package) => {
    setEditId(pkg.id);
    const al = airlines.find(a => a.name === pkg.airline);
    setForm({
      name: pkg.name,
      type: pkg.type,
      provider: pkg.provider,
      price: String(pkg.price),
      originalPrice: pkg.originalPrice ? String(pkg.originalPrice) : '',
      duration: String(pkg.duration),
      durationMakkah: String(pkg.durationMakkah),
      durationMadinah: String(pkg.durationMadinah),
      departureCity: pkg.departureCity.join(', '),
      departureDates: pkg.departureDates.join(', '),
      hotelRating: String(pkg.hotelRating),
      hotelMakkah: pkg.hotelMakkah,
      hotelMadinah: pkg.hotelMadinah,
      airline: pkg.airline,
      airlineLogo: pkg.airlineLogo || al?.logo || '',
      flight: pkg.flight,
      groupSize: String(pkg.groupSize),
      availableSlots: String(pkg.availableSlots),
      popularTag: pkg.popularTag || '',
      image: pkg.image,
      images: pkg.images.join('\n'),
      description: pkg.description,
      features: pkg.features.join('\n'),
      inclusions: pkg.inclusions.join('\n'),
      exclusions: pkg.exclusions.join('\n'),
      providerRating: String(pkg.providerRating),
      providerReviews: String(pkg.providerReviews),
      itinerary: pkg.itinerary ? pkg.itinerary.map(item => ({
        day: item.day,
        title: item.title,
        activities: item.activities.join('\n')
      })) : []
    });
    setShowForm(true);
    setActiveSection('basic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAirlineChange = (name: string) => {
    const al = airlines.find(a => a.name === name);
    setForm({ ...form, airline: name, airlineLogo: al?.logo || '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.provider || !form.price) {
      alert('Nama, Provider, dan Harga wajib diisi!');
      return;
    }
    setSaving(true);
    setTimeout(() => {
      const defaultImg = 'https://images.unsplash.com/photo-1591604329371-e4a5c21af0d3?w=800&auto=format&fit=crop';
      const mainImg = form.image.trim() || defaultImg;
      const imgList = form.images.trim()
        ? form.images.split('\n').map(s => s.trim()).filter(Boolean)
        : [mainImg];

      const base = {
        type: form.type as Package['type'],
        name: form.name,
        provider: form.provider,
        providerRating: parseFloat(form.providerRating) || 4.8,
        providerReviews: parseInt(form.providerReviews) || 5,
        price: parseInt(form.price),
        originalPrice: form.originalPrice ? parseInt(form.originalPrice) : undefined,
        duration: parseInt(form.duration),
        durationMakkah: parseInt(form.durationMakkah),
        durationMadinah: parseInt(form.durationMadinah),
        departureCity: form.departureCity.split(',').map(s => s.trim()),
        departureDates: form.departureDates.split(',').map(s => s.trim()),
        hotelRating: parseInt(form.hotelRating),
        hotelMakkah: form.hotelMakkah || 'Makkah Hotel',
        hotelMadinah: form.hotelMadinah || 'Madinah Hotel',
        airline: form.airline,
        airlineLogo: form.airlineLogo,
        flight: form.flight,
        groupSize: parseInt(form.groupSize) || 40,
        availableSlots: parseInt(form.availableSlots) || 20,
        popularTag: form.popularTag || undefined,
        image: mainImg,
        images: imgList,
        description: form.description || 'Paket Umroh terpercaya dengan fasilitas lengkap.',
        features: form.features ? form.features.split('\n').map(s => s.trim()).filter(Boolean) : ['Tiket Pesawat PP', 'Visa Umroh', 'Hotel Dekat Masjid'],
        inclusions: form.inclusions ? form.inclusions.split('\n').map(s => s.trim()).filter(Boolean) : ['Tiket Pesawat PP', 'Visa Umroh', 'Akomodasi Hotel', 'Konsumsi 3x Sehari'],
        exclusions: form.exclusions ? form.exclusions.split('\n').map(s => s.trim()).filter(Boolean) : ['Pengeluaran Pribadi', 'Pembuatan Paspor'],
        itinerary: form.itinerary.map(item => ({
          day: Number(item.day),
          title: item.title,
          activities: item.activities.split('\n').map(s => s.trim()).filter(Boolean)
        }))
      };

      if (editId) {
        const updated = pkgs.map(p => p.id === editId ? { ...p, ...base } : p);
        saveAll(updated);
      } else {
        const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const newPkg: Package = {
          id: 'p_' + Date.now(), slug,
          rating: 4.7, reviewCount: 0,
          verified: true,
          faqs: [], reviews: [],
          ...base,
        };
        saveAll([newPkg, ...pkgs]);
      }

      setSaving(false);
      setShowForm(false);
      setEditId(null);
      setForm({ ...emptyForm });
    }, 500);
  };

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Hapus paket "${name}"?`)) return;
    saveAll(pkgs.filter(p => p.id !== id));
  };

  const filtered = pkgs.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.provider.toLowerCase().includes(search.toLowerCase())
  );

  const sections = [
    { id: 'basic', label: 'Informasi Dasar' },
    { id: 'details', label: 'Detail & Fasilitas' },
    { id: 'content', label: 'Gambar & Deskripsi' },
    { id: 'itinerary', label: 'Rencana Perjalanan' },
  ] as const;

  return (
    <div style={{ padding: '2.5rem', maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem', fontFamily: 'var(--font-secondary, sans-serif)' }}>
            Kelola Paket Umroh
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Tambah, edit, atau hapus paket yang ditampilkan di website.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => { if (!confirm('Reset ke paket default?')) return; localStorage.removeItem('nurmina_packages'); setPkgs(defaultPackages); }}
            style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Reset Default
          </button>
          <button onClick={openAdd} style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#D4AF37', color: '#fff', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            + Tambah Paket
          </button>
        </div>
      </div>

      {/* ===================== FORM ===================== */}
      {showForm && (
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '2rem', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
          {/* Form top bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 2rem', borderBottom: '1px solid #f1f5f9', background: '#fafafa' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
              {editId ? '✏️ Edit Paket' : '➕ Tambah Paket Baru'}
            </h2>
            {/* Section tabs */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {sections.map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveSection(s.id)}
                  style={{ padding: '7px 14px', borderRadius: '8px', border: 'none', background: activeSection === s.id ? '#0f172a' : '#f1f5f9', color: activeSection === s.id ? '#fff' : '#64748b', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  {s.label}
                </button>
              ))}
              <button onClick={() => { setShowForm(false); setEditId(null); }} style={{ marginLeft: '8px', background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.25rem', cursor: 'pointer' }}>✕</button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ padding: '2rem' }}>

              {/* ── SECTION 1: Basic ── */}
              {activeSection === 'basic' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={labelStyle}>Nama Paket *</label>
                    <input required style={inputStyle} placeholder="Contoh: Paket Umroh Ramadhan 12 Hari" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>

                  <div>
                    <label style={labelStyle}>Tipe Paket *</label>
                    <select style={{ ...inputStyle, appearance: 'auto' }} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                      <option value="economy">Ekonomi</option>
                      <option value="standard">Standar</option>
                      <option value="premium">Premium</option>
                      <option value="vip">VIP</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Provider / Penyelenggara *</label>
                    <input required style={inputStyle} placeholder="Al-Mabrur Travel" value={form.provider} onChange={e => setForm({ ...form, provider: e.target.value })} />
                  </div>

                  <div>
                    <label style={labelStyle}>Harga Normal (Rp) *</label>
                    <input required type="number" style={inputStyle} placeholder="28500000" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                  </div>

                  <div>
                    <label style={labelStyle}>Harga Coret / Original (opsional)</label>
                    <input type="number" style={inputStyle} placeholder="Kosongkan jika tidak ada diskon" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} />
                  </div>

                  <div>
                    <label style={labelStyle}>Total Durasi (Hari)</label>
                    <input type="number" style={inputStyle} value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={labelStyle}>Hari di Makkah</label>
                      <input type="number" style={inputStyle} value={form.durationMakkah} onChange={e => setForm({ ...form, durationMakkah: e.target.value })} />
                    </div>
                    <div>
                      <label style={labelStyle}>Hari di Madinah</label>
                      <input type="number" style={inputStyle} value={form.durationMadinah} onChange={e => setForm({ ...form, durationMadinah: e.target.value })} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Kota Keberangkatan (pisah koma)</label>
                    <input style={inputStyle} placeholder="Jakarta, Surabaya, Medan" value={form.departureCity} onChange={e => setForm({ ...form, departureCity: e.target.value })} />
                  </div>

                  <div>
                    <label style={labelStyle}>Jadwal Keberangkatan (pisah koma)</label>
                    <input style={inputStyle} placeholder="September 2026, Oktober 2026" value={form.departureDates} onChange={e => setForm({ ...form, departureDates: e.target.value })} />
                  </div>

                  <div>
                    <label style={labelStyle}>Label Populer (opsional)</label>
                    <input style={inputStyle} placeholder="Contoh: Best Seller, Ramadhan Special" value={form.popularTag} onChange={e => setForm({ ...form, popularTag: e.target.value })} />
                  </div>

                  <div>
                    <label style={labelStyle}>Slot Tersedia</label>
                    <input type="number" style={inputStyle} value={form.availableSlots} onChange={e => setForm({ ...form, availableSlots: e.target.value })} />
                  </div>
                </div>
              )}

              {/* ── SECTION 2: Details ── */}
              {activeSection === 'details' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  {/* Airline */}
                  <div style={{ gridColumn: 'span 2' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ ...labelStyle, marginBottom: 0 }}>Maskapai Penerbangan</label>
                      <Link href="/admin/airlines" style={{ fontSize: '0.75rem', color: '#D4AF37', fontWeight: 600, textDecoration: 'underline' }}>
                        Kelola Maskapai & Logo Baru →
                      </Link>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px' }}>
                      {airlines.map(al => (
                        <button
                          key={al.id}
                          type="button"
                          onClick={() => handleAirlineChange(al.name)}
                          style={{
                            padding: '10px', borderRadius: '10px',
                            border: form.airline === al.name ? '2px solid #D4AF37' : '1.5px solid #e2e8f0',
                            background: form.airline === al.name ? 'rgba(212,175,55,0.06)' : '#fafafa',
                            cursor: 'pointer', textAlign: 'center',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                          }}
                        >
                          {al.logo ? (
                            al.logo.startsWith('data:image/svg+xml;utf8,') ? (
                              <div 
                                style={{ height: '28px', width: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                                dangerouslySetInnerHTML={{ __html: decodeURIComponent(al.logo.replace('data:image/svg+xml;utf8,', '')) }} 
                              />
                            ) : (
                              <img src={al.logo} alt={al.name} style={{ width: '80px', height: '28px', objectFit: 'contain' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                            )
                          ) : (
                            <div style={{ width: '80px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', borderRadius: '6px', fontSize: '0.7rem', color: '#64748b' }}>Lainnya</div>
                          )}
                          <span style={{ fontSize: '0.7rem', color: form.airline === al.name ? '#D4AF37' : '#64748b', fontWeight: form.airline === al.name ? 700 : 400 }}>{al.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Jenis Penerbangan</label>
                    <select style={{ ...inputStyle, appearance: 'auto' }} value={form.flight} onChange={e => setForm({ ...form, flight: e.target.value as 'direct' | 'transit' })}>
                      <option value="direct">Direct (Langsung)</option>
                      <option value="transit">Transit</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Ukuran Grup (jamaah)</label>
                    <input type="number" style={inputStyle} value={form.groupSize} onChange={e => setForm({ ...form, groupSize: e.target.value })} />
                  </div>

                  <div>
                    <label style={labelStyle}>Rating Hotel Bintang</label>
                    <select style={{ ...inputStyle, appearance: 'auto' }} value={form.hotelRating} onChange={e => setForm({ ...form, hotelRating: e.target.value })}>
                      <option value="3">★★★ Bintang 3</option>
                      <option value="4">★★★★ Bintang 4</option>
                      <option value="5">★★★★★ Bintang 5</option>
                    </select>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ ...labelStyle, marginBottom: 0 }}>Hotel di Makkah</label>
                      <Link href="/admin/hotels" style={{ fontSize: '0.72rem', color: '#D4AF37', fontWeight: 600, textDecoration: 'underline' }}>
                        Kelola Hotel Baru →
                      </Link>
                    </div>
                    <select
                      style={{ ...inputStyle, appearance: 'auto', marginBottom: '8px' }}
                      value={hotels.some(h => h.name === form.hotelMakkah && h.city === 'Makkah') ? form.hotelMakkah : (form.hotelMakkah ? 'custom' : '')}
                      onChange={e => {
                        const val = e.target.value;
                        if (val === 'custom') {
                          setForm({ ...form, hotelMakkah: '' });
                        } else {
                          setForm({ ...form, hotelMakkah: val });
                        }
                      }}
                    >
                      <option value="">-- Pilih Hotel Makkah --</option>
                      {hotels.filter(h => h.city === 'Makkah').map(h => (
                        <option key={h.id} value={h.name}>{h.name} (★{h.rating})</option>
                      ))}
                      <option value="custom">✍️ Tulis Manual / Hotel Lain...</option>
                    </select>
                    {(!hotels.some(h => h.name === form.hotelMakkah && h.city === 'Makkah') || form.hotelMakkah === '') && (
                      <input
                        style={inputStyle}
                        placeholder="Ketik Nama Hotel Makkah"
                        value={form.hotelMakkah}
                        onChange={e => setForm({ ...form, hotelMakkah: e.target.value })}
                      />
                    )}
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ ...labelStyle, marginBottom: 0 }}>Hotel di Madinah</label>
                      <Link href="/admin/hotels" style={{ fontSize: '0.72rem', color: '#D4AF37', fontWeight: 600, textDecoration: 'underline' }}>
                        Kelola Hotel Baru →
                      </Link>
                    </div>
                    <select
                      style={{ ...inputStyle, appearance: 'auto', marginBottom: '8px' }}
                      value={hotels.some(h => h.name === form.hotelMadinah && h.city === 'Madinah') ? form.hotelMadinah : (form.hotelMadinah ? 'custom' : '')}
                      onChange={e => {
                        const val = e.target.value;
                        if (val === 'custom') {
                          setForm({ ...form, hotelMadinah: '' });
                        } else {
                          setForm({ ...form, hotelMadinah: val });
                        }
                      }}
                    >
                      <option value="">-- Pilih Hotel Madinah --</option>
                      {hotels.filter(h => h.city === 'Madinah').map(h => (
                        <option key={h.id} value={h.name}>{h.name} (★{h.rating})</option>
                      ))}
                      <option value="custom">✍️ Tulis Manual / Hotel Lain...</option>
                    </select>
                    {(!hotels.some(h => h.name === form.hotelMadinah && h.city === 'Madinah') || form.hotelMadinah === '') && (
                      <input
                        style={inputStyle}
                        placeholder="Ketik Nama Hotel Madinah"
                        value={form.hotelMadinah}
                        onChange={e => setForm({ ...form, hotelMadinah: e.target.value })}
                      />
                    )}
                  </div>

                  <div>
                    <label style={labelStyle}>Rating Provider (0–5)</label>
                    <input type="number" step="0.1" min="0" max="5" style={inputStyle} value={form.providerRating} onChange={e => setForm({ ...form, providerRating: e.target.value })} />
                  </div>

                  <div>
                    <label style={labelStyle}>Jumlah Review Provider</label>
                    <input type="number" style={inputStyle} value={form.providerReviews} onChange={e => setForm({ ...form, providerReviews: e.target.value })} />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={labelStyle}>Fitur Utama (1 per baris)</label>
                    <textarea rows={4} style={{ ...inputStyle, resize: 'vertical' }} placeholder={'Tiket pesawat PP\nHotel bintang 5\nVisa Umroh\nMakan 3x sehari'} value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} />
                  </div>

                  <div>
                    <label style={labelStyle}>Yang Termasuk / Inclusions (1 per baris)</label>
                    <textarea rows={6} style={{ ...inputStyle, resize: 'vertical' }} placeholder={'Tiket pesawat kelas ekonomi PP\nVisa Umroh resmi\nAkomodasi hotel terdaftar\n...'} value={form.inclusions} onChange={e => setForm({ ...form, inclusions: e.target.value })} />
                  </div>

                  <div>
                    <label style={labelStyle}>Tidak Termasuk / Exclusions (1 per baris)</label>
                    <textarea rows={6} style={{ ...inputStyle, resize: 'vertical' }} placeholder={'Pengeluaran pribadi\nPembuatan paspor\n...'} value={form.exclusions} onChange={e => setForm({ ...form, exclusions: e.target.value })} />
                  </div>
                </div>
              )}

              {/* ── SECTION 3: Images & Description ── */}
              {activeSection === 'content' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <ImageUpload
                      label="Gambar Utama *"
                      currentImage={form.image}
                      folder="packages"
                      onUpload={(url) => setForm({ ...form, image: url })}
                    />
                  </div>

                  <div>
                    <MultipleImageUpload
                      label="Galeri Gambar (max 5)"
                      currentImages={form.images.split('\n').filter(Boolean)}
                      folder="packages"
                      maxImages={5}
                      onUpload={(urls) => setForm({ ...form, images: urls.join('\n') })}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Deskripsi Paket</label>
                    <textarea rows={4} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Tuliskan deskripsi singkat tentang keunggulan paket ini..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                  </div>
                </div>
              )}

              {/* ── SECTION 4: Itinerary ── */}
              {activeSection === 'itinerary' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>Rencana Perjalanan Harian (Itinerary)</h3>
                      <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '2px' }}>
                        Tentukan aktivitas untuk masing-masing hari perjalanan.
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          const daysCount = parseInt(form.duration) || 9;
                          if (form.itinerary.length > 0 && !confirm('Ini akan menimpa itinerary saat ini. Lanjutkan?')) return;
                          const template = Array.from({ length: daysCount }, (_, i) => ({
                            day: i + 1,
                            title: `Hari ke-${i + 1}`,
                            activities: ''
                          }));
                          setForm({ ...form, itinerary: template });
                        }}
                        style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #D4AF37', background: '#fff', color: '#92711c', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                      >
                        ⚡ Generate Template ({form.duration} Hari)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const nextDay = form.itinerary.length + 1;
                          setForm({
                            ...form,
                            itinerary: [...form.itinerary, { day: nextDay, title: `Hari ke-${nextDay}`, activities: '' }]
                          });
                        }}
                        style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#D4AF37', color: '#fff', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                      >
                        + Tambah Hari
                      </button>
                    </div>
                  </div>

                  {form.itinerary.length === 0 ? (
                    <div style={{ padding: '3rem', border: '2px dashed #e2e8f0', borderRadius: '12px', textAlign: 'center', color: '#64748b', lineHeight: 1.6 }}>
                      <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>🗺️</span>
                      Belum ada rencana perjalanan yang ditambahkan.<br/>
                      Klik <strong>Generate Template</strong> atau <strong>Tambah Hari</strong> untuk memulai.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {form.itinerary.map((item, index) => (
                        <div key={index} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', background: '#fafafa', overflow: 'hidden' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', background: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
                            <span style={{ fontWeight: 700, color: '#334155', fontSize: '0.85rem' }}>Hari {item.day}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = form.itinerary.filter((_, i) => i !== index).map((dayItem, i) => ({
                                  ...dayItem,
                                  day: i + 1
                                }));
                                setForm({ ...form, itinerary: updated });
                              }}
                              style={{ border: 'none', background: 'none', color: '#ef4444', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                            >
                              Hapus Hari
                            </button>
                          </div>
                          <div style={{ padding: '1.25rem', display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem' }}>
                            <div>
                              <label style={labelStyle}>Hari Ke</label>
                              <input
                                type="number"
                                style={inputStyle}
                                value={item.day}
                                onChange={e => {
                                  const updated = [...form.itinerary];
                                  updated[index].day = Number(e.target.value);
                                  setForm({ ...form, itinerary: updated });
                                }}
                              />
                            </div>
                            <div>
                              <label style={labelStyle}>Judul Kegiatan Hari Ini</label>
                              <input
                                style={inputStyle}
                                placeholder="Contoh: Keberangkatan & Check-in Madinah / Ziarah Makkah"
                                value={item.title}
                                onChange={e => {
                                  const updated = [...form.itinerary];
                                  updated[index].title = e.target.value;
                                  setForm({ ...form, itinerary: updated });
                                }}
                              />
                            </div>
                            <div style={{ gridColumn: 'span 2' }}>
                              <label style={labelStyle}>Daftar Aktivitas / Agenda (1 per baris)</label>
                              <textarea
                                rows={3}
                                style={{ ...inputStyle, resize: 'vertical' }}
                                placeholder={"Kumpul di Terminal 3 Bandara Soekarno-Hatta\nPembagian paspor dan boarding pass\nPenerbangan menuju Jeddah"}
                                value={item.activities}
                                onChange={e => {
                                  const updated = [...form.itinerary];
                                  updated[index].activities = e.target.value;
                                  setForm({ ...form, itinerary: updated });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer buttons */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', padding: '1.25rem 2rem', borderTop: '1px solid #f1f5f9', background: '#fafafa' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {activeSection !== 'basic' && (
                  <button
                    type="button"
                    onClick={() => {
                      const idx = sections.findIndex(s => s.id === activeSection);
                      if (idx > 0) setActiveSection(sections[idx - 1].id);
                    }}
                    style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#fff', color: '#475569', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    ← Sebelumnya
                  </button>
                )}
                {activeSection !== 'itinerary' && (
                  <button
                    type="button"
                    onClick={() => {
                      const idx = sections.findIndex(s => s.id === activeSection);
                      if (idx < sections.length - 1) setActiveSection(sections[idx + 1].id);
                    }}
                    style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #D4AF37', background: 'rgba(212,175,55,0.08)', color: '#92711c', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    Selanjutnya →
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#fff', color: '#475569', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Batal
                </button>
                <button type="submit" disabled={saving} style={{ padding: '10px 24px', borderRadius: '10px', border: 'none', background: '#D4AF37', color: '#fff', fontSize: '0.875rem', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: saving ? 0.7 : 1 }}>
                  {saving ? 'Menyimpan...' : editId ? 'Simpan Perubahan' : 'Tambah Paket'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div style={{ marginBottom: '1.25rem' }}>
        <input style={{ ...inputStyle, maxWidth: '360px' }} placeholder="🔍  Cari nama paket atau provider..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                {['Paket', 'Provider', 'Tipe', 'Harga', 'Durasi', 'Hotel', 'Maskapai', 'Aksi'].map(h => (
                  <th key={h} style={{ padding: '13px 16px', fontWeight: 600, color: '#475569', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>Tidak ada paket ditemukan</td></tr>
              ) : filtered.map(pkg => (
                <tr key={pkg.id} style={{ borderBottom: '1px solid #f8fafc' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#fafafa')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: 48, height: 36, borderRadius: '6px', overflow: 'hidden', flexShrink: 0, background: '#f1f5f9' }}>
                        <img src={pkg.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.875rem' }}>{pkg.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{pkg.departureCity.join(', ')}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#475569', fontSize: '0.85rem' }}>{pkg.provider}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ ...badgeStyle, background: typeBadge[pkg.type]?.bg || '#f1f5f9', color: typeBadge[pkg.type]?.color || '#475569' }}>
                      {typeLabels[pkg.type] || pkg.type}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#D4AF37', whiteSpace: 'nowrap', fontSize: '0.85rem' }}>{formatPrice(pkg.price)}</td>
                  <td style={{ padding: '12px 16px', color: '#475569', whiteSpace: 'nowrap', fontSize: '0.85rem' }}>{pkg.duration} Hari</td>
                  <td style={{ padding: '12px 16px', color: '#475569', fontSize: '0.85rem' }}>★ {pkg.hotelRating}</td>
                  <td style={{ padding: '12px 16px' }}>
                    {(() => {
                      const al = airlines.find(a => a.name === pkg.airline);
                      const logo = pkg.airlineLogo || al?.logo;
                      return logo ? (
                        logo.startsWith('data:image/svg+xml;utf8,') ? (
                          <div 
                            style={{ height: '18px', display: 'flex', alignItems: 'center' }} 
                            dangerouslySetInnerHTML={{ __html: decodeURIComponent(logo.replace('data:image/svg+xml;utf8,', '')) }} 
                          />
                        ) : (
                          <img src={logo} alt={pkg.airline} style={{ height: '18px', maxWidth: '72px', objectFit: 'contain' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        )
                      ) : (
                        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{pkg.airline}</span>
                      );
                    })()}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <Link href={`/packages/${pkg.slug}`} target="_blank" style={{ padding: '4px 10px', borderRadius: '7px', border: '1px solid #e2e8f0', color: '#475569', fontSize: '0.75rem', textDecoration: 'none', fontWeight: 500 }}>Lihat</Link>
                      <button onClick={() => openEdit(pkg)} style={{ padding: '4px 10px', borderRadius: '7px', border: '1px solid rgba(212,175,55,0.4)', background: 'rgba(212,175,55,0.08)', color: '#92711c', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>Edit</button>
                      <button onClick={() => handleDelete(pkg.id, pkg.name)} style={{ padding: '4px 10px', borderRadius: '7px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.06)', color: '#dc2626', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9', color: '#94a3b8', fontSize: '0.8rem' }}>
          Menampilkan {filtered.length} dari {pkgs.length} paket
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#0f172a', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };
const badgeStyle: React.CSSProperties = { padding: '3px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700 };
