'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PackageCard from '@/components/ui/PackageCard';
import { getPackages, formatPrice, Package } from '@/data/packages';

const sortOptions = [
  { value: 'popular', label: 'Paling Populer' },
  { value: 'price_asc', label: 'Harga: Terendah' },
  { value: 'price_desc', label: 'Harga: Tertinggi' },
  { value: 'rating', label: 'Rating Tertinggi' },
  { value: 'duration_asc', label: 'Durasi Terpendek' },
];

const typeOptions = ['economy', 'standard', 'premium', 'vip'];
const typeLabels: Record<string, string> = { economy: 'Ekonomi', standard: 'Standar', premium: 'Premium', vip: 'VIP' };

const cities = ['Jakarta', 'Surabaya', 'Medan', 'Makassar', 'Bandung'];

export default function PackagesPage() {
  const [allPackages, setAllPackages] = useState<Package[]>([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(70000000);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setAllPackages(getPackages());
  }, []);

  const filtered = useMemo(() => {
    let result = allPackages.filter(p => {
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
      const matchType = selectedTypes.length === 0 || selectedTypes.includes(p.type);
      const matchCity = selectedCities.length === 0 || p.departureCity.some(c => selectedCities.includes(c));
      const matchPrice = p.price <= maxPrice;
      return matchSearch && matchType && matchCity && matchPrice;
    });

    if (sortBy === 'price_asc') result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price_desc') result = [...result].sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'duration_asc') result = [...result].sort((a, b) => a.duration - b.duration);

    return result;
  }, [search, sortBy, selectedTypes, selectedCities, maxPrice]);

  const toggleType = (type: string) =>
    setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);

  const toggleCity = (city: string) =>
    setSelectedCities(prev => prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]);

  const resetFilters = () => {
    setSearch('');
    setSelectedTypes([]);
    setSelectedCities([]);
    setMaxPrice(70000000);
    setSortBy('popular');
  };

  const hasFilters = selectedTypes.length > 0 || selectedCities.length > 0 || maxPrice < 70000000 || search;

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--gray-50)' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, var(--gray-900) 0%, var(--primary-900) 100%)',
          padding: '4rem 0 3rem',
          color: '#fff',
        }}>
          <div className="container">
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.5)' }}>Home</Link>
              <span>›</span>
              <span style={{ color: '#fff' }}>Paket</span>
            </nav>
            <h1 style={{ fontFamily: 'var(--font-secondary)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '0.75rem' }}>
              Paket Umroh Tersedia
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
              Temukan paket yang sesuai dengan kebutuhan dan anggaran Anda
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(212,175,55,0.2)', border: '1px solid rgba(212,175,55,0.4)', padding: '4px 14px', borderRadius: '99px', fontSize: '0.8rem', color: 'var(--primary-200)' }}>
                {filtered.length} paket tersedia
              </span>
              <Link href="/assessment" style={{ background: 'var(--primary-500)', color: '#fff', padding: '6px 16px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none' }}>
                🎯 Coba Penilaian Personal
              </Link>
            </div>
          </div>
        </div>

        <div className="container" style={{ padding: '2rem 1.5rem' }}>
          {/* Search + Sort bar */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)', fontSize: '1rem' }}>🔍</span>
              <input
                type="text"
                placeholder="Cari nama paket..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input"
                style={{ paddingLeft: '42px' }}
              />
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="input"
              style={{ flex: '0 0 auto', width: 'auto', minWidth: '180px', cursor: 'pointer' }}
            >
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="btn btn-secondary btn-sm"
              style={{ whiteSpace: 'nowrap' }}
            >
              🔧 Filter {hasFilters ? `(aktif)` : ''}
            </button>
            {hasFilters && (
              <button onClick={resetFilters} className="btn btn-ghost btn-sm">
                Reset
              </button>
            )}
          </div>

          <div className="packages-container-layout">
            {/* Sidebar */}
            {sidebarOpen && (
              <aside style={{
                width: '260px',
                flexShrink: 0,
                background: '#fff',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-md)',
                padding: '1.5rem',
                position: 'sticky',
                top: '90px',
              }}>
                <h3 style={{ fontFamily: 'var(--font-secondary)', fontSize: '1rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '1.25rem' }}>
                  Filter Paket
                </h3>

                {/* Type filter */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="label">Tipe Paket</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {typeOptions.map(t => (
                      <label key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem' }}>
                        <input type="checkbox" checked={selectedTypes.includes(t)} onChange={() => toggleType(t)} style={{ accentColor: 'var(--primary-500)', width: '16px', height: '16px' }} />
                        <span>{typeLabels[t]}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* City filter */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="label">Kota Keberangkatan</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {cities.map(city => (
                      <label key={city} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem' }}>
                        <input type="checkbox" checked={selectedCities.includes(city)} onChange={() => toggleCity(city)} style={{ accentColor: 'var(--primary-500)', width: '16px', height: '16px' }} />
                        <span>{city}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price filter */}
                <div>
                  <label className="label">Harga Maksimum</label>
                  <div style={{ fontWeight: 700, color: 'var(--primary-600)', marginBottom: '8px', fontSize: '0.875rem' }}>
                    {formatPrice(maxPrice)}
                  </div>
                  <input
                    type="range"
                    min={20000000}
                    max={70000000}
                    step={1000000}
                    value={maxPrice}
                    onChange={e => setMaxPrice(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--primary-500)' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--gray-400)', marginTop: '4px' }}>
                    <span>Rp 20jt</span>
                    <span>Rp 70jt</span>
                  </div>
                </div>
              </aside>
            )}

            {/* Grid */}
            <div style={{ flex: 1 }}>
              {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#fff', borderRadius: 'var(--radius-xl)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                  <h3 style={{ fontFamily: 'var(--font-secondary)', fontSize: '1.25rem', color: 'var(--gray-800)', marginBottom: '0.75rem' }}>
                    Tidak ada paket yang sesuai
                  </h3>
                  <p style={{ color: 'var(--gray-500)', marginBottom: '1.5rem' }}>Coba kurangi filter atau ubah kriteria pencarian</p>
                  <button onClick={resetFilters} className="btn btn-primary">Reset Semua Filter</button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {filtered.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
