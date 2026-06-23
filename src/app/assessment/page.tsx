'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getPackages, formatPrice, Package } from '@/data/packages';

const TOTAL_STEPS = 5;

interface AssessmentData {
  budget: string;
  duration: string;
  city: string;
  month: string;
  hotelRating: string;
  packageType: string;
  specialNeeds: string[];
}

const budgetOptions = [
  { value: 'economy', label: '< Rp 25 juta', sub: 'Paket Ekonomi', icon: '💰' },
  { value: 'standard', label: 'Rp 25 – 35 juta', sub: 'Paket Standar', icon: '💎' },
  { value: 'premium', label: 'Rp 35 – 50 juta', sub: 'Paket Premium', icon: '✨' },
  { value: 'vip', label: '> Rp 50 juta', sub: 'Paket VIP', icon: '👑' },
];

const durationOptions = [
  { value: '9', label: '9 Hari', sub: 'Singkat & Padat', icon: '⚡' },
  { value: '12', label: '12 Hari', sub: 'Standar', icon: '📅' },
  { value: '15', label: '15 Hari', sub: 'Nyaman', icon: '🌙' },
  { value: '21', label: '21+ Hari', sub: 'Lengkap & Khidmat', icon: '🤲' },
];

const cityOptions = ['Jakarta', 'Surabaya', 'Medan', 'Makassar', 'Bandung', 'Semarang', 'Yogyakarta', 'Lainnya'];

const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

const hotelOptions = [
  { value: '3', label: 'Bintang 3', sub: 'Standar & Nyaman', icon: '⭐⭐⭐' },
  { value: '4', label: 'Bintang 4', sub: 'Superior', icon: '⭐⭐⭐⭐' },
  { value: '5', label: 'Bintang 5', sub: 'Mewah & Eksklusif', icon: '⭐⭐⭐⭐⭐' },
];

const specialNeedOptions = ['Lansia (60+ tahun)', 'Keluarga dengan anak', 'Kebutuhan kesehatan khusus', 'Kursi roda / mobilitas terbatas'];

export default function AssessmentPage() {
  const [allPackages, setAllPackages] = useState<Package[]>([]);
  const [step, setStep] = useState(0); // 0 = intro
  const [data, setData] = useState<AssessmentData>({
    budget: '', duration: '', city: '', month: '', hotelRating: '', packageType: '', specialNeeds: [],
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Package[] | null>(null);

  useEffect(() => {
    setAllPackages(getPackages());
  }, []);

  const progress = step === 0 ? 0 : (step / TOTAL_STEPS) * 100;

  const getRecommendations = () => {
    setLoading(true);
    setTimeout(() => {
      const filtered = allPackages.filter(p => {
        const budgetMatch = !data.budget || p.type === data.budget;
        const durationMatch = !data.duration || Math.abs(p.duration - parseInt(data.duration)) <= 3;
        const cityMatch = !data.city || p.departureCity.some(c => c.toLowerCase().includes(data.city.toLowerCase())) || data.city === 'Lainnya';
        const hotelMatch = !data.hotelRating || p.hotelRating >= parseInt(data.hotelRating);
        return budgetMatch || durationMatch || cityMatch || hotelMatch;
      });
      const finalResults = filtered.length > 0 ? filtered.slice(0, 4) : allPackages.slice(0, 3);
      setResults(finalResults);
      setLoading(false);

      // Save request to localStorage
      try {
        const storedRequests = localStorage.getItem('nurmina_requests') || '[]';
        const requests = JSON.parse(storedRequests);
        const newRequest = {
          id: 'req_' + Date.now(),
          type: 'Assessment',
          date: new Date().toLocaleString('id-ID'),
          status: 'Pending',
          name: 'Tamu (Personal Assessment)',
          whatsapp: '-',
          email: '-',
          packageInterest: data.budget,
          message: `Hasil rekomendasi: ${finalResults.map(r => r.name).join(', ')}. Parameter: Anggaran ${data.budget}, Durasi ${data.duration} hari, Kota ${data.city}, Bulan ${data.month}, Hotel Bintang ${data.hotelRating || 'Bebas'}. Kebutuhan khusus: ${data.specialNeeds.join(', ') || 'Tidak ada'}.`,
        };
        localStorage.setItem('nurmina_requests', JSON.stringify([newRequest, ...requests]));
      } catch (e) {
        console.error('Error saving assessment request:', e);
      }
    }, 2000);
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) { setStep(step + 1); }
    else { getRecommendations(); setStep(step + 1); }
  };

  const canProceed = () => {
    if (step === 1) return !!data.budget;
    if (step === 2) return !!data.duration;
    if (step === 3) return !!data.city;
    if (step === 4) return !!data.month;
    if (step === 5) return true;
    return true;
  };

  const matchScore = (pkg: Package) => {
    let score = 0;
    if (pkg.type === data.budget) score += 35;
    if (Math.abs(pkg.duration - parseInt(data.duration)) <= 3) score += 25;
    if (pkg.departureCity.some(c => c === data.city)) score += 20;
    if (pkg.hotelRating >= parseInt(data.hotelRating)) score += 20;
    return Math.min(95, 60 + score);
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '72px', background: 'var(--gray-50)' }}>

        {/* Progress bar */}
        {step > 0 && step <= TOTAL_STEPS && (
          <div style={{ position: 'sticky', top: '72px', zIndex: 100, background: '#fff', borderBottom: '1px solid var(--gray-100)', padding: '12px 0' }}>
            <div className="container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-600)' }}>Langkah {step} dari {TOTAL_STEPS}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>Sekitar 2 menit</span>
              </div>
              <div style={{ height: '6px', background: 'var(--gray-100)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, var(--primary-500), var(--primary-300))', borderRadius: '99px', transition: 'width 0.5s ease' }} />
              </div>
            </div>
          </div>
        )}

        <div className="container" style={{ maxWidth: '640px', padding: '3rem 1.5rem' }}>

          {/* INTRO */}
          {step === 0 && (
            <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🕌</div>
              <div className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>Penilaian Personal</div>
              <h1 style={{ fontFamily: 'var(--font-secondary)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '1rem' }}>
                Temukan Paket Umroh yang Sesuai untuk Anda
              </h1>
              <p style={{ fontSize: '1.05rem', color: 'var(--gray-500)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                Jawab 5 pertanyaan singkat untuk mendapatkan rekomendasi personal. Hanya butuh 2 menit.
              </p>

              <div className="grid-2-col" style={{ gap: '1rem', marginBottom: '2.5rem' }}>
                {[
                  { icon: '🔒', text: 'Data Anda aman & pribadi' },
                  { icon: '🆓', text: 'Gratis tanpa komitmen' },
                  { icon: '⚡', text: 'Hanya 2 menit' },
                  { icon: '🎯', text: 'Rekomendasi personal' },
                ].map(i => (
                  <div key={i.text} style={{ padding: '14px', background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-100)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.25rem' }}>{i.icon}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--gray-700)', fontWeight: 500 }}>{i.text}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => setStep(1)} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                Mulai Penilaian →
              </button>
              <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--gray-400)' }}>
                Informasi Anda aman dan hanya digunakan untuk rekomendasi
              </p>
            </div>
          )}

          {/* STEP 1 — Budget */}
          {step === 1 && (
            <StepWrapper
              title="Berapa anggaran Anda untuk Umroh?"
              help="Termasuk tiket pesawat, akomodasi, dan perlengkapan"
            >
              <OptionGrid>
                {budgetOptions.map(opt => (
                  <OptionCard
                    key={opt.value}
                    selected={data.budget === opt.value}
                    onClick={() => setData({ ...data, budget: opt.value })}
                    icon={opt.icon}
                    label={opt.label}
                    sub={opt.sub}
                  />
                ))}
              </OptionGrid>
            </StepWrapper>
          )}

          {/* STEP 2 — Duration */}
          {step === 2 && (
            <StepWrapper
              title="Berapa lama Anda ingin berada di Tanah Suci?"
              help="Waktu total di Mekkah dan Madinah"
            >
              <OptionGrid>
                {durationOptions.map(opt => (
                  <OptionCard
                    key={opt.value}
                    selected={data.duration === opt.value}
                    onClick={() => setData({ ...data, duration: opt.value })}
                    icon={opt.icon}
                    label={opt.label}
                    sub={opt.sub}
                  />
                ))}
              </OptionGrid>
            </StepWrapper>
          )}

          {/* STEP 3 — City */}
          {step === 3 && (
            <StepWrapper
              title="Dari kota mana Anda akan berangkat?"
              help="Memilih kota terdekat dapat menghemat biaya perjalanan"
            >
              <div className="grid-2-col" style={{ gap: '10px' }}>
                {cityOptions.map(city => (
                  <button
                    key={city}
                    onClick={() => setData({ ...data, city })}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-lg)',
                      border: data.city === city ? '2px solid var(--primary-500)' : '1.5px solid var(--gray-200)',
                      background: data.city === city ? 'var(--primary-50)' : '#fff',
                      color: data.city === city ? 'var(--primary-700)' : 'var(--gray-700)',
                      fontWeight: data.city === city ? 700 : 500,
                      fontSize: '0.925rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontFamily: 'var(--font-primary)',
                    }}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </StepWrapper>
          )}

          {/* STEP 4 — Month */}
          {step === 4 && (
            <StepWrapper
              title="Kapan Anda berencana berangkat?"
              help="Hindari musim haji untuk mendapatkan harga yang lebih baik"
            >
              <div className="grid-3-col">
                {months.map(month => (
                  <button
                    key={month}
                    onClick={() => setData({ ...data, month })}
                    style={{
                      padding: '14px 10px',
                      borderRadius: 'var(--radius-lg)',
                      border: data.month === month ? '2px solid var(--primary-500)' : '1.5px solid var(--gray-200)',
                      background: data.month === month ? 'var(--primary-50)' : '#fff',
                      color: data.month === month ? 'var(--primary-700)' : 'var(--gray-600)',
                      fontWeight: data.month === month ? 700 : 500,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontFamily: 'var(--font-primary)',
                      textAlign: 'center',
                    }}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </StepWrapper>
          )}

          {/* STEP 5 — Preferences */}
          {step === 5 && (
            <StepWrapper
              title="Preferensi & Kebutuhan Anda"
              help="Langkah terakhir! Bantu kami memilihkan yang terbaik"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label className="label">Rating hotel yang diinginkan</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {hotelOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setData({ ...data, hotelRating: opt.value })}
                        style={{
                          flex: 1, padding: '14px 8px',
                          borderRadius: 'var(--radius-lg)',
                          border: data.hotelRating === opt.value ? '2px solid var(--primary-500)' : '1.5px solid var(--gray-200)',
                          background: data.hotelRating === opt.value ? 'var(--primary-50)' : '#fff',
                          cursor: 'pointer', transition: 'all 0.2s',
                          fontFamily: 'var(--font-primary)',
                          textAlign: 'center',
                        }}
                      >
                        <div style={{ fontSize: '0.75rem', marginBottom: '4px' }}>{opt.icon}</div>
                        <div style={{ fontWeight: 600, fontSize: '0.8rem', color: data.hotelRating === opt.value ? 'var(--primary-700)' : 'var(--gray-700)' }}>{opt.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="label">Kebutuhan khusus <span style={{ fontWeight: 400, color: 'var(--gray-400)' }}>(opsional)</span></label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {specialNeedOptions.map(need => {
                      const checked = data.specialNeeds.includes(need);
                      return (
                        <button
                          key={need}
                          onClick={() => {
                            const next = checked
                              ? data.specialNeeds.filter(n => n !== need)
                              : [...data.specialNeeds, need];
                            setData({ ...data, specialNeeds: next });
                          }}
                          style={{
                            padding: '13px 16px',
                            borderRadius: 'var(--radius-lg)',
                            border: checked ? '2px solid var(--primary-500)' : '1.5px solid var(--gray-200)',
                            background: checked ? 'var(--primary-50)' : '#fff',
                            cursor: 'pointer', transition: 'all 0.2s',
                            textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px',
                            fontFamily: 'var(--font-primary)',
                          }}
                        >
                          <span style={{
                            width: 20, height: 20, borderRadius: '5px',
                            border: checked ? '2px solid var(--primary-500)' : '2px solid var(--gray-300)',
                            background: checked ? 'var(--primary-500)' : '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                            fontSize: '12px', color: '#fff',
                          }}>
                            {checked ? '✓' : ''}
                          </span>
                          <span style={{ fontSize: '0.9rem', color: checked ? 'var(--primary-700)' : 'var(--gray-700)', fontWeight: checked ? 600 : 400 }}>
                            {need}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </StepWrapper>
          )}

          {/* LOADING */}
          {step === 6 && loading && (
            <div style={{ textAlign: 'center', padding: '4rem 0', animation: 'fadeIn 0.5s ease' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem', animation: 'slideUp 1s ease infinite alternate' }}>🕌</div>
              <h2 style={{ fontFamily: 'var(--font-secondary)', fontSize: '1.5rem', color: 'var(--gray-900)', marginBottom: '1rem' }}>
                Menganalisis kebutuhan Anda...
              </h2>
              <p style={{ color: 'var(--gray-500)', marginBottom: '2rem' }}>Kira-kira 5-10 detik</p>
              <div style={{ width: '200px', height: '6px', background: 'var(--gray-100)', borderRadius: '99px', margin: '0 auto', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: '60%',
                  background: 'linear-gradient(90deg, var(--primary-500), var(--primary-300))',
                  borderRadius: '99px',
                  animation: 'shimmer 1.5s ease infinite',
                }} />
              </div>
            </div>
          )}

          {/* RESULTS */}
          {step === 6 && !loading && results && (
            <div style={{ animation: 'fadeIn 0.6s ease' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                <h2 style={{ fontFamily: 'var(--font-secondary)', fontSize: '1.75rem', color: 'var(--gray-900)', marginBottom: '0.75rem' }}>
                  Rekomendasi Paket untuk Anda
                </h2>
                <p style={{ color: 'var(--gray-500)' }}>
                  Berdasarkan preferensi Anda, kami menemukan <strong>{results.length} paket</strong> yang sesuai
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {results.map((pkg) => {
                  const score = matchScore(pkg);
                  return (
                    <div key={pkg.id} className="card" style={{ padding: '1.25rem' }}>
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <img src={pkg.image} alt={pkg.name} style={{ width: 80, height: 70, objectFit: 'cover', borderRadius: 'var(--radius-md)', flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                            <h3 style={{ fontFamily: 'var(--font-secondary)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--gray-900)' }}>{pkg.name}</h3>
                            <span style={{
                              background: 'var(--success-50)', color: 'var(--success-700)',
                              padding: '2px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700,
                            }}>
                              {score}% Cocok
                            </span>
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: '8px' }}>{pkg.provider} • {pkg.duration} hari • Hotel {pkg.hotelRating}★</div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary-600)', fontFamily: 'var(--font-secondary)' }}>{formatPrice(pkg.price)}</span>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <Link href={`/packages/${pkg.slug}`} className="btn btn-primary btn-sm">Lihat Detail</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link href="/packages" className="btn btn-secondary" style={{ textAlign: 'center' }}>
                  Lihat Semua Paket
                </Link>
                <Link href="/contact" className="btn btn-primary" style={{ textAlign: 'center' }}>
                  💬 Konsultasi Gratis dengan Advisor
                </Link>
                <button onClick={() => { setStep(0); setData({ budget: '', duration: '', city: '', month: '', hotelRating: '', packageType: '', specialNeeds: [] }); setResults(null); }} style={{ color: 'var(--gray-400)', fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-primary)' }}>
                  Mulai Ulang Penilaian
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {step >= 1 && step <= TOTAL_STEPS && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', gap: '12px' }}>
              <button
                onClick={() => setStep(step - 1)}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                ← Kembali
              </button>
              <button
                onClick={handleNext}
                className="btn btn-primary"
                disabled={!canProceed()}
                style={{ flex: 2, opacity: canProceed() ? 1 : 0.5, cursor: canProceed() ? 'pointer' : 'not-allowed' }}
              >
                {step === TOTAL_STEPS ? '🎯 Lihat Rekomendasi' : 'Lanjut →'}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function StepWrapper({ title, help, children }: { title: string; help: string; children: React.ReactNode }) {
  return (
    <div style={{ animation: 'slideUp 0.4s ease' }}>
      <h2 style={{ fontFamily: 'var(--font-secondary)', fontSize: 'clamp(1.25rem, 3vw, 1.625rem)', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '0.5rem' }}>
        {title}
      </h2>
      <p style={{ fontSize: '0.9rem', color: 'var(--gray-400)', marginBottom: '1.75rem' }}>{help}</p>
      {children}
    </div>
  );
}

function OptionGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid-2-col" style={{ gap: '12px' }}>{children}</div>;
}

function OptionCard({ selected, onClick, icon, label, sub }: { selected: boolean; onClick: () => void; icon: string; label: string; sub: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '1.25rem',
        borderRadius: 'var(--radius-xl)',
        border: selected ? '2px solid var(--primary-500)' : '1.5px solid var(--gray-200)',
        background: selected ? 'var(--primary-50)' : '#fff',
        cursor: 'pointer',
        transition: 'all 0.2s',
        textAlign: 'center',
        fontFamily: 'var(--font-primary)',
        boxShadow: selected ? 'var(--shadow-gold)' : 'none',
      }}
    >
      <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: selected ? 'var(--primary-700)' : 'var(--gray-800)', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '0.75rem', color: selected ? 'var(--primary-500)' : 'var(--gray-400)' }}>{sub}</div>
    </button>
  );
}
